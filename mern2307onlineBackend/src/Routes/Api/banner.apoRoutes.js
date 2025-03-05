const express = require("express");
const _ = express.Router();
const { upload } = require("../../Middleware/multer.middleware");
const {
  createbanner,
  getAllBanner,
  updateBanner,
} = require("../../Controller/banner.controller");
_.route("/banner")
  .post(upload.fields([{ name: "image", maxCount: 1 }]), createbanner)
  .put(updateBanner)
  .get(getAllBanner);

module.exports = _;
