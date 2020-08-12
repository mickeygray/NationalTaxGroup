const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  payDay: [Number],
  date: {
    type: Date,
    default: Date.now,
  },
  prevLeads: {
    type: Array,
  },
  recentProspects: [
    { _id: { type: mongoose.Schema.Types.ObjectId, ref: "Prospect" } },
  ],
  admin: { type: String },
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
  tasks: [
    {
      clientName: { type: String },
      clientId: { type: String },
      id: { type: String },
      assignedDate: { type: String },
      updatedDate: { type: String },
      assigned: { type: String },
      assignment: { type: String },
    },
  ],
});

module.exports = mongoose.model("user", UserSchema);
