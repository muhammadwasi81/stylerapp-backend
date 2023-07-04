const express = require('express');
const router = express.Router();
const {
  createDelivery,
  getAllDeliveries,
} = require('../controllers/deliveryController');
// const { protect } = require('../middleware/authMiddleware');

router.post('/create_delivery', createDelivery);
router.get('/get_deliveries', getAllDeliveries);

module.exports = router;
