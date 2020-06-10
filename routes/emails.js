const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Emails = require("../models/Emails");
const hbs = require("nodemailer-express-handlebars");
const Campaign = require("../models/Campaign");
const auth = require("../middleware/auth");
const fs = require("fs");
const path = require("path");
const exphbs = require("express-handlebars");
const SetInterval = require("set-interval");

// @route    POST api/emails
// @desc     Register user
// @access   Public

//create new email
router.post("/templates", async (req, res) => {
  const { title, reactString, html, text, subject, from, key } = req.body;

  const pug = htmlPugConverter(html);

  console.log(pug);

  const newEmail = new Emails({
    title,
    reactString,
    html,
    pug,
    text,
    subject,
    from,
    key,
  });

  const email = await newEmail.save();

  res.json(email);
});

router.post("/campaigns", async (req, res) => {
  const {
    title,
    html,
    text,
    subject,
    from,
    bcc,
    vars,
    campaignName,
  } = req.body;

  const newCampaign = new Campaign({
    title,
    html,
    text,
    subject,
    from,
    bcc,
    vars,
    campaignName,
  });

  const campaign = await newCampaign.save();

  res.json(campaign);
});

//get email by title

router.get("/templates", async (req, res) => {
  try {
    const regex = new RegExp(`${req.query.q}`, "gi");
    const emails = await Emails.find({
      $or: [
        { title: regex },
        { subject: regex },
        { from: regex },
        { campaignName: regex },
      ],
    });
    res.json(emails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/campaigns/:id", auth, async (req, res) => {
  const { html, title, text, subject, from, bcc, vars } = req.body;
  //  Build contact object
  const campaignFields = {};
  if (title) campaignFields.title = title;
  if (html) campaignFields.html = html;
  if (text) campaignFields.phone = text;
  if (subject) campaignFields.subject = subject;
  if (from) campaignFields.from = from;
  if (bcc) campaignFields.bcc = bcc;
  if (vars) campaignFields.vars = vars;
  try {
    let campaign = await Campaign.findById(req.params.id);

    if (!campaign) return res.status(404).json({ msg: "Campaign not found" });

    // Make sure user owns contact

    campaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      { $set: campaignFields },
      { new: true }
    );

    res.json(campaign);
    res.send(console.log("NIGGERS"));
  } catch (err) {
    console.error(er.message);
    res.status(500).send("Server Error");
  }
});

router.get("/campaigns", async (req, res) => {
  try {
    const regex = new RegExp(`${req.query.q}`, "gi");
    const campaigns = await Campaign.find({
      $or: [
        { title: regex },
        { subject: regex },
        { from: regex },
        { campaignName: regex },
      ],
    });
    res.json(campaigns);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/campaigns/:id", auth, async (req, res) => {
  try {
    let campaign = await Campaign.findById(req.params.id);

    if (!campaign) return res.status(404).json({ msg: "Contact not found" });

    // Make sure user owns contact

    await Campaign.findByIdAndRemove(req.params.id);

    res.json({ msg: "Campaign removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res) => {
  const { title, html, template, text, subject, from, bcc, vars } = req.body;

  console.log(vars);

  SetInterval.start(
    function () {
      const test = vars[0];

      vars.shift();

      if (test != null) {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "bs@gmail.com",
            pass: "",
          },
        });

        const options = {
          viewEngine: {
            extName: ".hbs",
            partialsDir: path.join(__dirname, "views"),
            layoutsDir: path.join(__dirname, "views"),
            defaultLayout: false,
          },
          viewPath: "views",
          extName: ".hbs",
        };

        transporter.use("compile", hbs(options));

        const mailer = {
          from: "blackballedproductions@gmail.com",
          to: test.email,
          subject: "Liens",
          template: "LienFiled",
          context: {
            test: test,
          },
        };
        transporter.sendMail(mailer);
      } else {
        SetInterval.clear("cleared");
      }
    },
    1000,
    "cleared"
  );
});

module.exports = router;
