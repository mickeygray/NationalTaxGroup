const util = require("util");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const url = require("../config/default.json");

var storage = new GridFsStorage({
  url: "mongodb://host:27017/database",
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });
var storage = new GridFsStorage({
  url:
    "mongodb+srv://mickeygray:nXBefiXzZ1lyI3bJ@cluster0.xmo5h.mongodb.net/test?retryWrites=true&w=majority",
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["application/pdf"];

    console.log(req, "????");
    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${req.body.name}`;
      return filename;
    }

    return {
      bucketName: "fs",
      filename: `${req.body.name}`,
    };
  },
});

var uploadFile = multer({ storage: storage }).single("file");
var uploadFilesMiddleware = util.promisify(uploadFile);
module.exports = uploadFilesMiddleware;
