const mongoose = require("mongoose");

const ProspectSchema = mongoose.Schema({
  fullName: {
    type: String,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  emailAddress: {
    type: String,
  },
  pinCode: {
    type: String,
  },
  filingStatus: {
    type: String,
  },
  compliant: {
    type: String,
  },
  cpa: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  zip4: {
    type: String,
  },
  plaintiff: {
    type: String,
  },
  amount: {
    type: String,
  },
  lienid: {
    type: String,
  },
  ssn: {
    type: String,
  },
  notes: {
    type: [
      {
        id: { type: String },
        text: { type: String },
        postedBy: { type: String },
        postedDate: { type: Date },
        updatedBy: { type: String },
        updatedDate: { type: Date },
      },
    ],
  },
  tasks: {
    type: [],
  },
  createdate: {
    type: Date,
    default: Date.now(),
  },
  claimedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  caseWorkers: {
    originator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    loanProcessors: [
      { _id: { type: mongoose.Schema.Types.ObjectId, ref: "User" } },
    ],
    documentProcessors: [
      { _id: { type: mongoose.Schema.Types.ObjectId, ref: "User" } },
    ],
    upsells: [{ _id: { type: mongoose.Schema.Types.ObjectId, ref: "User" } }],
    primaryReso: [
      { _id: { type: mongoose.Schema.Types.ObjectId, ref: "User" } },
    ],
    secondaryReso: [
      { _id: { type: mongoose.Schema.Types.ObjectId, ref: "User" } },
    ],
  },
  resoStatus: {
    federalFile: { type: String },
    stateFile: { type: String },
    hardship: { type: String },
    payment: { type: String },
    offer: { type: String },
    corp: { type: String },
  },
  paymentId: {
    type: String,
  },
  paymentStatus: {
    quote: { type: Number },
    gross: { type: Number },
    initial: { type: Number },
    total: { type: Number },
    loans: { type: String },
  },
  status: {
    type: String,
    default: "prospect",
  },
  name2: {
    type: String,
    default: "",
  },
  address2: {
    type: String,
    default: "",
  },
  city2: {
    type: String,
    default: "",
  },
  state2: {
    type: String,
    default: "",
  },
  zip2: {
    type: String,
    default: "",
  },
  quote: {
    type: Number,
  },
  employerTime: {
    type: String,
    default: "",
  },
  ssn2: {
    type: String,
    default: "",
  },
  lexId2: {
    type: String,
    default: "",
  },
  dob: {
    type: String,
  },
  dob2: {
    type: String,
  },
  relation: {
    type: String,
    default: "",
  },
  phone2: {
    type: String,
    default: "",
  },
  phone3: {
    type: String,
    default: "",
  },
  email2: {
    type: String,
    default: "",
  },
  email3: {
    type: String,
    default: "",
  },
  prac: {
    type: String,
    default: "",
  },
  problem1: {
    type: String,
    default: "",
  },
  problem2: {
    type: String,
    default: "",
  },
  problem3: {
    type: String,
    default: "",
  },
  resSold: {
    type: String,
    default: "",
  },
  resSold2: {
    type: String,
    default: "",
  },
  home: {
    type: String,
    default: "",
  },
  homePay: {
    type: String,
    default: "",
  },
  wages: {
    type: String,
    default: "",
  },
  income1Type: {
    type: String,
    default: "",
  },
  income1Value: {
    type: String,
    default: "",
  },
  income2Type: {
    type: String,
    default: "",
  },
  age: {
    type: Number,
  },
  income2Value: {
    type: String,
    default: "",
  },
  income3Type: {
    type: String,
    default: "",
  },
  income3Value: {
    type: String,
    default: "",
  },
  otherIncomeType: {
    type: String,
    default: "",
  },
  otherIncomeValue: {
    type: String,
    default: "",
  },
  creditScore: {
    type: Number,
  },
  availableCredit: {
    type: String,
    default: "",
  },
  totalCredit: {
    type: String,
    default: "",
  },
  employerName: {
    type: String,
    default: "",
  },
  employerPhone: {
    type: String,
    default: "",
  },
  pdfs: {
    type: Array,
  },
  real: {
    address: { type: String },
    county: { type: String },
    sellerName: { type: String },
    parcelNumber: { type: String },
    loanAmout: { type: String },
  },
  family: { type: Array },
  bankruptcy: {
    type: { type: String },
    caseNumber: { type: String },
    date: { type: String },
    filingType: { type: String },
    court: { type: String },
  },
});

module.exports = mongoose.model("prospect", ProspectSchema);
