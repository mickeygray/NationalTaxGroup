const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Call = require("../models/Call.js");
const Prospect = require("../models/Prospect.js");
const Client = require("../models/Client.js");
const axios = require("axios");

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

router.get("/:id", auth, async (req, res) => {
  // console.log(req);
  const prospect = await Prospect.findById(req.params.id);

  res.json(prospect);
});

router.get("/", auth, async (req, res) => {
  console.log(req.query.q);
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

router.get("/clients", auth, async (req, res) => {
  console.log(req.query.q);
  const regex = new RegExp(`${req.query.q}`, "gi");
  const clients = await Client.find({
    $or: [
      { fullName: regex },
      { deliveryAddress: regex },
      { pinCode: regex },
      { ssn: regex },
    ],
  });

  res.json(clients);
});

router.post("/clients", auth, async (req, res) => {
  const {
    quote,
    gross,
    initial,
    total,
    notes,
    fullName,
    deliveryAddress,
    city,
    st,
    zip4,
    plaintiff,
    taxAmount,
    lienid,
    phone,
    email,
    pinCode,
    compliant,
    filingStatus,
    cpa,
    ssn,
    createdate,
    createdBy,
    closerId,
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

  const newClient = new Client({
    quote,
    gross,
    initial,
    total,
    notes,
    fullName,
    deliveryAddress,
    city,
    st,
    zip4,
    plaintiff,
    taxAmount,
    lienid,
    phone,
    email,
    pinCode,
    compliant,
    filingStatus,
    cpa,
    ssn,
    createdate,
    createdBy,
    closerId,
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
  });

  const client = await newClient.save();

  res.json(client);
});

router.post("/", auth, async (req, res) => {
  console.log(req.body);
  const {
    phone,
    fullName,
    deliveryAddress,
    city,
    st,
    zip4,
    plaintiff,
    taxAmount,
    lienid,
    email,
    pinCode,
    compliant,
    filingStatus,
    cpa,
    ssn,
    noteText,
  } = req.body;
  const notes = noteText;
  let createdate;
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

  const createdBy = req.user.id;
  const notePostedBy = req.user.id;

  const newProspect = new Prospect({
    notes,
    fullName,
    deliveryAddress,
    city,
    st,
    zip4,
    plaintiff,
    taxAmount,
    lienid,
    phone,
    email,
    pinCode,
    compliant,
    filingStatus,
    cpa,
    ssn,
    createdate,
    createdBy,
    closerId,
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

  try {
    await prospect.findOneAndUpdate(
      { prospect: prospect, "notes.id": noteId },
      { $pull: { "notes": { "id": noteId } } }
    );

    res.json(lead);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/clients/:id", auth, async (req, res) => {
  const {
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
    let client = await Client.findById(req.params.id);

    if (!client) return res.status(404).json({ msg: "lead not found" });

    if (note) {
      client = await Client.findByIdAndUpdate(
        req.params.id,
        { $push: { notes: note } },
        { "new": true }
      );
    } else {
      prospect = await Client.findByIdAndUpdate(
        req.params.id,
        { $set: leadFields },
        { new: true }
      );
    }
    res.json(client);
    console.log(client);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/clients/:id", auth, async (req, res) => {
  const client = req.params._id;
  const noteId = req.body.id;

  try {
    await client.findOneAndUpdate(
      { _id: client, "notes.id": noteId },
      { $pull: { "notes": { "id": noteId } } }
    );

    res.json(client);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
