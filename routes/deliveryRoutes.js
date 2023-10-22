const express = require("express");
const router = express.Router();
const {
  createDelivery,
  getAllDeliveries,
  getDeliverStatus,
} = require("../controllers/deliveryController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/create_delivery", authMiddleware, createDelivery);
router.get("/get_deliveries", getAllDeliveries);
router.get("/get_delivery_status", getDeliverStatus);

module.exports = router;
