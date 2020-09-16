const mongoose = require("mongoose");
const CaseWorker = require("./CaseWorker");
const PaymentMethod = require("./PaymentMethod");
const File = require("./File");

const ProspectSchema = mongoose.Schema({
  status: {
    type: String,
  },
  fullName: {
    type: String,
  },
  deliveryAddress: {
    type: String,
  },
  phone: {
    type: String,
  },
  phones: [String],
  emailAddresses: [String],
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
  callids: [String],
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
  createDate: {
    type: Date,
    default: Date.now(),
  },
  status: { type: String, default: "prospect" },
  caseWorkers: {
    originators: [CaseWorker.schema],
    loanProcessors: [CaseWorker.schema],
    documentProcessors: [CaseWorker.schema],
    upsells: [CaseWorker.schema],
    federalReso: [CaseWorker.schema],
    taxPreparers: [CaseWorker.schema],
    stateReso: [CaseWorker.schema],
  },
  emailAddresses: [String],
  resoStatus: {
    representation: [
      {
        document: String,
        name: String,
        postedDate: Date,
        id: String,
        updatedDate: Date,
        endpoint: String,
        assigned: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      },
    ],
    federalFile: [
      {
        document: String,
        endpoint: String,
        name: String,
        id: String,
        postedDate: Date,
        updatedDate: Date,
        assigned: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      },
      {
        document: String,
        name: String,
        endpoint: String,
        id: String,
        postedDate: Date,
        updatedDate: Date,
        assigned: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      },
      {
        document: String,
        endpoint: String,
        name: String,
        id: String,
        postedDate: Date,
        updatedDate: Date,
        assigned: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      },
    ],
    stateFile: [
      {
        document: String,
        name: String,
        id: String,
        postedDate: Date,
        endpoint: String,
        updatedDate: Date,
        assigned: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      },
      {
        document: String,
        endpoint: String,
        name: String,
        id: String,
        postedDate: Date,
        updatedDate: Date,
        assigned: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      },
      {
        document: String,
        name: String,
        id: String,
        endpoint: String,
        postedDate: Date,
        updatedDate: Date,
        assigned: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      },
    ],
    hardship: [
      {
        document: String,
        endpoint: String,
        name: String,
        id: String,
        postedDate: Date,
        updatedDate: Date,
        assigned: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      },
      {
        document: String,
        endpoint: String,
        name: String,
        id: String,
        postedDate: Date,
        updatedDate: Date,
        assigned: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      },
    ],
    paymentPlan: [
      {
        document: String,
        endpoint: String,
        name: String,
        id: String,
        postedDate: Date,
        updatedDate: Date,
        assigned: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      },
      {
        document: String,
        endpoint: String,
        name: String,
        id: String,
        postedDate: Date,
        updatedDate: Date,
        assigned: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      },
    ],
    offer: [
      {
        document: String,
        endpoint: String,
        name: String,
        id: String,
        postedDate: Date,
        updatedDate: Date,
        assigned: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      },
      {
        document: String,
        endpoint: String,
        name: String,
        id: String,
        postedDate: Date,
        updatedDate: Date,
        assigned: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      },
    ],
    appeal: [
      {
        document: String,
        endpoint: String,
        name: String,
        id: String,
        postedDate: Date,
        updatedDate: Date,
        assigned: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      },
      {
        document: String,
        endpoint: String,
        name: String,
        id: String,
        postedDate: Date,
        updatedDate: Date,
        assigned: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      },
    ],
    corp: [
      {
        document: String,
        endpoint: String,
        name: String,
        id: String,
        postedDate: Date,
        updatedDate: Date,
        assigned: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      },
      {
        document: String,
        endpoint: String,
        name: String,
        id: String,
        postedDate: Date,
        updatedDate: Date,
        assigned: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      },
      {
        document: String,
        endpoint: String,
        name: String,
        id: String,
        postedDate: Date,
        updatedDate: Date,
        assigned: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      },
    ],
    annuity: [
      {
        document: String,
        endpoint: String,
        name: String,
        id: String,
        postedDate: Date,
        updatedDate: Date,
        assigned: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      },
      {
        document: String,
        endpoint: String,
        name: String,
        id: String,
        postedDate: Date,
        updatedDate: Date,
        assigned: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      },
    ],
  },

  paymentStatus: {
    quote: { type: Number },
    lastPayment: { type: Number },
    gross: { type: Number },
    initial: { type: Number },
    total: { type: Number },
    redLine: { type: Number },
    refunded: { type: Number },
    balance: { type: Number },
    loans: { type: String },
    initialPaymentDate: { type: Date },
    initialUpsellDate: { type: Date },
    lastPaymentDate: { type: Date },
    paymentsRemaining: { type: Number },
    percentPaid: { type: Number },
  },
  paymentSchedule: [
    {
      paymentIndex: { type: Number },
      paymentMethod: { type: String },
      paymentAmount: { type: Number },
      paymentDate: { type: Date },
      paymentId: { type: String },
      commissioned: { type: Boolean, default: false },
    },
  ],
  paymentMethods: [PaymentMethod.schema],
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
  source: {
    type: String,
    default: "",
  },
  callid: {
    type: String,
    default: "",
  },
  tracking: {
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
  lexId: {
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
  fileType: {
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
  real: {
    name: { type: String },
    address: { type: String },
    amount: { type: String },
  },
  bankruptcy: {
    filingType: { type: String },
    court: { type: String },
  },
});

module.exports = mongoose.model("prospect", ProspectSchema);
