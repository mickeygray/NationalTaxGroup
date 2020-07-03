const mongoose = require("mongoose");
const { Schema } = mongoose;
require("mongoose-function")(mongoose);
const reportSchema = new Schema({
  campaignId: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign" },
  emailId: { type: mongoose.Schema.Types.ObjectId, ref: "Email" },
  calls: [
    {
      callid: { type: mongoose.Schema.Types.ObjectId, ref: "Call" },
      phone: { type: String },
      trackingNumber: { type: String },
    },
  ],
  listName: { type: String },
  listLength: { type: Number },
  date: { type: Date },
  ids: [{ _id: { type: mongoose.Schema.Types.ObjectId, ref: "Prospect" } }],
  prospects: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "Prospect" },
      lienid: { type: String },
      quote: { type: Number },
      claimedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],
  clients: [
    {
      clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Prospect" },
      lienid: { type: String },
      gross: { type: Number },
      initial: { type: Number },
      total: { type: Number },
      originator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      upsell: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],
  maths: {
    roi: Function,
    ror: Function,
  },
});

module.exports = mongoose.model("report", reportSchema);
