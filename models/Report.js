const mongoose = require("mongoose");
const { Schema } = mongoose;
require("mongoose-function")(mongoose);
const reportSchema = new Schema({
  campaignId: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign" },
  emailId: { type: mongoose.Schema.Types.ObjectId, ref: "Email" },
  calls: [
    {
      callid: { type: mongoose.Schema.Types.ObjectId, ref: "Call" },
      clientNumber: { type: String },
      trackingNumber: { type: String },
    },
  ],
  prospects: [
    {
      prospectId: { type: mongoose.Schema.Types.ObjectId, ref: "Prospect" },
      lienid: { type: String },
      quote: { type: Number },
      closerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],
  clients: [
    {
      clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
      lienid: { type: String },
      gross: { type: Number },
      initial: { type: Number },
      total: { type: Number },
      closerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],
  maths: {
    roi: Function,
    ror: Function,
  },
});

module.exports = mongoose.model("report", reportSchema);
