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
  highdollar: { type: Boolean, default: false },
  upsellable: { type: Boolean, default: false },
  contacted: { type: Boolean, default: false },
  optedin: { type: Boolean, default: false },
  converted: { type: Boolean, default: false },
  dnc: { type: Boolean, default: false },
});

module.exports = mongoose.model("leads", leadSchema);
