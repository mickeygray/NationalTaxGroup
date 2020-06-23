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
  console.log(req.body);

  try {
    const leads = await Lead.insertMany(req.body);
    res.json(leads);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("servererr");
  }
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

router.put("/:id/dnc", auth, async (req, res) => {
  console.log(req.body);

  const { name, address, pinCode, email } = req.body;
  try {
    if (pinCode != null) {
      const lead = await Lead.findOneAndUpdate(
        { rmsid: pinCode },
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

router.get(`/:id/RMSID`, async (req, res) => {
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
      "RMSID": leadData[0],
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
        { RMSID: regex },
        { amount: regex },
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
