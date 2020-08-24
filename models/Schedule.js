const mongoose = require("mongoose");
const { Schema } = mongoose;

const ScheduleSchema = new Schema({
  entry: [
    {
      title: String,
      mailHouse: String,
      vendor: String,
      type: String,
      colorPaper: String,
      colorInk: String,
      image: String,
      taxChart: String,
      lienType: String,
      key: String,
      lienAmount: String,
      fileid: String,
      zipCodeSuppress: String,
      zipCode: [String],
      postageCeiling: String,
      unitCost: String,
      tracking: String,
      startDate: String,
      lookBack: Number,
      scheduleDate: String,
    },
  ],
});

module.exports = mongoose.model("schedule", ScheduleSchema);
