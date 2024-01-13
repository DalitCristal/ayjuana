import __dirname from "../index.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = "";

    if (req.body.type === "profile") {
      uploadPath = `${__dirname}/public/profiles/img`;
    } else if (req.body.type === "product") {
      uploadPath = `${__dirname}/public/products/img`;
    } else if (req.body.type === "document") {
      uploadPath = `${__dirname}/public/documents/img`;
    } else {
      return cb(new Error("Tipo de archivo no válido"));
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    console.log("FILE MULTER", file);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploader = multer({ storage });
console.log("MULTER DEVUELVE", uploader);
export default uploader;
