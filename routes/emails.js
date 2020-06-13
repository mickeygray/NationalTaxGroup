const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Email = require("../models/Email");
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

  const newEmail = new Email({
    title,
    reactString,
    html,
    text,
    subject,
    from,
    key,
  });

  const email = await newEmail.save();

  res.json(email);
});

router.post("/campaigns", async (req, res) => {
  const { title, html, text, subject, from, list, campaignName } = req.body;

  const newCampaign = new Campaign({
    title,
    html,
    text,
    subject,
    from,
    list,
    campaignName,
  });

  const campaign = await newCampaign.save();

  res.json(campaign);
});

//get email by title

router.get("/templates", async (req, res) => {
  try {
    const regex = new RegExp(`${req.query.q}`, "gi");
    const emails = await Email.find({
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

router.put("/campaigns/:id/list", auth, async (req, res) => {
  const toRemove = req.body;

  let campaign = await Campaign.findById(req.params.id);

  const newList = campaign.list.filter(
    (ar) => !toRemove.find((rm) => rm._id === ar._id)
  );

  campaign = await Campaign.findByIdAndUpdate(req.params.id, { list: newList });

  res.json(campaign);
});

router.put("/campaigns/:id", auth, async (req, res) => {
  const { title, html, text, subject, from } = req.body;

  const campaignFields = {};

  if (title) campaignFields.title = title;
  if (html) campaignFields.html = html;
  if (text) campaignFields.text = text;
  if (subject) campaignFields.title = title;
  if (from) campaignFields.title = title;

  const campaign = await Campaign.findByIdAndUpdate(
    req.params.id,
    { $set: campaignFields },
    { new: true }
  );

  res.json(campaign);
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

    await Campaign.findByIdAndRemove(req.params.id);

    res.json({ msg: "Campaign removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/templates/:id", auth, async (req, res) => {
  try {
    let email = await Email.findById(req.params.id);

    if (!email) return res.status(404).json({ msg: "Contact not found" });

    await Email.findByIdAndRemove(req.params.id);

    res.json({ msg: "Campaign removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res) => {
  const { title, html, template, text, subject, from, list } = req.body;
  /*
  fs.writeFile("./views/template.hbs", html, (err) => {
    if (err) throw err;
    console.log("thefilehasbeensaved");
  });

  console.log(list);

  SetInterval.start(
    function () {
      const lead = list[0];

      list.shift();

      if (lead != null) {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "blackballedproductions@gmail.com",
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
          to: lead.email,
          subject: subject,
          template: "template",
          context: {
            lead: lead,
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
  */
});

module.exports = router;
