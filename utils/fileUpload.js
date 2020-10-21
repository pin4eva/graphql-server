import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import config from "../config";

aws.config.update({
  secretAccessKey: config.S3_SECRET_KEY,
  accessKeyId: config.S3_ACCESS_KEY_ID,
  region: "us-east-2",
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "edfhr",
    acl: "public-read",
    metadata: (reg, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString());
    },
  }),
});

export default upload;
