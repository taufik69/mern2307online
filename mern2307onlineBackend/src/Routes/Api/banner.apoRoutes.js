const express = require("express");
const _ = express.Router();
const { upload } = require("../../Middleware/multer.middleware");
const {
  createbanner,
  getAllBanner,
  updateBanner,
  deleteBanner,
} = require("../../Controller/banner.controller");
_.route("/banner")
  .post(upload.fields([{ name: "image", maxCount: 1 }]), createbanner)
  .put(upload.fields([{ name: "image", maxCount: 1 }]), updateBanner)
  .get(getAllBanner);
_.route("/banner/:id").delete(deleteBanner);
module.exports = _;
