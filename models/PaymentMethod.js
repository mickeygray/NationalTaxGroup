const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentMethodSchema = new Schema({
  name: { type: String },
  type: { type: String },
  cardNumber: { type: String },
  expiryDate: { type: String },
  cvc: { type: String },
  accBank: { type: String },
  accType: { type: String },
  accRouting: { type: String },
  accNo: { type: String },
  contact: { type: String },
  totalBalance: { type: Number },
  availableBalance: { type: Number },
});

module.exports = mongoose.model("paymentMethod", PaymentMethodSchema);
