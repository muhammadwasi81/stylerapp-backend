const express = require('express');
const router = express.Router();
const { createPaymentIntent } = require('../controllers/paymentController');

router.post('/create_payment', createPaymentIntent);

module.exports = router;
