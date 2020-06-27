const mongoose = require("mongoose");
const { Schema } = mongoose;

const leadSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    fullName: String,
    deliveryAddress: String,
    alternateAddress1: String,
    city: String,
    state: String,
    zip4: String,
    county: String,
    fileType: String,
    amount: Number,
    email: String,
    filingDate: String,
    loadDate: String,
    fiveAmount: Number,
    nineAmount: Number,
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
    problem: String,
    company: String,
    paid: String,
    ageRange: String,
    phone: String,
    emailAddress: String,
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
