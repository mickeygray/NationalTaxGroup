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
    st: String,
    zip4: String,
    county: String,
    type: String,
    taxAmount: String,
    email: String,
    lienDate: String,
    noticeDate: String,
    b: String,
    pinCode: String,
    originalDept: String,
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
