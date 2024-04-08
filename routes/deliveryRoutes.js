const express = require("express");
const router = express.Router();
const {
  createDelivery,
  getAllDeliveries,
  getDeliverStatus,
} = require("../controllers/deliveryController");
const { authMiddleware } = require("../middleware/authMiddleware");
const upload = require("../utils/multipartData");

router.post("/create_delivery", authMiddleware, createDelivery);
router.get("/get_deliveries", authMiddleware, getAllDeliveries);
router.get("/get_delivery_status", authMiddleware, getDeliverStatus);

module.exports = router;
