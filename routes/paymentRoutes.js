const express = require('express');
const router = express.Router();
const { createPaymentIntent } = require('../controllers/paymentController');

router.post('/create_delivery', createPaymentIntent);

module.exports = router;
