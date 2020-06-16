const mongoose = require("mongoose");
const { Schema } = mongoose;

const pdfSchema = new Schema({
  title: String,
  html: String,
  text: String,
});

module.exports = mongoose.model("pdf", pdfSchema);
