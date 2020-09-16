const mongoose = require("mongoose");
const { Schema } = mongoose;

const leadSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    fullName: String,
    address: String,
    deliveryAddress: String,
    alternateAddress1: String,
    city: String,
    state: String,
    zip4: String,
    county: String,
    ssn: String,
    fileType: String,
    amount: String,
    source: String,
    email: String,
    filingDate: String,
    loadDate: Date,
    fiveAmount: String,
    nineAmount: String,
    loadDatePlusSeven: String,
    entityType: String,
    pinCode: String,
    origDept: String,
    plaintiff: String,
    status: String,
    years: String,
    age: String,
    dob: String,
    employed: String,
    income: String,
    creditscore: String,
    phone: String,
    phones: [String],
    problem: String,
    company: String,
    paid: String,
    ageRange: String,
    phone: String,
    emailAddresses: [String],
    email: String,
    emailAddress: String,
    pdfs: Array,
    costs: [
      {
        mailer: String,
        unitCost: Number,
        date: Date,
      },
    ],
    real: {
      name: String,
      address: String,
      amount: String,
    },
    bankruptcy: {
      court: String,
      filingType: String,
    },
  },
  {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

module.exports = mongoose.model("leads", leadSchema);
