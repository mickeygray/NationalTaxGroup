const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");
const auth = require("../middleware/auth");
const mongoose = require("mongoose");

//Add Leads to Mongo

router.post("/", async (req, res) => {
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

  const { name, address, lexid, email } = req.body;
  try {
    if (lexid != null) {
      const lead = await Lead.findOneAndUpdate(
        { lexid: lexid },
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
    } else if (email != null) {
      const leadEmail = new RegExp(`${email}`, "gi");
      const lead = await Lead.findOneAndUpdate(
        { email: email },
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

//Get Leads For Email List

router.get("/", auth, async (req, res) => {
  const query = JSON.parse(req.query.q);

  const leads = await Lead.find(query);
  res.json(leads);

  if ((query.status = "new")) {
    const update = await Lead.updateMany(
      { status: "new" },
      { status: "contacted" }
    );
    res.json(update);
  }

  try {
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//Update contact status

module.exports = router;
