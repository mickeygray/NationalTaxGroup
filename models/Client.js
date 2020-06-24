const mongoose = require("mongoose");

const ClientSchema = mongoose.Schema({
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
  gross: { type: Number },
  initial: { type: Number },
  total: { type: Number },
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
        noteText: { type: String },
        notePostedBy: { type: String },
        noteDate: { type: Date, default: Date.now() },
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

  closerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: {
    type: String,
    default: "client",
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
});

module.exports = mongoose.model("client", ClientSchema);
