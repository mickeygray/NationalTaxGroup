const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const GridFsStorage = require("multer-gridfs-storage");
const mongoose = require("mongoose");
const crypto = require("crypto");
const config = require("config");
const path = require("path");
const mongodb = require("mongodb");
const BSON = require("bson");
const keya = require("../config/key.json");
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const db = config.get("mongoURI");
const Grid = require("gridfs-stream");
const streamToBlob = require("stream-to-blob");
const Binary = require("mongodb").Binary;
const multer = require("multer");
const JSZip = require("jszip");
const imaps = require("imap-simple");
const Mail = require("../models/Mail");
const Lead = require("../models/Lead");
const Schedule = require("../models/Schedule");
const moment = require("moment");
const mergeWith = require("lodash.mergewith");
const { Parser } = require("json2csv");

const { Duplex } = require("stream");
const _ = require("lodash");

const zipSuppression = require("../config/zipSuppression.json");
const { isArrayLikeObject } = require("lodash");
const zip = require("express-zip");
const nodemailer = require("nodemailer");
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

const storage2 = new GridFsStorage({
  url: db,
  options: { useUnifiedTopology: true },
  file: (req, attachment) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }

        console.log(attachment);
        const filename = attachment.filename;
        const fileInfo = {
          filename: filename,
          bucketName: "fs",
        };
        resolve(fileInfo);

        console.log(fileInfo);
      });
    });
  },
});
const upload2 = multer({ storage2 });

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
    theme,
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
    theme,
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

router.post("/delivery", auth, async (req, res) => {
  const schedule = await Schedule.find();
  var scheduleObj = schedule.reduce(function (r, o) {
    var k = parseInt(o.lookBack);
    if (r[k] || (r[k] = [])) r[k].push(o);
    return r;
  }, {});

  var filterDates = Object.keys(scheduleObj).map((v) =>
    Intl.DateTimeFormat(
      "fr-CA",
      {
        timeZone: "America/Los_Angeles",
      },
      {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }
    ).format(new Date(moment().subtract(parseInt(v), "day")))
  );

  let leads = await Lead.find({
    "loadDate": { "$in": filterDates },
  });

  const listObj = leads.reduce(function (r, o) {
    var k = o.loadDate;
    key = Intl.DateTimeFormat(
      "fr-CA",
      {
        timeZone: "America/Los_Angeles",
      },
      {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }
    ).format(moment(new Date(k)));
    if (r[key] || (r[key] = [key])) r[key].push(o);
    return r;
  }, {});

  var scheduleObj2 = schedule.reduce(function (r, o) {
    var k = o.lookBack;
    (tracking = o.tracking),
      (lienAmount = o.lienAmount),
      (zipCodeSuppress = o.zipCodeSuppress),
      (zipCode = o.zipCode),
      (lienType = o.lienType),
      (vendor = o.vendor);
    postageCeiling = o.postageCeiling;
    unitCost = o.unitCost;
    title = o.title;
    mailHouse = o.mailHouse;
    key = Intl.DateTimeFormat(
      "fr-CA",
      {
        timeZone: "America/Los_Angeles",
      },
      {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }
    ).format(new Date(moment().subtract(parseInt(k), "day")));
    if (r[key] || (r[key] = []))
      r[key].push({
        [tracking]: {
          tracking,
          lienAmount,
          title,
          zipCodeSuppress,
          postageCeiling,
          unitCost,
          zipCode,
          lienType,
          vendor,
          tracking,
          mailHouse,
        },
      });
    return r;
  }, {});

  function customizer(objValue, srcValue) {
    if (_.isArray(srcValue)) {
      return srcValue.concat({ list: objValue });
    }
  }

  let mailSchedule = mergeWith(listObj, scheduleObj2, customizer);
  let drop = [];
  mailSchedule = Object.entries(mailSchedule).forEach((entry) => {
    const master = entry.pop();

    console.log(entry);

    console.log(master);
    const list = Object.values(master.pop())
      .flat()
      .filter((e) => typeof e !== "string");

    function removeValue(objectArray) {
      objectArray.forEach((obj) => {
        Object.entries(obj).forEach(([key, val]) => {
          if (key === "_doc") {
            val.amount = parseInt(val.amount.replace("$", "").replace(",", ""));
          }
        });
      });
      return objectArray;
    }

    console.log(list);

    let mailList = removeValue(list);

    console.log(mailList.length);

    let tollFrees = [];
    master.forEach((tracker) => {
      const obj = Object.assign(
        {},
        ...(function _flatten(o) {
          return [].concat(
            ...Object.keys(o).map((k) =>
              typeof o[k] === "object" ? _flatten(o[k]) : { [k]: o[k] }
            )
          );
        })(tracker)
      );
      tollFrees.push(obj);
    });

    tollFrees = tollFrees.map((obj) => ({
      ...obj,
      mailList: mailList,
      date: entry.toString(),
    }));

    //console.log(tollFrees);

    let mailOrder = [];
    tollFrees.forEach((tollFree) => {
      let toll = tollFree;
      mailOrder.push(toll);
    });
    let final = [];
    mailOrder.forEach((tollFree) => {
      //console.log(Object.entries(tollFree));
      const zipCodes = Object.values(tollFree)[0].split(",");

      const {
        lienType,
        tracking,
        lienAmount,
        vendor,
        postageCeiling,
        unitCost,
        mailHouse,
        date,
        title,
        zipCodeSuppress,
      } = tollFree;

      switch (true) {
        case lienAmount == "15000":
          mailList = mailList.filter((e) => e.amount <= 15000);
          break;
        case lienAmount == "25000":
          mailList = mailList.filter(
            (e) => e.amount >= 15000 && e.amount <= 25000
          );
          break;
        case lienAmount == "50000":
          mailList = mailList.filter(
            (e) => e.amount >= 25000 && e.amount <= 50000
          );
          break;
        case lienAmount == "100000":
          mailList = mailList.filter(
            (e) => e.amount >= 50000 && e.amount <= 100000
          );
          break;
        case lienAmount == "10000000":
          mailList = mailList.filter((e) => e.amount > 100000);
          break;
        case vendor == "ftls":
          mailList = mailList.filter((e) => e.pinCode.length === 7);
          break;
        case vendor == "risk":
          mailList = mailList.filter((e) => e.pinCode.length === 10);
          break;
        case vendor == "advance":
          mailList = mailList.filter((e) => e.pinCode.length === 12);
          break;
        case vendor == "atype":
          mailList = mailList.filter((e) => e.pinCode.length === 15);
          break;
        case lienType == "state":
          mailList = mailList.filter((e) => e.fileType == "State Tax Lien");
          break;
        case lienType == "federal":
          mailList = mailList.filter((e) => e.fileType == "Federal Tax Lien");
          break;
        case zipCodeSuppress == "suppressSelect":
          let zips = [];

          zipCodes.forEach((zone) => {
            const code = zipSuppression
              .filter((e) => e.class === zone)
              .map((z) => z.zip4);

            zips.push(code);
          });

          zips = zips.flat();

          mailList = mailList.filter((e) =>
            zips.includes(e.zip4.substring(0, 5))
          );

          break;
        case zipCodeSuppress == "keepSelect":
          zips = [];

          zipCodes.forEach((zone) => {
            const code = zipSuppression
              .filter((e) => e.class === zone)
              .map((z) => z.zip4);

            zips.push(code);
          });

          zips = zips.flat();

          mailList = mailList.filter(
            (e) => !zips.includes(e.zip4.substring(0, 5))
          );
          break;
        default:
          return mailList;
      }

      let costs = 0;
      let combinedCost = 0;

      if (mailList.length > 0) {
        costs =
          (parseFloat(postageCeiling) + parseFloat(unitCost)) *
          mailList.length.toFixed(2);
        combinedCost = parseFloat(postageCeiling) + parseFloat(unitCost);
      }

      const order = {
        date,
        title,
        tracking,
        mailList,
        mailHouse,
        combinedCost,
        costs,
      };

      final.push(order);
    });

    final = final.flat();

    drop.push(final);
  });

  drop = drop.flat();

  let finalDrop = drop.filter((d) => d.mailList.length > 0);

  let advJobs = [];
  let cspJobs = [];
  let wbJobs = [];

  finalDrop.forEach((drop) => {
    const json2csvParser = new Parser();

    let result = [];

    drop.mailList.map((list, i) =>
      result[i]
        ? (result[i].fullName = list.fullName)(
            (result[i].First_Name = list.firstName)
          )((result[i].Last_Name = list.lastName))(
            (result[i].Delivery_Address = list.deliveryAddress)
          )((result[i].City = list.city))((result[i].State = list.state))(
            (result[i].Zip_4 = list.zip4)
          )((result[i].County = list.county))(
            (result[i].File_Type = list.fileType)
          )((result[i].Amount = list.amount))(
            (result[i].pinCode = list.pinCode)
          )(
            (result[i].Five_Amount = (parseFloat(list.amount) * 0.05).toFixed(
              2
            ))
          )(
            (result[i].Nine_Amount = (parseFloat(list.amount) * 0.95).toFixed(
              2
            ))
          )
        : (result[i] = {
            Full_Name: list.fullName,
            First_Name: list.firstName,
            Last_Name: list.lastName,
            Delivery_Address: list.deliveryAddress,
            City: list.city,
            State: list.state,
            Zip_4: list.zip4,
            County: list.county,
            File_Type: list.fileType,
            Amount: list.amount,
            Pin_Code: list.pinCode,
            Five_Amount: (parseFloat(list.amount) * 0.05).toFixed(2),
            Nine_Amount: (parseFloat(list.amount) * 0.95).toFixed(2),
          })
    );

    const conn = mongoose.connection;
    const gfs = Grid(conn.db, mongoose.mongo);

    gfs.files.find({ filename: drop.title }).toArray(function (err, files) {
      var readableStream = gfs.createReadStream({ filename: drop.title });
      let bufferArray = [];
      readableStream.on("data", function (chunk) {
        bufferArray.push(chunk);
      });

      let buffer = [];
      let att = [];
      readableStream.on("end", function () {
        buffer = Buffer.concat(bufferArray);

        const attachment1 = {
          filename: `${drop.title}.pdf`,
          content: new Buffer(buffer, "application/pdf"),
        };

        const csv = json2csvParser.parse(result);

        const tracker = drop.tracking;
        const dt = drop.date;

        const attachment2 = {
          filename: `${tracker}__ ${dt}.csv`,
          content: csv,
        };

        if (drop.vendor === "adv") {
          advJobs.push(mailerObj);
        } else if (drop.vendor === "wb") {
          wbJobs.push(mailerObj);
        } else if (drop.vendor === "csp") {
          cspJobs.push(mailerObj);
        }

        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            type: "OAuth2",
            user: "lienunit@nattaxgroup.com",
            serviceClient: keya.client_id,
            privateKey: keya.private_key,
          },
        });

        const mailer = {
          title: "Daily Mail Drop",
          from: "NTE",
          to: "mickeygray85@hotmail.com",
          subject: ` ${tracker} Daily Mail Drop `,
          attachments: [attachment1, attachment2],
          text: "Eat my force swine",
        };

        transporter.sendMail(mailer);
      });
    });
  });

  let leadsUpdate = [];

  finalDrop.forEach((drop) => {
    const costItem = {
      mailer: drop.title,
      unitCost: drop.combinedCost,
      date: Intl.DateTimeFormat(
        "fr-CA",
        {
          timeZone: "America/Los_Angeles",
        },
        {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        }
      ).format(new Date(Date.now())),
    };

    drop.mailList.forEach((record) => {
      record.costs.push(costItem);
    });

    drop.mailList.forEach((record) => {
      leadsUpdate.push(record);
    });
  });

  leadsUpdate.forEach(async (record) => {
    lead = await Lead.findByIdAndUpdate(record._id, {
      "$push": { "costs": record.costs },
    });
  });

  let emptyDrops = drop
    .filter((d) => d.mailList.length === 0)
    .map((e) => " " + e.date + ":" + e.title);

  const transporter2 = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: "lienunit@nattaxgroup.com",
      serviceClient: keya.client_id,
      privateKey: keya.private_key,
    },
  });

  const mailer2 = {
    title: "Empty Drop Report",
    from: "NTE",
    to: "mickeygray85@hotmail.com",
    subject: `Empty Drop Report`,
    text: `The Following Campaigns Returned Empty Lists, Please Make Corrections If Necessary.  ${emptyDrops}`,
  };

  transporter2.sendMail(mailer2);
});

router.get("/", auth, async (req, res) => {
  const mail = await Mail.find();

  res.json(mail);
});

router.get("/invoices", auth, async (req, res) => {
  var config = {
    imap: {
      user: "blackballedproductions@gmail.com",
      password: "Pay@ttention35!",
      host: "imap.gmail.com",
      servername: "imap.gmail.com",
      port: 993,
      tls: true,
      tlsOptions: { rejectUnauthorized: false },
      authTimeout: 3000,
    },
  };

  imaps.connect(config).then(function (connection) {
    connection
      .openBox("INBOX")
      .then(function () {
        // Fetch emails from the last 24h
        var delay = 24 * 3600 * 1000;
        var yesterday = new Date();
        yesterday.setTime(Date.now() - delay);
        yesterday = yesterday.toISOString();
        var searchCriteria = ["UNSEEN", ["SINCE", yesterday]];
        var fetchOptions = {
          bodies: ["HEADER.FIELDS (FROM TO SUBJECT DATE)"],
          struct: true,
        };

        // retrieve only the headers of the messages
        return connection.search(searchCriteria, fetchOptions);
      })
      .then(function (messages) {
        var attachments = [];

        messages.forEach(function (message) {
          var parts = imaps.getParts(message.attributes.struct);
          attachments = attachments.concat(
            parts
              .filter(function (part) {
                return (
                  part.disposition &&
                  part.disposition.type.toUpperCase() === "ATTACHMENT"
                );
              })
              .map(function (part) {
                // retrieve the attachments only of the messages with attachments
                return connection
                  .getPartData(message, part)
                  .then(function (partData) {
                    return {
                      filename: part.disposition.params.filename,
                      data: partData,
                    };
                  });
              })
          );
        });

        return Promise.all(attachments);
      })
      .then(function (attachments) {
        attachments.forEach((attachment) => {
          const conn = mongoose.connection;
          const gfs = Grid(conn.db, mongoose.mongo);

          var insert_data = {};
          insert_data.file_data = Binary(attachment.data);
          insert_data.filename = attachment.filename;
          insert_data.date = Intl.DateTimeFormat(
            "fr-CA",
            {
              timeZone: "America/Los_Angeles",
            },
            {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            }
          ).format(new Date(Date.now()));

          console.log(insert_data);
          var collection = gfs.collection("fs");
          collection.insertOne(insert_data);
        });
      });
  });
});

router.get("/invoices/new", auth, async (req, res) => {
  const conn = mongoose.connection;
  const gfs = Grid(conn.db, mongoose.mongo);

  const period = JSON.parse(req.query.q);

  const { periodStart, periodEnd } = period;

  gfs.files
    .find({
      "date": { $gte: periodStart, $lte: periodEnd },
    })
    .toArray(function (err, files) {
      if (err) {
        res.json(err);
      }

      console.log(files);
      const bufs = [];
      files.forEach((file) => {
        bufs.push({ filename: file.filename, path: BSON.serialize(file) });
      });

      var zip = new JSZip();
      var invoices = zip.folder("invoices");
      bufs.forEach((buf) => {
        invoices.file(`${buf.filename}`, buf.path);
      });

      const zips = [];
      zip.generateAsync({ type: "nodebuffer" }).then(function (data) {
        res.type("zip");
        res.send(new Buffer(data, "binary"));
      });
    });
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
router.get("/schedule", auth, async (req, res) => {
  const schedule = await Schedule.find();
  console.log(schedule.length);
  res.json(schedule);
});

router.post("/schedule", auth, async (req, res) => {
  console.log(req.body.entry.length, "1");

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

  let schedules = [];

  req.body.entry.forEach(function (element) {
    element.lookBack = lookBack;
    element.scheduleDate = scheduleDate;
    schedules.push(element);
  });
  console.log(req.body.entry.length, "1");

  console.log(schedules.length, "1");
  const schedule = await Schedule.insertMany(schedules);

  res.json(schedule);

  console.log(schedule.length);
});

router.put("/costs", auth, async (req, res) => {
  console.log(req.body);

  const payobj = { total: req.body.total, date: new Date(Date.now()) };

  const mailer = await Mail.findOneAndUpdate(
    { "title": req.body.mailer },
    {
      "$push": {
        "costs": payobj,
      },
    }
  );

  console.log(mailer);
  res.json(mailer);
});

router.get("/costs/today", auth, async (req, res) => {
  const today = moment().startOf("day");
  const mailers = await Mail.find();

  let costs = mailers.map((mailer) => {
    mailer.costs, mailer.title;
  });

  console.log(costs);

  costs = costs.filter(
    (cost) =>
      new Date(cost.costs.date) >= today.toDate() &&
      new Date(cost.costs.date) <= moment(today).endOf("day").toDate()
  );

  console.log(costs);
  res.json(costs);
});

router.get("/costs/period", auth, async (req, res) => {});

module.exports = router;
