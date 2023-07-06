const express = require('express');
const router = express.Router();
const {
  createDelivery,
  getAllDeliveries,
} = require('../controllers/deliveryController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/create_delivery', authMiddleware, createDelivery);
router.get('/get_deliveries', authMiddleware, getAllDeliveries);

module.exports = router;
