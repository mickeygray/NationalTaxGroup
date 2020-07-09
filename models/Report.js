const mongoose = require("mongoose");
const { Schema } = mongoose;
const Today = require("./Today");
require("mongoose-function")(mongoose);
const reportSchema = new Schema({
  week: [Today.schema],
  month: [Today.schema],
  quarter: [Today.schema],
  year: [Today.schema],

  maths: {
    roi: Function,
    ror: Function,
  },
});

module.exports = mongoose.model("report", reportSchema);
