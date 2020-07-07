const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Call = require("../models/Call.js");
const Prospect = require("../models/Prospect.js");
const CaseWorker = require("../models/CaseWorker");
const PaymentMethod = require("../models/PaymentMethod");
const axios = require("axios");
const uuidv4 = require("uuid/v4");

router.get("/status", auth, async (req, res) => {
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

  const prospects = await Prospect.find({ "status": statusa });

  console.log(prospects);
  res.json(prospects);

  //const prospects = await Prospect.find(query);
  //res.json(prospects);
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

router.get("/payments/search/", auth, async (req, res) => {
  console.log(req.query.q);

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
router.get("/:id", auth, async (req, res) => {
  // console.log(req);
  const prospect = await Prospect.findById(req.params.id);

  res.json(prospect);
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
  console.log(req.body);
  const {
    phone,
    fullName,
    deliveryAddress,
    city,
    state,
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
  } = req.body;
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
  const newProspect = new Prospect({
    fullName,
    deliveryAddress,
    city,
    state,
    zip4,
    plaintiff,
    amount,
    lienid,
    phone,
    emailAddress,
    pinCode,
    compliant,
    filingStatus,
    cpa,
    ssn,
  });

  const prospect = await newProspect.save();

  res.json(prospect);
});

router.put("/:id", auth, async (req, res) => {
  const {
    quote,
    note,
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
  const notes = [];
  const leadFields = {};
  if (notes) leadFields.notes = [notes];
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
    let prospect = await Prospect.findById(req.params.id);

    if (!prospect) return res.status(404).json({ msg: "lead not found" });

    if (note) {
      prospect = await Prospect.findByIdAndUpdate(
        req.params.id,
        { $push: { notes: note } },
        { "new": true }
      );
    } else {
      prospect = await Prospect.findByIdAndUpdate(
        req.params.id,
        { $set: leadFields },
        { new: true }
      );
    }
    res.json(prospect);
    console.log(prospect);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", auth, async (req, res) => {
  const prospect = req.params._id;
  const noteId = req.body.id;
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
        "type": req.body.type,
        "ccName": req.body.ccName,
        "ccType": req.body.ccType,
        "ccNo": req.body.ccNo,
        "ccExp": req.body.ccExp,
        "ccZip": req.body.ccZip,
        "ccSec": req.body.ccSec,
        "ccPin": req.body.ccPin,
        "accBank": req.body.accBank,
        "accType": req.body.accType,
        "accRouting": req.body.accRouting,
        "accNo": req.body.accNo,
        "contact": req.body.contact,
      },
    },
  });

  res.json(prospect);
  console.log(prospect);
});

router.put("/:_id/paymentSchedule", auth, async (req, res) => {
  console.log(req.body);

  const prospect = await Prospect.findByIdAndUpdate(req.params._id, {
    "$push": { "paymentSchedule": req.body },
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
  console.log(prospect);
});

router.put("/:id/resoStatus", auth, async (req, res) => {
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
});

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
  console.log(req.query.q);
  try {
    const prospect = await Prospect.findByIdAndUpdate(req.params._id, {
      $pull: { "paymentSchedule": { "_id": req.query.q } },
    });

    res.json(prospect);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
