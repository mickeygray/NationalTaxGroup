const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CaseWorkerSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  role: { type: String },
  resoCred1: { type: String },
  resoCred2: { type: String },
  reminders: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      userReminded: { type: mongoose.Schema.Types.ObjectId },
      reminderDate: { type: Date },
      reminderDueDate: { type: Date },
      status: { type: String },
      daysTilDue: { type: Number },
      id: { type: String },
      text: { type: String },
      clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Prospect" },
    },
  ],
});

module.exports = mongoose.model("caseWorker", CaseWorkerSchema);
