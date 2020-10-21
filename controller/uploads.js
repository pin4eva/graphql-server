const router = require("express").Router();
import User from "../models/User";

import multer from "multer";
import path from "path";
import config from "../config";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({
  storage,
});

router.post("/user/:id", upload.single("image"), async (req, res) => {
  const { path } = req.file;
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { image: `${config.SERVER_URL}/${path}` } },
      { new: true }
    );
    res.status(200).json({ image: user.image });
  } catch (error) {
    res.json(error);
  }
});

export default router;
