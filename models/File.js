const mongoose = require("mongoose");
const { Schema } = mongoose;

const fileSchema = new Schema({
  fieldname: String,
  originalname: String,
  encoding: String,
  mimetype: String,
  filename: String,
  bucketName: String,
  chunkSize: Number,
  size: Number,
  md5: String,
  uploadDate: Date,
  contentType: String,
});

module.exports = mongoose.model("file", fileSchema);
