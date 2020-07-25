const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");
const PDF = require("../models/PDF");
const auth = require("../middleware/auth");
const mongoose = require("mongoose");
const csv = require("csvtojson");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
const key = require("../config/key.json");
const nodemailer = require("nodemailer");
const Email = require("../models/Email");
const hbs = require("nodemailer-express-handlebars");

//Add Leads to Mongo

router.post("/", auth, async (req, res) => {
  try {
    const leads = await Lead.insertMany(req.body);
    res.json(leads);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("servererr");
  }
});

router.get("/today", auth, async (req, res) => {
  const leads = await Lead.find();

  res.json(leads);
});

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

  lead.amount = lead.amount.replace(":", "");
  lead.filingDate = lead.filingDate.replace(": ", "");
  lead.state = lead.state.replace(":", "").replace(": ", "");
  lead.plaintiff = lead.plaintiff
    .split(" ")
    .filter(function (el) {
      return el != "";
    })
    .toString()
    .replace(",", " ")
    .replace(",", " ")
    .toProperCase();
  lead.zip4 = lead.deliveryAddress
    .substring(
      lead.deliveryAddress.lastIndexOf(lead.state),
      lead.deliveryAddress.lastIndexOf(lead.county)
    )
    .split(" ")
    .splice(-1)
    .toString();

  lead.city = lead.deliveryAddress
    .substring(0, lead.deliveryAddress.indexOf(lead.state))
    .split(" ")
    .filter(function (el) {
      return el != "";
    })
    .splice(-1)
    .toString();

  lead.ssn = lead.ssn
    .split(" ")
    .filter(function (el) {
      return el != "";
    })
    .toString();

  lead.amount = lead.amount
    .split(" ")
    .filter(function (el) {
      return el != "";
    })
    .toString();

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

  console.log(lead.city, "1111111111111");

  lead.city = lead.city.toProperCase();
  lead.county = lead.county
    .split(" ")
    .filter(function (el) {
      return el != "";
    })
    .toString()
    .toProperCase();
  lead.state = lead.state
    .split(" ")
    .filter(function (el) {
      return el != "";
    })
    .toString();

  lead.firstName = lead.fullName
    .split(" ")
    .filter(function (el) {
      return el != "";
    })[1]
    .toString()
    .toProperCase();

  lead.lastName = lead.fullName
    .split(" ")
    .filter(function (el) {
      return el != "";
    })[0]
    .toString()
    .toProperCase();

  lead.fullName = lead.fullName.replace(
    lead.fullName,
    lead.firstName + " " + lead.lastName
  );

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

  const enriched = await Lead.findByIdAndUpdate(
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

router.post("/lexis", auth, async (req, res) => {
  const string = Object.keys(req.body).toString();

  let reg = /LexID\(sm\):([\S]+)/gim; // Get hashtags.

  let matches = (string.match(reg) || []).map((e) => e.replace(reg, "$1"));
  console.log(matches);
});

router.get("/calls", auth, async (req, res) => {
  const call = await Call.find().limit(1).sort({ $natural: -1 });
});

router.post("/forms", async (req, res) => {
  console.log(req.body);
  const {
    fullName,
    emailAddress,
    status,
    years,
    employed,
    income,
    creditscore,
    phone,
    problem,
    company,
    paid,
  } = req.body;

  const newLead = new Lead({
    fullName,
    emailAddress,
    status,
    years,
    employed,
    income,
    creditscore,
    phone,
    problem,
    company,
    paid,
  });

  const lead = await newLead.save();

  res.json(lead);
});

router.delete("/", auth, async (req, res) => {
  Lead.deleteMany({ status: "dnc" })
    .then(function () {
      console.log("Data deleted"); // Success
    })
    .catch(function (error) {
      console.log(error); // Failure
    });
});

router.put("/:id/dnc", async (req, res) => {
  console.log(req.body);

  const { name, address, pinCode, emailAddress } = req.body;
  try {
    if (pinCode != null) {
      const lead = await Lead.findOneAndUpdate(
        { pinCode: pinCode },
        { status: "dnc" },
        {
          new: true,
          upsert: true, // Make this update into an upsert
        }
      );
      res.json(lead);
    } else if (name != null && address != null) {
      const leadName = new RegExp(`${name}`, "gi");
      const leadAddress = new RegExp(`${address}`, "gi");
      const lead = await Lead.findOneAndUpdate(
        {
          $and: [{ fullName: leadName }, { address: leadAddress }],
        },
        { status: "dnc" },
        {
          new: true,
          upsert: true, // Make this update into an upsert
        }
      );
      res.json(lead);
    } else if (emailAddress != null) {
      const leadEmail = new RegExp(`${emailAddress}`, "gi");
      const lead = await Lead.findOneAndUpdate(
        { emailAddress: leadEmail },
        { status: "dnc" },
        {
          new: true,
          upsert: true, // Make this update into an upsert
        }
      );
      console.log(lead);
      res.json(lead);
    }
  } catch (err) {
    console.error(er.message);
    res.status(500).send("Server Error");
  }
});

router.put("/", auth, async (req, res) => {
  const list = req.body.list;

  var vals = [];
  for (var item of list) {
    vals.push(item._id);
  }

  const objectIdArray = vals.map((s) => mongoose.Types.ObjectId(s));

  await Lead.updateMany(
    {
      "_id": { "$in": objectIdArray },
    },
    { "$set": { "status": "optedin" } },
    (err, doc) => {
      if (err) console.log(err);
      console.log(doc);
    }
  );
});

router.get(`/:id/pinCode`, async (req, res) => {
  const string = req.query.q;

  const leadData = string.split(",");

  const mongooseToObj = (doc) => {
    if (doc == null) {
      return null;
    }
    return doc.toObject();
  };

  const lead = mongooseToObj(
    await Lead.findOne({
      "pinCode": leadData[0],
    })
  );

  console.log(lead);

  const doc = await PDF.findOne({ "title": "TaxLien" });

  fs.writeFile("./pdfs/template.hbs", doc.html, (err) => {
    if (err) throw err;
    console.log("thefilehasbeensaved");
  });

  if (lead != null) {
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

    transporter.use("compile", hbs(options));

    const mailer = {
      title: "Your Tax Lien",
      from: "Tax Group",
      to: leadData[1],
      subject: "Your Tax Lien",
      template: "template",
      context: {
        lead: lead,
      },
    };
    transporter.sendMail(mailer);
  }
});

//Get Leads For Email List

router.get("/status", auth, async (req, res) => {
  console.log(req.query);

  const statusa = Object.values(req.query.q)

    .toString()
    .replace(",", "")
    .replace(",", "")
    .replace(",", "")
    .replace(",", "")
    .replace(",", "")
    .replace(",", "")
    .replace(",", "")
    .replace(",", "");

  console.log(statusa);

  const leads = await Lead.find({ "status": statusa });

  console.log(leads);
  res.json(leads);
});

router.get("/search", auth, async (req, res) => {
  try {
    const regex = new RegExp(`${req.query.q}`, "gi");
    leads = await Lead.find({
      $or: [
        { fullName: regex },
        { deliveryAddress: regex },
        { pinCode: regex },
        { phone: regex },
        { emailAddress: regex },
      ],
    });
    res.json(leads);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//Update contact status

module.exports = router;
