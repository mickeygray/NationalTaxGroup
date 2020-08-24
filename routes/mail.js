const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const GridFsStorage = require("multer-gridfs-storage");
const mongoose = require("mongoose");
const crypto = require("crypto");
const config = require("config");
const path = require("path");
const mongodb = require("mongodb");
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const db = config.get("mongoURI");
const Grid = require("gridfs-stream");
const multer = require("multer");
const Mail = require("../models/Mail");
const Schedule = require("../models/Schedule");
const moment = require("moment");

const storage = new GridFsStorage({
  url: db,
  options: { useUnifiedTopology: true },
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = req.body.title;
        const fileInfo = {
          filename: filename,
          bucketName: "fs",
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });
router.post("/", auth, upload.single("fs"), async (req, res) => {
  console.log(req.body);
  const {
    title,
    mailHouse,
    vendor,
    type,
    colorPaper,
    colorInk,
    key,
    image,
    taxChart,
    lienType,
    lienAmount,
    zipCodeSuppress,
    zipCode,
    postageCeiling,
    unitCost,
    tracking,
    startDate,
  } = req.body;

  const { id } = req.file;

  console.log(req.file);
  const fileid = id;

  const newMail = new Mail({
    title,
    mailHouse,
    vendor,
    type,
    colorPaper,
    colorInk,
    image,
    taxChart,
    key,
    lienType,
    fileid,
    lienAmount,
    zipCodeSuppress,
    zipCode,
    postageCeiling,
    unitCost,
    tracking,
    startDate,
  });

  const mail = await newMail.save();

  res.json(mail);
});

router.post("/calendar", auth, async (req, res) => {});

router.get("/", auth, async (req, res) => {
  const mail = await Mail.find();

  res.json(mail);
});

router.get("/mailItem", auth, async (req, res) => {
  const conn = mongoose.connection;
  const gfs = Grid(conn.db, mongoose.mongo);

  gfs.files.find({ filename: req.query.q }).toArray(function (err, files) {
    if (err) {
      res.json(err);
    }

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
router.get("/calendar", auth, async (req, res) => {
  const mail = await Mail.find();

  res.json(mail);
});

router.post("/schedule", auth, async (req, res) => {
  let dropDay;
  if (req.body.unit.unitType === "weeks") {
    dropDay = new Date(moment().subtract(req.body.unit.amount, "weeks"));
  } else {
    dropDay = moment().subtract(req.body.unit.amount, "days");
  }
  const now = moment(new Date()); //todays date
  const duration = moment.duration(now.diff(dropDay));
  const lookBack = duration.asDays();
  const scheduleDate = req.body.unit.amount + " " + req.body.unit.unitType;

  req.body.entry.forEach(function (element) {
    element.lookBack = lookBack;
    element.scheduleDate = scheduleDate;
  });
});

module.exports = router;
