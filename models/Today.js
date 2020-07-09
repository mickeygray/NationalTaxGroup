const mongoose = require("mongoose");
const { Schema } = mongoose;

require("mongoose-function")(mongoose);

const TodaySchema = new Schema({
  payments: [
    {
      paymentMethod: { type: String },
      paymentAmount: { type: Number },
      paymentDate: { type: Date },
      paymentId: { type: String },
    },
  ],
  calls: [
    {
      customer_name: {
        type: String,
      },
      formatted_customer_phone_number: {
        type: String,
      },
      customer_state: {
        type: String,
      },
      callid: {
        type: String,
      },
      tracking_phone_number: {
        type: String,
      },
      start_time: {
        type: String,
      },
      source_name: {
        type: String,
      },
    },
  ],
  leads: [
    {
      amount: {
        type: String,
      },
      fileDate: {
        type: String,
      },
      pinCode: {
        type: String,
      },
      emailAddress: {
        type: String,
      },
      loadDate: {
        type: String,
      },
    },
  ],
  prospects: [
    {
      amount: {
        type: String,
      },
      phone: {
        type: String,
      },
      pinCode: {
        type: String,
      },
      emailAddress: {
        type: String,
      },
      lienid: {
        type: String,
      },
      quoted: {
        type: Number,
      },
      createdate: {
        type: String,
      },
    },
  ],
  newClients: [
    {
      pinCode: { type: String },
      quote: { type: Number },
      gross: { type: Number },
      initial: { type: Number },
      total: { type: Number },
      loans: { type: String },
      dealId: { type: String },
      initialPaymentDate: { type: Date },
    },
  ],
  updatedClients: [
    {
      lastPayment: { type: Number },
      gross: { type: Number },
      initial: { type: Number },
      total: { type: Number },
      loans: { type: String },
      dealId: { type: String },
      upsellId: { type: String },
      initialUpsellDate: { type: Date },
    },
  ],
});

module.exports = mongoose.model("today", TodaySchema);
