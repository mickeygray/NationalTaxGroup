const mongoose = require("mongoose");

const CallSchema = mongoose.Schema({
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
    type: Date,
  },
  source_name: {
    type: String,
  },
});

module.exports = mongoose.model("call", CallSchema);
