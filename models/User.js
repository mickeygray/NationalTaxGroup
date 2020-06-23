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
  date: {
    type: Date,
    default: Date.now,
  },
  prevLeads: {
    type: Array,
  },
  leads: {
    type: Array,
  },
  tasks: {
    type: Array,
  },
  reminders: [
    {
      id: { type: String },
      reminderText: { type: String },
      clientName: { type: String },
      clientId: { type: mongoose.Schema.Types.ObjectId },
      reminderDate: { type: Date, default: Date.now() },
    },
  ],
});

module.exports = mongoose.model("user", UserSchema);
