const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");
const auth = require("../middleware/auth");
const mongoose = require("mongoose");

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

router.delete("/", auth, async (req, res) => {
  Lead.deleteMany({ dnc: true })
    .then(function () {
      console.log("Data deleted"); // Success
    })
    .catch(function (error) {
      console.log(error); // Failure
    });
});

router.put("/:id/dnc", auth, async (req, res) => {
  console.log(req.body);

  const { name, address, lexid, email } = req.body;
  try {
    if (lexid != null) {
      const lead = await Lead.findOneAndUpdate(
        { lexid: lexid },
        { dnc: true },
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
        { dnc: true },
        {
          new: true,
          upsert: true, // Make this update into an upsert
        }
      );
      res.json(lead);
    } else if (email != null) {
      const leadEmail = new RegExp(`${email}`, "gi");
      const lead = await Lead.findOneAndUpdate(
        { email: email },
        { dnc: true },
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
    { "$set": { "optedin": true } },
    (err, doc) => {
      if (err) console.log(err);
      console.log(doc);
    }
  );
});

//Get Leads For Email List

router.get("/", auth, async (req, res) => {
  const listConditions = JSON.parse(req.query.q);

  console.log(listConditions);
  let requestString = {};

  try {
    //new leads
    if (listConditions.isContacted === false) {
      const leads = await Lead.find({ contacted: false });

      res.json(leads);

      const list = await Lead.updateMany(
        { contacted: false },
        { contacted: true }
      );
    } else if (listConditions.isDNC === true) {
      const leads = await Lead.find({ dnc: true });
      res.json(leads);
    }

    //all leads
    else if (
      listConditions.isOptedIn === true &&
      listConditions.isClient === false
    ) {
      const leads = await Lead.find({
        converted: false,
      });
      res.json(leads);

      //all federal
    } else if (listConditions.isFederal === true) {
      const leads = await Lead.find({ type: "Federal Tax Lien" });
      res.json(leads);

      //all state
    } else if (listConditions.isState === true) {
      const leads = await Lead.find({
        type: "State Tax Lien",
      });

      res.json(leads);

      //all federal above 25000
    } else if (listConditions.isAbove25000 === true) {
      const leads = await Lead.find({
        amount: { $gte: 25000 },
      });
      res.json(leads);

      //all federal below 25000
    } else if (listConditions.isBelow25000 === true) {
      const leads = await Lead.find({
        amount: { $lte: 25000 },
      });
      res.json(leads);
    } else if (listConditions.isClient === true) {
      const leads = await Lead.find({
        converted: true,
      });
      res.json(leads);

      //all upsellable clients
    } else if (listConditions.isUpsellable === true) {
      const leads = await Lead.find({
        upsellable: true,
      });
      res.json(leads);

      //been mailed and interacted all leads federal
    } else if (listConditions.isHighDollar === true) {
      const leads = await Lead.find({
        highdollar: true,
      });
      res.json(leads);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//Update contact status

module.exports = router;
