const express = require('express');
const router = express.Router();
const { createDelivery } = require('../controllers/deliveryController');
// const { protect } = require('../middleware/authMiddleware');

router.post('/create_delivery', createDelivery);

module.exports = router;
