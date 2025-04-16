const express = require("express");
const {
  placeorder,
  getAllOrder,
  getSingleOrder,
} = require("../../Controller/order.controller");
const _ = express.Router();
const { authGuard } = require("../../Middleware/authGuard.middleware");
_.route("/placeorder").post(authGuard, placeorder);
_.route("/allorder").get(getAllOrder);
_.route("/order/:id").get(getSingleOrder);

module.exports = _;
