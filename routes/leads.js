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

router.put("/:id", auth, async (req, res) => {
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
  let phones = string.match(reg2).filter(distinct);
  let bankruptcy = string.match(
    /(?<=Petitioner Information\s*).*?(?=\s*Meeting Date)/gs
  );
  let real = string.match(/(?<=Deed Record for\s*).*?(?=\s*Loan Type)/gs);

  console.log(real);
  const leadString = liens.shift();
  const leadBody =
    "{" +
    leadString
      .replace(/[\s,]+/g, " ")
      .trim()
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

  const lead = JSON.parse(leadBody);

  const age = string.substring();
  lead.county = lead.deliveryAddress
    .match(/(?<=(\d+)(?!.*\d)\s*).*?(?=\s*COUNTY)/gs)
    .toString();

  lead.phones = phones;
  lead.amount = lead.amount.replace(":", "");
  lead.filingDate = lead.filingDate.replace(": ", "");
  lead.state = lead.state.replace(": ", "");
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

  lead.real = real;

  lead.age = string.match(/(?<=[(]Age:\s*).*?(?=\s*[)])/gs)[0].toString();
  lead.dob = string
    .match(/(?<=[-]XXXX\s*).*?(?=\s*[(]Age:)/gs)[0]
    .toString()
    .trim();

  const regex = new RegExp("/((^[A-Z][,][A-Z]))/", "g");

  lead.family = string
    .match(/(?<=Household Members\s*).*?(?=\s*Other Associates)/gs)
    .filter(function (el) {
      return el != "\r\n\r\nNone Listed";
    })
    .filter(function (el) {
      return el != "\r\nNone Listed";
    })
    .toString()
    .replace("\r\n", "")
    .replace("\r\n +", "")
    .split("+");

  lead.emailAddresses = lead.emailAddresses.split(",").filter(distinct);

  lead.bankruptcy = bankruptcy;
  console.log(lead);
});

router.get("/lexis", auth, async (req, res) => {
  const call = await Call.find().limit(1).sort({ $natural: -1 });
});

router.post("/lexis", auth, async (req, res) => {
  const string = Object.keys(req.body).toString();

  let reg = /LexID\(sm\):([\S]+)/gim; // Get hashtags.

  let matches = (string.match(reg) || []).map((e) => e.replace(reg, "$1"));
  console.log(matches);
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

router.get("/query", auth, async (req, res) => {
  const query = JSON.parse(req.query.q);

  const leads = await Lead.find(query);
  res.json(leads);

  if (req.query.q.status === "new")
    update = await Lead.updateMany({ status: "new" }, { status: "contacted" });
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
