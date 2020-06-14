const mongoose = require("mongoose");
const { Schema } = mongoose;

const leadSchema = new Schema({
  firstName: String,
  lastName: String,
  fullName: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  county: String,
  type: String,
  amount: Number,
  email: String,
  lienDate: Date,
  dmDate: Date,
  lexId: String,
  plaintiff: String,
  status: String,
});

module.exports = mongoose.model("leads", leadSchema);
