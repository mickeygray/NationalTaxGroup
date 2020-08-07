const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const Call = require("../models/Call.js");
const Prospect = require("../models/Prospect.js");
const uuidv4 = require("uuid/v4");
const crypto = require("crypto");
const config = require("config");
const path = require("path");
const mongodb = require("mongodb");
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const db = config.get("mongoURI");
const Grid = require("gridfs-stream");
const multer = require("multer");
const pdfFiller = require("pdffiller");
const moment = require("moment");

var hummus = require("hummus"),
  PDFDigitalForm = require("../middleware/PDFDigitalForm");
let fs = require("fs");
var util = require("util");

const fileLoad = multer();

const handlebars = require("handlebars");
const key = require("../config/key.json");
const nodemailer = require("nodemailer");
const Email = require("../models/Email");
const hbs = require("nodemailer-express-handlebars");

router.put("/:id/pdfs", auth, async (req, res) => {
  const string = Object.keys(req.body).toString();

  const distinct = (value, index, self) => {
    return self.indexOf(value) === index;
  };
  String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  let reg1 = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/; // Get emails
  let reg2 = /^(\(\d{3}\))?[\s-]?\d{3}[\s-]?\d{4}/gim;
  let liens = string.match(/(?<=Debtor Information\s*).*?(?=\s*Number)/gs);
  let emails = (string.match(reg1) || []).map((e) => e.replace(reg1, "$1"));
  let phone1 = string.match(reg2);

  if (phone1) {
    phone1.filter(distinct);
  }
  let bankruptcy1 = string.match(
    /(?<=Petitioner Information\s*).*?(?=\s*Meeting Date)/gs
  );
  let real1 = string.match(/(?<=Deed Record for\s*).*?(?=\s*Loan Type)/gs);

  const leadString = liens.shift();

  leadString.replace(leadString.substring(leadString.indexOf("Debtor 2")), "");

  const S =
    leadString.substring(0, leadString.indexOf("Debtor 2")) +
    leadString.substring(leadString.indexOf("Creditor Information"));

  let leadBody;

  if (leadString.includes("Debtor 2")) {
    leadBody =
      "{" +
      S.replace(/[\s,]+/g, " ")
        .trim()
        .replace("Debtor 1", "")
        .replace("Debtor 2", "")
        .replace("Filing 1", "")
        .replace("Name:", '"fullName":"')
        .replace("SSN:", '", "ssn":"')
        .replace("Address:", '", "deliveryAddress":"')
        .replace("Creditor Information Name:", '", "plaintiff":"')
        .replace("Jurisdiction", '", "state":"')
        .replace("Filing Information", "")
        .replace("Amount", '", "amount":"')
        .replace("Filing Date", '", "filingDate":"')
        .concat('", "emailAddresses":"' + emails) +
      '"}';
  } else {
    leadBody =
      "{" +
      leadString
        .replace(/[\s,]+/g, " ")
        .trim()
        .replace("Debtor 1", "")
        .replace("Debtor 2", "")
        .replace("Filing 1", "")
        .replace("Name:", '"fullName":"')
        .replace("SSN:", '", "ssn":"')
        .replace("Address:", '", "deliveryAddress":"')
        .replace("Creditor Information Name:", '", "plaintiff":"')
        .replace("Jurisdiction", '", "state":"')
        .replace("Filing Information", "")
        .replace("Amount", '", "amount":"')
        .replace("Filing Date", '", "filingDate":"')
        .concat('", "emailAddresses":"' + emails) +
      '"}';
  }

  let lead = JSON.parse(leadBody);
  console.log(lead.deliveryAddress, "1111111111111");
  lead.county = lead.deliveryAddress
    .match(/(?<=(\d+)(?!.*\d)\s*).*?(?=\s*COUNTY)/gs)
    .toString();
  if (phone1) {
    lead.phones = phone1.filter((str) => str.includes("("));
  }

  if (lead.amount != null) {
    lead.amount = lead.amount.replace(":", "");
  }

  lead.filingDate = lead.filingDate.replace(": ", "");
  lead.state = lead.state.replace(":", "").replace(": ", "");

  if (lead.plaintiff != null) {
    lead.plaintiff = lead.plaintiff
      .split(" ")
      .filter(function (el) {
        return el != "";
      })
      .toString()
      .replace(",", " ")
      .replace(",", " ")
      .toProperCase();
  }

  if (lead.deliveryAddress)
    lead.zip4 = lead.deliveryAddress
      .substring(
        lead.deliveryAddress.lastIndexOf(lead.state),
        lead.deliveryAddress.lastIndexOf(lead.county)
      )
      .split(" ")
      .splice(-1)
      .toString();

  if (lead.deliveryAddress != null) {
    lead.city = lead.deliveryAddress
      .substring(0, lead.deliveryAddress.indexOf(lead.state))
      .split(" ")
      .filter(function (el) {
        return el != "";
      })
      .splice(-1)
      .toString();
  }

  if (lead.ssn != null) {
    lead.ssn = lead.ssn
      .split(" ")
      .filter(function (el) {
        return el != "";
      })
      .toString();
  }

  if (lead.amount != null) {
    lead.amount = lead.amount
      .split(" ")
      .filter(function (el) {
        return el != "";
      })
      .toString();
  }

  if (lead.deliveryAddress != null) {
    lead.deliveryAddress = lead.deliveryAddress
      .substring(0, lead.deliveryAddress.indexOf(lead.city))
      .split(" ")
      .filter(function (el) {
        return el != "";
      })
      .toString()
      .replace(",", " ")
      .replace(",", " ")
      .replace(",", " ")
      .toProperCase();
  }

  if (lead.city != null) {
    lead.city = lead.city.toProperCase();
  }

  if (lead.county != null) {
    lead.county = lead.county
      .split(" ")
      .filter(function (el) {
        return el != "";
      })
      .toString()
      .toProperCase();
  }

  if (lead.state != null) {
    lead.state = lead.state
      .split(" ")
      .filter(function (el) {
        return el != "";
      })
      .toString();
  }

  if (lead.fullName != null) {
    lead.firstName = lead.fullName
      .split(" ")
      .filter(function (el) {
        return el != "";
      })[1]
      .toString()
      .toProperCase();
  }

  if (lead.fullName != null) {
    lead.lastName = lead.fullName
      .split(" ")
      .filter(function (el) {
        return el != "";
      })[0]
      .toString()
      .toProperCase();
  }
  if (lead.fullName != null) {
    lead.fullName = lead.fullName.replace(
      lead.fullName,
      lead.firstName + " " + lead.lastName
    );
  }

  if (real1 != null) {
    let realIndex1 = real1.toString().search(/Name/);
    let realIndex2 = real1.toString().search(/Address/);
    let realIndex3 = real1.toString().search(/County\/FIPS/);
    let realIndex4 = real1.toString().search(/Mortgage Information/);

    const realField1 = real1.toString().slice(realIndex1, realIndex2);
    const realField2 = real1.toString().slice(realIndex2, realIndex3);
    const realField3 = real1
      .toString()
      .slice(realIndex4, real1.toString().length);

    const colon1 = realField1.search(":");
    const colon2 = realField2.search(":");

    const name =
      '"' +
      realField1.slice(0, colon1).toLowerCase() +
      '"' +
      ':"' +
      realField1.slice(colon1 + 1, realField1.length) +
      '",';

    const address =
      '"' +
      realField2.slice(0, colon2).toLowerCase() +
      '"' +
      ':"' +
      realField2.slice(colon2 + 1, realField2.length) +
      '",';

    const loan =
      '"' + realField3.slice(realField3.length - 16, realField3.length) + '"';

    const colon3 = loan.search(":");

    const bone =
      loan.slice(0, colon3) + '"' + ':"' + loan.slice(colon3 + 1, loan.length);

    const stone = bone.toLowerCase().trim();

    const realBody = "{" + name + address + stone + "}";

    lead.real = JSON.parse(realBody.replace(/\s{2,10}/g, " "));
  } else {
    lead.real = {
      name: "",
      address: "",
      amount: "",
    };
  }

  if (bankruptcy1) {
    let bankIndex1 = bankruptcy1.toString().search(/Bankruptcy Information/);
    let bankIndex2 = bankruptcy1.toString().search(/Court/);
    let bankIndex3 = bankruptcy1.toString().search(/Filing Date/);
    let bankIndex4 = bankruptcy1.toString().search(/Filing Type/);

    const bankField1 = bankruptcy1.toString().slice(bankIndex1, bankIndex2);
    const bankField2 = bankruptcy1.toString().slice(bankIndex2, bankIndex3);
    const bankField3 = bankruptcy1
      .toString()
      .slice(bankIndex4, bankruptcy1.toString().length);

    const colon4 = bankField1.search(":");
    const colon5 = bankField2.search(":");
    const colon6 = bankField3.search(":");

    const loc =
      '"' +
      bankField2.slice(0, colon5).toLowerCase().trim() +
      '"' +
      ':"' +
      bankField2.slice(colon5 + 1, bankField2.length - 1).trim() +
      '",';

    const gock = loc.replace(/\r?\n|\r/g, "");

    const negro =
      '"' +
      bankField3.slice(0, colon6).toLowerCase().trim() +
      '"' +
      ':"' +
      bankField3.slice(colon6 + 1, bankField3.length).trim() +
      '"';

    const begro = negro.replace(" type", "Type");

    const bankBody = "{" + gock + begro + "}";

    lead.bankruptcy = JSON.parse(bankBody);
  }
  lead.age = string.match(/(?<=[(]Age:\s*).*?(?=\s*[)])/gs)[0].toString();
  lead.dob = string
    .match(/(?<=[-]XXXX\s*).*?(?=\s*[(]Age:)/gs)[0]
    .toString()
    .trim();

  lead.filingDate = lead.filingDate.replace(":", "").trim();

  lead.dob = lead.dob.substring(0, 7);

  const regex = new RegExp("/((^[A-Z][,][A-Z]))/", "g");

  lead.emailAddresses = lead.emailAddresses.split(",").filter(distinct);

  const {
    fullName,
    ssn,
    deliveryAddress,
    plaintiff,
    state,
    amount,
    filingDate,
    emailAddresses,
    county,
    phones,
    zip4,
    city,
    firstName,
    lastName,
    real,
    bankruptcy,
    age,
    dob,
  } = lead;

  const enriched = await Prospect.findByIdAndUpdate(
    req.params.id,
    {
      "$set": {
        "fullName": fullName,
        "ssn": ssn,
        "deliveryAddress": deliveryAddress,
        "plaintiff": plaintiff,
        "state": state,
        "amount": amount,
        "filingDate": filingDate,
        "county": county,
        "zip4": zip4,
        "city": city,
        "firstName": firstName,
        "lastName": lastName,
        "age": age,
        "dob": dob,
        "bankruptcy": bankruptcy,
        "real.name": real.name,
        "real.address": real.address,
        "real.amount": real.amount,
      },
      "$push": {
        "phones": phones,
        "emailAddresses": emailAddresses,
      },
    },
    { new: true, upsert: true }
  );
  res.json(enriched);
  console.log(enriched);
});

router.post("/form", auth, async (req, res) => {
  var pdfParser = hummus.createReader("/f1040");
  var digitalForm = new PDFDigitalForm(pdfParser);
  // save form values into fields.json
  if (digitalForm.hasForm()) {
    fs.writeFileSync(
      "./fields.json",
      JSON.stringify(digitalForm.fields, null, 4)
    );
  }
});

router.delete("/lienid", auth, async (req, res) => {
  const lienid = req.query.q;

  let prospects = await Prospect.find({ lienid: lienid });

  const deal = prospects.find((prospect) => prospect.paymentStatus.total > 0);

  let callids;

  console.log("1111111", lienid);
  console.log("1111111", prospects);
  console.log("1111111", deal);
  console.log("1111111", callids);

  prospects.forEach((prospect) => callids.push(prospect.callid));

  if (deal != null) {
    const notDeal = prospects.filter((prospect) => prospect._id != deal._id);

    const updated = prospects.findByIdAndUpdate(deal._id, {
      "$push": { "callids": callids },
    });

    updated.save();

    prospects = await Prospect.deleteMany({ _id: notDeal._id });

    res.json(prospects);
  }
});
router.post("/email", fileLoad.any(), auth, async (req, res) => {
  console.log(req.files);

  const files = req.files;

  let attachment = files.map(({ originalname, buffer }) => ({
    filename: originalname,
    content: new Buffer(buffer, "application/pdf"),
  }));

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: "lienunit@nattaxgroup.com",
      serviceClient: key.client_id,
      privateKey: key.private_key,
    },
  });

  /*
  const options = {
    viewEngine: {
      extName: ".hbs",
      partialsDir: path.join(__dirname, "pdfs"),
      layoutsDir: path.join(__dirname, "pdfs"),
      defaultLayout: false,
    },
    viewPath: "pdfs",
    extName: ".hbs",
  };
*/
  //transporter.use("compile", hbs(options));

  const mailer = {
    title: req.body.subject,
    from: req.body.from,
    to: req.body.to,
    subject: req.body.subject,
    attachments: attachment,
    //  template: "template",
    // context: {
    //   lead: lead,
    // }
    text: req.body.text,
  };

  console.log(mailer);
  transporter.sendMail(mailer);
});

router.get("/status", auth, async (req, res) => {
  const regex = new RegExp(`${req.query.q}`, "gi");
  const prospects = await Prospect.find({ status: req.query.q });

  console.log(prospects);
  res.json(prospects);
});

router.post("/calls", auth, async (req, res, next) => {
  const {
    answered,
    first_call,
    formatted_customer_name,
    total_calls,
    source_name,
    callid,
    formatted_customer_phone_number,
    customer_city,
    customer_name,
    customer_phone_number,
    customer_state,
    start_time,
    id,
    tracking_phone_number,
  } = req.body;

  try {
    const newCall = new Call({
      answered,
      first_call,
      formatted_customer_name,
      total_calls,
      source_name,
      formatted_customer_phone_number,
      customer_name,
      customer_state,
      callid,
      tracking_phone_number,
      start_time,
    });

    const call = await newCall.save();

    res.json(call);
    next(call);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/calls", auth, async (req, res, next) => {
  const call = await Call.find().limit(1).sort({ $natural: -1 });

  res.json(call);
});

router.get("/calls/today/", auth, async (req, res) => {
  const calls = await Call.find();

  res.json(calls);
});

router.get("/payments/searchDates", auth, async (req, res) => {
  const ranges = JSON.parse(req.query.q);

  const { startDate, endDate } = ranges;

  const date1 = new Date(startDate);
  const date2 = new Date(endDate);
  const prospects = await Prospect.find().sort({
    "paymentSchedule.paymentDate": -1,
  });

  var payments = [];
  function getPayments(prospects) {
    for (var i = 0; i < prospects.length; i++) {
      payments.push(prospects[i].paymentSchedule);
    }
    return payments;
  }

  getPayments(prospects);

  let merged = [].concat.apply([], payments);

  var filtered = merged.filter(function (el) {
    return el != null;
  });

  let paymentArray = [];
  for (var i = 0; i < filtered.length; i++) {
    if (filtered[i].paymentAmount != null) {
      paymentArray.push(filtered[i]);
    }
  }

  console.log(paymentArray);

  var dateFilter = paymentArray.filter((a) => {
    var date = new Date(a.paymentDate);
    return date >= date1 && date <= date2;
  });
  res.json(dateFilter);
});

router.get("/payments/today/", auth, async (req, res) => {
  const prospects = await Prospect.find().sort({
    "paymentSchedule.paymentDate": -1,
  });

  var payments = [];
  function getPayments(prospects) {
    for (var i = 0; i < prospects.length; i++) {
      payments.push(prospects[i].paymentSchedule);
    }
    return payments;
  }

  getPayments(prospects);

  let merged = [].concat.apply([], payments);

  var filtered = merged.filter(function (el) {
    return el != null;
  });

  let paymentArray = [];
  for (var i = 0; i < filtered.length; i++) {
    if (filtered[i].paymentAmount != null) {
      paymentArray.push(filtered[i]);
    }
  }

  res.json(paymentArray);
});

router.get("/paymentMethods/", auth, async (req, res) => {
  const prospect = await Prospect.findOne({
    "paymentSchedule._id": req.query.q,
  });

  const payment = prospect.paymentSchedule.filter(
    (payment) => payment._id == req.query.q
  );

  const p = payment.pop();

  const regex = new RegExp(`/${p.paymentMethod}/`, "gi");
  let paymentData = {};
  const clientId = prospect._id;
  if (prospect.paymentMethods.length > 1) {
    paymentData = prospect.paymentMethods.find(
      (paymentMethod) => paymentMethod.name === p.paymentMethod
    );

    const paymentMethod = {
      clientId,
      paymentData,
    };
    console.log(paymentMethod);
    res.json(paymentMethod);
  } else {
    paymentData = prospect.paymentMethods.pop();
    const paymentMethod = {
      clientId,
      paymentData,
    };
    console.log(paymentMethod);
    res.json(paymentMethod);
  }
});

router.get("/today", auth, async (req, res) => {
  // console.log(req);

  const today = moment().startOf("day");

  const prospects = await Prospect.find({
    createDate: {
      $gte: today.toDate(),
      $lte: moment(today).endOf("day").toDate(),
    },
  });

  console.log(prospects);
  res.json(prospects);
});

router.get("/caseWorkers", auth, async (req, res) => {
  console.log(req.query.q);
  const prospects = await Prospect.find({
    $or: [
      { "caseWorkers.originators.name": req.query.q },
      { "caseWorkers.loanProcessors.name": req.query.q },

      { "caseWorkers.documentProcessors.name": req.query.q },

      { "caseWorkers.upsell.name": req.query.q },

      { "caseWorkers.federalReso.name": req.query.q },
      { "caseWorkers.stateReso.name": req.query.q },
    ],
  }).sort("-createDate");

  res.json(prospects);
});

router.get("/", auth, async (req, res) => {
  const regex = new RegExp(`${req.query.q}`, "gi");
  const prospects = await Prospect.find({
    $or: [
      { fullName: regex },
      { deliveryAddress: regex },
      { pinCode: regex },
      { ssn: regex },
    ],
  });

  res.json(prospects);
});

router.post("/", auth, async (req, res) => {
  const {
    phone,
    fullName,
    deliveryAddress,
    city,
    state,
    tracking,
    callid,
    source,
    zip4,
    plaintiff,
    amount,
    lienid,
    emailAddress,
    pinCode,
    compliant,
    filingStatus,
    cpa,
    ssn,
    real,
    age,
    dob,
    emailAddresses,
    phones,
    bankruptcy,
  } = req.body;

  console.log(lienid);
  /*
  let name2;
  let address2;
  let city2;
  let state2;
  let zip2;
  let employerTime;
  let ssn2;
  let pinCode2;
  let dob;
  let dob2;
  let relation;
  let phone2;
  let phone3;
  let email2;
  let email3;
  let prac;
  let problem1;
  let problem2;
  let problem3;
  let resSold;
  let resSold2;
  let home;
  let homePay;
  let wages;
  let income1Type;
  let income1Value;
  let income2Type;
  let income2Value;
  let income3Type;
  let income3Value;
  let otherIncomeType;
  let otherIncomeValue;
  let creditScore;
  let availableCredit;
  let totalCredit;
  let employerName;
  let employerPhone;
  let closerId;
  let _id;
*/
  let dateDisplay1 = new Date(Date.now());
  let createDate = Intl.DateTimeFormat(
    "fr-CA",
    { timeZone: "America/Los_Angeles" },
    {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }
  ).format(dateDisplay1);
  const newProspect = new Prospect({
    fullName,
    deliveryAddress,
    city,
    state,
    zip4,
    plaintiff,
    amount,
    lienid,
    tracking,
    callid,
    source,
    phone,
    emailAddress,
    pinCode,
    compliant,
    filingStatus,
    cpa,
    ssn,
    createDate,
    real,
    age,
    dob,
    emailAddresses,
    phones,
    bankruptcy,
  });

  const prospect = await newProspect.save();

  res.json(prospect);
});

router.get("/:_id/resoStatus", auth, async (req, res) => {
  const id = req.query.q;

  console.log(req.query.q);
  const conn = mongoose.connection;
  const gfs = Grid(conn.db, mongoose.mongo);
  const prospect = await Prospect.findById(req.params._id);
  const { resoStatus } = prospect;

  const {
    representation,
    federalFile,
    stateFile,
    hardship,
    offer,
    paymentPlan,
    appeal,
    corp,
    annuity,
  } = resoStatus;

  const docs = representation.concat(
    federalFile,
    stateFile,
    hardship,
    offer,
    paymentPlan,
    appeal,
    corp,
    annuity
  );

  console.log(docs);

  function search(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].id === nameKey) {
        return myArray[i];
      }
    }
  }
  var file = search(id, docs);

  console.log(file);
  const fileName = file.document;

  gfs.files.find({ filename: fileName }).toArray(function (err, files) {
    if (err) {
      res.json(err);
    }

    console.log(files);
    if (files.length > 0) {
      var mime = files[0].contentType;
      var filename = files[0].filename;
      res.set("Content-Type", mime);
      res.set("Content-Disposition", "inline; filename=" + filename);
      var read_stream = gfs.createReadStream({ filename: filename });
      read_stream.pipe(res);
    } else {
      res.json("File Not Found");
    }
  });
});

router.put("/:id", auth, async (req, res) => {
  const {
    quote,
    createdBy,
    closerId,
    fullName,
    city,
    state,
    zip4,
    plaintiff,
    amount,
    email,
    pinCode,
    compliant,
    deliveryAddress,
    filingStatus,
    cpa,
    ssn,
    phone,
    name2,
    address2,
    city2,
    state2,
    zip2,
    employerTime,
    ssn2,
    pinCode2,
    dob,
    dob2,
    relation,
    phone2,
    phone3,
    email2,
    email3,
    prac,
    problem1,
    problem2,
    problem3,
    resSold,
    resSold2,
    home,
    homePay,
    wages,
    income1Type,
    income1Value,
    income2Type,
    income2Value,
    income3Type,
    income3Value,
    otherIncomeType,
    otherIncomeValue,
    creditScore,
    availableCredit,
    totalCredit,
    employerName,
    employerPhone,
  } = req.body;

  const leadFields = {};

  if (dob) leadFields.dob = dob;
  if (quote) leadFields.quote = quote;
  if (dob2) leadFields.dob2 = dob2;
  if (createdBy) leadFields.createdBy = createdBy;
  if (closerId) leadFields.closerId = closerId;
  if (fullName) leadFields.fullName = fullName;
  if (email) leadFields.email = email;
  if (phone) leadFields.phone = phone;
  if (deliveryAddress) leadFields.deliveryAddress = deliveryAddress;
  if (city) leadFields.city = city;
  if (state) leadFields.st = state;
  if (zip4) leadFields.zip4 = zip4;
  if (ssn2) leadFields.ssn2 = ssn2;
  if (pinCode2) leadFields.pinCode2 = pinCode2;
  if (zip2) leadFields.zip2 = zip2;
  if (relation) leadFields.relation = relation;
  if (plaintiff) leadFields.plaintiff = plaintiff;
  if (amount) leadFields.amount = amount;
  if (email) leadFields.email = email;
  if (pinCode) leadFields.pinCode = pinCode;
  if (compliant) leadFields.compliant = compliant;
  if (filingStatus) leadFields.filingStatus = filingStatus;
  if (cpa) leadFields.cpa = cpa;
  if (ssn) leadFields.ssn = ssn;
  if (name2) leadFields.name2 = name2;
  if (email2) leadFields.email2 = email2;
  if (phone2) leadFields.phone2 = phone2;
  if (email3) leadFields.email3 = email3;
  if (phone3) leadFields.phone3 = phone3;
  if (address2) leadFields.address2 = address2;
  if (city2) leadFields.city2 = city2;
  if (state2) leadFields.state2 = state2;
  if (zip2) leadFields.zip2 = zip2;
  if (prac) leadFields.prac = prac;
  if (problem1) leadFields.problem1 = problem1;
  if (problem2) leadFields.problem2 = problem2;
  if (problem3) leadFields.problem3 = problem3;
  if (resSold) leadFields.resSold = resSold;
  if (resSold2) leadFields.resSold2 = resSold2;
  if (home) leadFields.home = home;
  if (homePay) leadFields.homePay = homePay;
  if (wages) leadFields.wages = wages;
  if (income1Type) leadFields.income1Type = income1Type;
  if (income1Value) leadFields.income1Value = income1Value;
  if (income2Type) leadFields.income2Type = income2Type;
  if (income1Value) leadFields.income2Value = income2Value;
  if (income3Type) leadFields.income3Type = income3Type;
  if (income3Value) leadFields.income3Value = income3Value;
  if (otherIncomeValue) leadFields.otherIncomeValue = otherIncomeValue;
  if (otherIncomeType) leadFields.otherIncomeType = otherIncomeType;
  if (creditScore) leadFields.creditScore = creditScore;
  if (availableCredit) leadFields.availableCredit = availableCredit;
  if (totalCredit) leadFields.totalCredit = totalCredit;
  if (employerName) leadFields.employerName = employerName;
  if (employerPhone) leadFields.employerPhone = employerPhone;
  if (employerName) leadFields.employerTime = employerTime;

  try {
    let prospect = await Prospect.findByIdAndUpdate(
      req.params.id,
      { $set: leadFields },
      { new: true }
    );
    res.json(prospect);
    console.log(prospect);
  } catch (err) {
    console.log(err);
  }
});

router.post("/:_id/notes", auth, async (req, res) => {
  console.log(req.body);

  const prospect = await Prospect.findByIdAndUpdate(req.params._id, {
    $push: {
      "notes": {
        text: req.body.text,
        postedBy: req.body.postedBy,
        postedDate: req.body.postedDate,
        id: req.body.id,
        updatedBy: req.body.postedBy,
        updatedDate: req.body.postedDate,
      },
    },
  });
  res.json(prospect);

  console.log(prospect);
});

router.put("/:_id/notes", auth, async (req, res) => {
  const { note, user } = req.body;

  const { text, updatedBy, id, updatedDate, postedBy, postedDate } = note;
  const { name } = user;

  let prospect = await Prospect.findByIdAndUpdate(req.params._id, {
    $pull: { notes: { id: id } },
  });

  prospect = await Prospect.findByIdAndUpdate(req.params._id, {
    $push: {
      notes: {
        text: text,
        postedBy: postedBy,
        postedDate: postedDate,
        updatedBy: name,
        updatedDate: Date.now(),
        id: uuidv4(),
      },
    },
  });

  res.json(prospect);
});

router.get("/:id", auth, async (req, res) => {
  // console.log(req);
  const prospect = await Prospect.findById(req.params.id);

  res.json(prospect);
});

router.put("/:_id/caseWorkers/loanProcessors", auth, async (req, res) => {
  const prospect = await Prospect.findByIdAndUpdate(req.params._id, {
    "$push": {
      "caseWorkers.loanProcessors": {
        "name": req.body.name,
        "email": req.body.email,
        "role": req.body.role,
        "resoCred1": req.body.resoCred1,
        "resoCred2": req.body.resoCred2,
      },
    },
  });

  res.json(prospect);
  console.log(prospect);
});

router.put("/:_id/caseWorkers/documentProcessors", auth, async (req, res) => {
  const prospect = await Prospect.findByIdAndUpdate(req.params._id, {
    "$push": {
      "caseWorkers.documentProcessors": {
        "name": req.body.name,
        "email": req.body.email,
        "role": req.body.role,
        "resoCred1": req.body.resoCred1,
        "resoCred2": req.body.resoCred2,
      },
    },
  });

  res.json(prospect);
  console.log(prospect);
});

router.put("/:_id/caseWorkers/taxPreparers", auth, async (req, res) => {
  const prospect = await Prospect.findByIdAndUpdate(req.params._id, {
    "$push": {
      "caseWorkers.taxPreparers": {
        "name": req.body.name,
        "email": req.body.email,
        "role": req.body.role,
        "resoCred1": req.body.resoCred1,
        "resoCred2": req.body.resoCred2,
      },
    },
  });

  res.json(prospect);
  console.log(prospect);
});
router.put("/:_id/caseWorkers/originators", auth, async (req, res) => {
  const prospect = await Prospect.findByIdAndUpdate(req.params._id, {
    "$push": {
      "caseWorkers.originators": {
        "name": req.body.name,
        "email": req.body.email,
        "role": req.body.role,
        "resoCred1": req.body.resoCred1,
        "resoCred2": req.body.resoCred2,
      },
    },
  });

  res.json(prospect);
  console.log(prospect);
});
router.put("/:_id/caseWorkers/upsells", auth, async (req, res) => {
  const prospect = await Prospect.findByIdAndUpdate(req.params._id, {
    "$push": {
      "caseWorkers.upsells": {
        "name": req.body.name,
        "email": req.body.email,
        "role": req.body.role,
        "resoCred1": req.body.resoCred1,
        "resoCred2": req.body.resoCred2,
      },
    },
  });

  res.json(prospect);
  console.log(prospect);
});
router.put("/:_id/caseWorkers/federalReso", auth, async (req, res) => {
  const prospect = await Prospect.findByIdAndUpdate(req.params._id, {
    "$push": {
      "caseWorkers.federalReso": {
        "name": req.body.name,
        "email": req.body.email,
        "role": req.body.role,
        "resoCred1": req.body.resoCred1,
        "resoCred2": req.body.resoCred2,
      },
    },
  });

  res.json(prospect);
  console.log(prospect);
});

router.put("/:_id/caseWorkers/stateReso", auth, async (req, res) => {
  const prospect = await Prospect.findByIdAndUpdate(req.params._id, {
    "$push": {
      "caseWorkers.stateReso": {
        "name": req.body.name,
        "email": req.body.email,
        "role": req.body.role,
        "resoCred1": req.body.resoCred1,
        "resoCred2": req.body.resoCred2,
      },
    },
  });

  res.json(prospect);
  console.log(prospect);
});

router.put("/:_id/paymentMethods", auth, async (req, res) => {
  console.log(req.body);
  const prospect = await Prospect.findByIdAndUpdate(req.params._id, {
    "$push": {
      "paymentMethods": {
        "name": req.body.name,
        "cardNumber": req.body.cardNumber,
        "expiryDate": req.body.expiryDate,
        "cvc": req.body.cvc,
        "accBank": req.body.accBank,
        "accType": req.body.accType,
        "accRouting": req.body.accRouting,
        "accNo": req.body.accNo,
        "contact": req.body.contact,
        "totalBalance": req.body.totalBalance,
        "availableBalance": req.body.availableBalance,
      },
    },
  });

  res.json(prospect);
  console.log(prospect);
});

router.put("/:_id/paymentSchedule/:_id", auth, async (req, res) => {
  console.log(req.body);

  console.log(req.params);

  const { newPayment } = req.body;
  const { paymentAmount, paymentMethod, paymentDate, paymentId } = newPayment;

  const prospect = await Prospect.findOneAndUpdate(
    {
      "_id": req.body.prospectid,
      "paymentSchedule._id": req.params._id,
    },
    {
      "$set": {
        "paymentSchedule.$.paymentAmount": paymentAmount,
        "paymentSchedule.$.paymentMethod": paymentMethod,
        "paymentSchedule.$.paymentDate": paymentDate,
        "paymentSchedule.$.paymentId": paymentId,
      },
    },
    { new: true }
  );

  res.json(prospect);
});

/*
  const {
    federalFile,
    stateFile,
    hardship,
    paymentPlan,
    offer,
    corp,
  } = req.body;

  let resoFields = {};

  if (federalFile) resoFields.federalFile = federalFile;
  if (stateFile) resoFields.stateFile = stateFile;
  if (hardship) resoFields.hardship = hardship;
  if (paymentPlan) resoFields.paymentPlan = paymentPlan;
  if (offer) resoFields.offer = offer;
  if (corp) resoFields.corp = corp;

  let prospect = await Prospect.findByIdAndUpdate(
    req.params.id,
    { $set: { "resoStatus": resoFields } },
    { new: true }
  );

  res.json(prospect);
  */

router.get("/:_id/notes", auth, async (req, res) => {
  const prospect = await Prospect.findById(req.params.id);

  res.json(prospect);

  console.log(prospect);
});

router.get("/:_id/fullName", auth, async (req, res) => {
  let prospect = await Prospect.findById(req.params._id);

  res.json(prospect);
});

router.delete("/:_id/notes/", auth, async (req, res) => {
  console.log(req.query.q);
  try {
    const prospect = await Prospect.findByIdAndUpdate(req.params._id, {
      $pull: { "notes": { "id": req.query.q } },
    });

    res.json(prospect);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/:_id/paymentMethods/", auth, async (req, res) => {
  console.log(req.query.q);
  try {
    const prospect = await Prospect.findByIdAndUpdate(req.params._id, {
      $pull: { "paymentMethods": { "_id": req.query.q } },
    });

    res.json(prospect);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/:_id/caseWorkers/", auth, async (req, res) => {
  console.log(req.query.q);
  try {
    const prospect = await Prospect.findByIdAndUpdate(req.params._id, {
      $pull: {
        "caseWorkers.originators": { "_id": req.query.q },
        "caseWorkers.documentProcessors": { "_id": req.query.q },
        "caseWorkers.loanProcessors": { "_id": req.query.q },
        "caseWorkers.federalReso": { "_id": req.query.q },
        "caseWorkers.stateReso": { "_id": req.query.q },
        "caseWorkers.taxPreparers": { "_id": req.query.q },
        "caseWorkers.upsells": { "_id": req.query.q },
      },
    });

    res.json(prospect);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/:_id/paymentSchedule/", auth, async (req, res) => {
  console.log(req.params._id);
  try {
    let prospect = await Prospect.findByIdAndUpdate(req.params._id, {
      $pull: { "paymentSchedule": { "_id": req.query.q } },
    });

    res.json(prospect);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:id/paymentStatus", auth, async (req, res) => {
  let prospect = await Prospect.findById(req.params.id);

  res.json(prospect.paymentStatus);
});

router.put("/:_id/paymentSchedule", auth, async (req, res) => {
  let prospect = await Prospect.findByIdAndUpdate(req.params._id, {
    "$push": { "paymentSchedule": req.body },
  });

  res.json(prospect);

  console.log(prospect);
});

router.put("/:_id/status", auth, async (req, res) => {
  console.log(req.body, "111111");

  const { val } = req.body;
  const status = Object.values(val)
    .toString()
    .replace(",", "")
    .replace(",", "")
    .replace(",", "")
    .replace(",", "")
    .replace(",", "")
    .replace(",", "")
    .replace(",", "")
    .replace(",", "")
    .replace(",", "")
    .replace(",", "")
    .replace(",", "")
    .replace(",", "")
    .replace(",", "")
    .replace(",", "");

  console.log(status, "11111111111111111111111111111111111111111");

  let prospect = await Prospect.findByIdAndUpdate(req.params._id, {
    "$set": {
      "status": status,
    },
  });

  res.json(prospect);

  console.log(prospect);
});

router.put("/:id/paymentSchedule/:id/paymentId", auth, async (req, res) => {
  const payid = Object.values(req.body).toString();

  const prospect = await Prospect.findOneAndUpdate(
    {
      "paymentSchedule._id": req.params.id,
    },
    {
      "$set": {
        "paymentSchedule.$.paymentId": payid,
      },
    },
    { new: true }
  );

  console.log(prospect);
  res.json(prospect);
});

router.get("/:id", auth, async (req, res) => {
  // console.log(req);
  const prospect = await Prospect.findById(req.params.id);

  res.json(prospect);
});

router.get("/:id/paymentStatus", auth, async (req, res) => {
  let prospect = await Prospect.findById(req.params.id);

  res.json(prospect.paymentStatus);
});

router.get("/:id/paymentSchedule", auth, async (req, res) => {
  let prospect = await Prospect.findById(req.params.id);
  console.log(req.params.id, "111111");
  const { paymentSchedule } = prospect;

  let totalPay = [];
  let redPay = [];
  let refPay = [];
  let paymentsLeft = [];

  console.log(paymentSchedule);

  paymentSchedule.forEach((payment) => {
    switch (true) {
      case payment.paymentId.length > 30:
        totalPay.push(payment);
        break;
      case payment.paymentId.length === 18:
        redPay.push(payment);
        break;
      case payment.paymentId.length === 19:
        refPay.push(payment);
        break;
      case payment.paymentId.length === 0:
        paymentsLeft.push(payment);
        break;
    }
  });

  const paymentArrays = {
    totalPay,
    redPay,
    refPay,
    paymentsLeft,
  };

  const quoteArray = paymentsLeft.map(function (payment) {
    return payment.paymentAmount;
  });

  const payArray = totalPay.map(function (payment) {
    return payment.paymentAmount;
  });

  const redArray = redPay.map(function (payment) {
    return payment.paymentAmount;
  });

  const refArray = refPay.map(function (payment) {
    return payment.paymentAmount;
  });

  redArray.push(0);
  refArray.push(0);
  payArray.push(0);
  quoteArray.push(0);

  const paymentsRemaining = paymentsLeft.length;

  console.log(paymentsLeft.length);
  console.log(totalPay.length);
  console.log(paymentsRemaining);

  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  const total = payArray.reduce(reducer).toFixed(2);
  const redLine = redArray.reduce(reducer).toFixed(2);
  const refunded = refArray.reduce(reducer).toFixed(2);
  const balance = quoteArray.reduce(reducer).toFixed(2);

  const quote = parseFloat(total) + parseFloat(balance);

  if (redLine < 1) redArray.pop();
  if (refArray < 1) refArray.pop();
  if (payArray < 1) payArray.pop();

  let gross = 0;
  let initialPaymentDate = 0;
  let lastPaymentDate = 0;
  let lastPayment = 0;
  let initial = 0;
  let percentPaid = 0;

  if (total > 0)
    initialPayment = totalPay.reduce((r, o) =>
      o.paymentDate < r.paymentDate ? o : r
    );

  if (total > 0)
    lastPayment = totalPay.reduce((r, o) =>
      o.paymentDate > r.paymentDate ? o : r
    );
  if (total > 0) gross = quote - refunded;
  if (total > 0) initialPaymentDate = initialPayment.paymentDate;
  if (total > 0) lastPaymentDate = lastPayment.paymentDate;
  if (total > 0) initial = initialPayment.paymentAmount;
  if (total > 0) lastPayment = lastPayment.paymentAmount;
  if (total > 0) percentPaid = total / gross;

  const paymentStatus = {
    quote,
    gross,
    initial,
    total,
    redLine,
    refunded,
    balance,
    initialPaymentDate,
    lastPaymentDate,
    lastPayment,
    percentPaid,
    paymentsRemaining,
  };

  console.log(paymentStatus);

  const prospect2 = await Prospect.findByIdAndUpdate(
    req.params.id,
    {
      "$set": {
        "paymentStatus.quote": paymentStatus.quote,
        "paymentStatus.gross": paymentStatus.gross,
        "paymentStatus.initial": paymentStatus.initial,
        "paymentStatus.total": paymentStatus.total,
        "paymentStatus.redLine": paymentStatus.redLine,
        "paymentStatus.refunded": paymentStatus.refunded,
        "paymentStatus.balance": paymentStatus.balance,
        "paymentStatus.initialPaymentDate": paymentStatus.initialPaymentDate,
        "paymentStatus.lastPaymentDate": paymentStatus.lastPaymentDate,
        "paymentStatus.lastPayment": paymentStatus.lastPayment,
        "paymentStatus.percentPaid": paymentStatus.percentPaid,
        "paymentStatus.paymentsRemaining": paymentStatus.paymentsRemaining,
      },
    },
    { new: true }
  );

  console.log(prospect2.paymentStatus);

  res.json(prospect2);
});

router.put(
  "/:id/resoStatus/representation/:id",
  upload,
  auth,
  async (req, res) => {
    console.log(req.params.id);
    const prospect = await Prospect.findOneAndUpdate(
      { "_id": req.body.prospectId },
      {
        "$set": {
          "resoStatus.representation.$[].document": req.file.filename,
          "resoStatus.representation.$[].updatedDate": req.file.uploadDate,
          "resoStatus.representation.$[].id": req.body.id,
        },
        new: true,
        arrayFilters: [{ "_id": req.params.id }],
      },
      (err) => {
        if (err) res.status(400).json(err);
      }
    );

    console.log(prospect.resoStatus.representation);
    res.status(200).json(prospect);
  }
);

router.put("/:id/resoStatus/representation/", auth, async (req, res) => {
  console.log(req.body);

  const prospect = await Prospect.findByIdAndUpdate(req.params.id, {
    "$push": {
      "resoStatus.representation": {
        "name": req.body.name,
        "postedDate": req.body.postedDate,
        "assigned": req.body.assigned._id,
      },
    },
  });
  res.json(prospect);
  console.log(prospect);
});

router.put("/:id/resoStatus/federalFile/", auth, async (req, res) => {
  const prospect = await Prospect.findByIdAndUpdate(req.params.id, {
    "$push": {
      "resoStatus.federalFile": {
        "name": req.body.name,
        "postedDate": req.body.postedDate,
        "assigned": req.body.assigned._id,
      },
    },
  });
  res.json(prospect);
  console.log(prospect);
});

router.put(
  "/:id/resoStatus/federalFile/:id",
  upload,
  auth,
  async (req, res) => {
    const prospect = await Prospect.findOneAndUpdate(
      { "_id": req.body.prospectId },
      {
        "$set": {
          "resoStatus.representation.$[].document": req.file.filename,
          "resoStatus.representation.$[].updatedDate": req.file.uploadDate,
          "resoStatus.representation.$[].id": req.body.id,
        },
        new: true,
        arrayFilters: [{ "_id": req.params.id }],
      },
      (err) => {
        if (err) res.status(400).json(err);
      }
    );
    res.json(prospect);
    console.log(prospect);
  }
);

router.put("/:id/resoStatus/stateFile/", auth, async (req, res) => {
  const prospect = await Prospect.findByIdAndUpdate(req.params.id, {
    "$push": {
      "resoStatus.stateFile": {
        "name": req.body.name,
        "postedDate": req.body.postedDate,
        "assigned": req.body.assigned._id,
      },
    },
  });
  res.json(prospect);
  console.log(prospect);
});

router.put("/:id/resoStatus/stateFile/:id", upload, auth, async (req, res) => {
  const prospect = await Prospect.findOneAndUpdate(
    { "_id": req.body.prospectId },
    {
      "$set": {
        "resoStatus.representation.$[].document": req.file.filename,
        "resoStatus.representation.$[].updatedDate": req.file.uploadDate,
        "resoStatus.representation.$[].id": req.body.id,
      },
      new: true,
      arrayFilters: [{ "_id": req.params.id }],
    },
    (err) => {
      if (err) res.status(400).json(err);
    }
  );
  res.json(prospect);
  console.log(prospect);
});

router.put("/:id/resoStatus/hardship/:id", upload, auth, async (req, res) => {
  const prospect = await Prospect.findOneAndUpdate(
    { "_id": req.body.prospectId },
    {
      "$set": {
        "resoStatus.representation.$[].document": req.file.filename,
        "resoStatus.representation.$[].updatedDate": req.file.uploadDate,
        "resoStatus.representation.$[].id": req.body.id,
      },
      new: true,
      arrayFilters: [{ "_id": req.params.id }],
    },
    (err) => {
      if (err) res.status(400).json(err);
    }
  );
  res.json(prospect);
  console.log(prospect);
});
router.put("/:id/resoStatus/hardship/", auth, async (req, res) => {
  const prospect = await Prospect.findOneAndUpdate(
    { "_id": req.body.prospectId },
    {
      "$set": {
        "resoStatus.representation.$[].document": req.file.filename,
        "resoStatus.representation.$[].updatedDate": req.file.uploadDate,
        "resoStatus.representation.$[].id": req.body.id,
      },
      new: true,
      arrayFilters: [{ "_id": req.params.id }],
    },
    (err) => {
      if (err) res.status(400).json(err);
    }
  );
  res.json(prospect);
  console.log(prospect);
});

router.put(
  "/:id/resoStatus/paymentPlan/:id",
  upload,
  auth,
  async (req, res) => {
    const prospect = await Prospect.findOneAndUpdate(
      { "_id": req.body.prospectId },
      {
        "$set": {
          "resoStatus.representation.$[].document": req.file.filename,
          "resoStatus.representation.$[].updatedDate": req.file.uploadDate,
          "resoStatus.representation.$[].id": req.body.id,
        },
        new: true,
        arrayFilters: [{ "_id": req.params.id }],
      },
      (err) => {
        if (err) res.status(400).json(err);
      }
    );
    res.json(prospect);
    console.log(prospect);
  }
);
router.put("/:id/resoStatus/paymentPlan/", auth, async (req, res) => {
  console.log(req.file);
  const prospect = await Prospect.findByIdAndUpdate(req.params.id, {
    "$push": {
      "resoStatus.paymentPlan": {
        "name": req.body.name,
        "postedDate": req.body.postedDate,
        "assigned": req.body.assigned._id,
      },
    },
  });
  res.json(prospect);
  console.log(prospect);
});

router.put("/:id/resoStatus/offer/:id", upload, auth, async (req, res) => {
  const prospect = await Prospect.findOneAndUpdate(
    { "_id": req.body.prospectId },
    {
      "$set": {
        "resoStatus.representation.$[].document": req.file.filename,
        "resoStatus.representation.$[].updatedDate": req.file.uploadDate,
        "resoStatus.representation.$[].id": req.body.id,
      },
      new: true,
      arrayFilters: [{ "_id": req.params.id }],
    },
    (err) => {
      if (err) res.status(400).json(err);
    }
  );
  res.json(prospect);
  console.log(prospect);
});
router.put("/:id/resoStatus/offer/", auth, async (req, res) => {
  const prospect = await Prospect.findByIdAndUpdate(req.params.id, {
    "$push": {
      "resoStatus.offer": {
        "name": req.body.name,
        "postedDate": req.body.postedDate,
        "assigned": req.body.assigned._id,
      },
    },
  });
  res.json(prospect);
  console.log(prospect);
});

router.put("/:id/resoStatus/appeal/:id", upload, auth, async (req, res) => {
  const prospect = await Prospect.findOneAndUpdate(
    { "_id": req.body.prospectId },
    {
      "$set": {
        "resoStatus.representation.$[].document": req.file.filename,
        "resoStatus.representation.$[].updatedDate": req.file.uploadDate,
        "resoStatus.representation.$[].id": req.body.id,
      },
      new: true,
      arrayFilters: [{ "_id": req.params.id }],
    },
    (err) => {
      if (err) res.status(400).json(err);
    }
  );
  res.json(prospect);
  console.log(prospect);
});

router.put("/:id/resoStatus/appeal/", auth, async (req, res) => {
  const prospect = await Prospect.findByIdAndUpdate(req.params.id, {
    "$push": {
      "resoStatus.appeal": {
        "name": req.body.name,
        "postedDate": req.body.postedDate,
        "assigned": req.body.assigned._id,
      },
    },
  });
  res.json(prospect);
  console.log(prospect);
});

router.put("/:id/resoStatus/corp/:id", upload, auth, async (req, res) => {
  const prospect = await Prospect.findOneAndUpdate(
    { "_id": req.body.prospectId },
    {
      "$set": {
        "resoStatus.representation.$[].document": req.file.filename,
        "resoStatus.representation.$[].updatedDate": req.file.uploadDate,
        "resoStatus.representation.$[].id": req.body.id,
      },
      new: true,
      arrayFilters: [{ "_id": req.params.id }],
    },
    (err) => {
      if (err) res.status(400).json(err);
    }
  );
  res.json(prospect);
  console.log(prospect);
});

router.put("/:id/resoStatus/corp/", auth, async (req, res) => {
  const prospect = await Prospect.findByIdAndUpdate(req.params.id, {
    "$push": {
      "resoStatus.corp": {
        "name": req.body.name,
        "postedDate": req.body.postedDate,
        "assigned": req.body.assigned._id,
      },
    },
  });
  res.json(prospect);
  console.log(prospect);
});

router.put("/:id/resoStatus/annuity/:id", upload, auth, async (req, res) => {
  const prospect = await Prospect.findOneAndUpdate(
    { "_id": req.body.prospectId },
    {
      "$set": {
        "resoStatus.representation.$[].document": req.file.filename,
        "resoStatus.representation.$[].updatedDate": req.file.uploadDate,
        "resoStatus.representation.$[].id": req.body.id,
      },
      new: true,
      arrayFilters: [{ "_id": req.params.id }],
    },
    (err) => {
      if (err) res.status(400).json(err);
    }
  );
  res.json(prospect);
  console.log(prospect);
});
router.put("/:id/resoStatus/annuity/", auth, async (req, res) => {
  const prospect = await Prospect.findByIdAndUpdate(req.params.id, {
    "$push": {
      "resoStatus.annuity": {
        "name": req.body.name,
        "postedDate": req.body.postedDate,
        "assigned": req.body.assigned._id,
      },
    },
  });
  res.json(prospect);
  console.log(prospect);
});
module.exports = router;
