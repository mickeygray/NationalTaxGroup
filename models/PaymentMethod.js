const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentMethodSchema = new Schema({
  name: { type: String },
  type: { type: String },
  ccName: { type: String },
  ccType: { type: String },
  ccNo: { type: String },
  ccExp: { type: Date },
  ccZip: { type: String },
  ccSec: { type: String },
  ccPin: { type: String },
  accBank: { type: String },
  accType: { type: String },
  accRouting: { type: String },
  accNo: { type: String },
  contact: { type: String },
});

module.exports = mongoose.model("paymentMethod", PaymentMethodSchema);
