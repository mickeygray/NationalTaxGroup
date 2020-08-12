const util = require("util");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const url = require("../config/default.json");

var storage = new GridFsStorage({
  url:
    "mongodb+srv://mickeygray:nXBefiXzZ1lyI3bJ@cluster0.xmo5h.mongodb.net/test?retryWrites=true&w=majority",
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["application/pdf"];

    console.log(req.body.document, "HAHAHAHAHAHAHAHA");

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${file.filename}`;
      return filename;
    }

    return {
      bucketName: "fs",
      filename: `${file.filename}`,
    };
  },
});

var uploadFile = multer({ storage: storage }).single("file");
var uploadFilesMiddleware = util.promisify(uploadFile);
module.exports = uploadFilesMiddleware;
