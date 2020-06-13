const mongoose = require("mongoose");
const { Schema } = mongoose;

const campaignSchema = new Schema({
  title: String,
  html: String,
  text: String,
  subject: String,
  from: String,
  campaignName: String,
  list: [],
});

module.exports = mongoose.model("campaign", campaignSchema);
