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
    fileType: String,
    amount: String,
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
    employed: String,
    income: String,
    creditscore: String,
    phone: String,
    phones: Array,
    problem: String,
    company: String,
    paid: String,
    ageRange: String,
    phone: String,
    emailAddresses: Array,
    email: String,
    emailAddress: String,
    pdfs: Array,
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
