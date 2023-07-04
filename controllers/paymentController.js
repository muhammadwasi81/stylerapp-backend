const Delivery = require('../models/deliveryModel');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (req, res) => {
  try {
    const { amount, deliveryId } = req.body;
    console.log(amount, deliveryId, 'amount, deliveryId');
    if (!amount)
      return res
        .status(400)
        .json({ message: 'Amount is required', status: false });

    const processingFee = 29916;
    const remainingAmount = amount - processingFee;
    console.log(remainingAmount, 'remainingAmount');
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      description: 'Delivery Payment',
      payment_method_types: ['card'],
      // payment_method: id,
      confirm: true,
    });
    console.log(paymentIntent, 'paymentIntent');
    if (paymentIntent.status === 'succeeded') {
      await Delivery.findByIdAndUpdate(
        deliveryId,
        {
          paymentStatus: true,
        },
        { new: true }
      );
    } else {
      return res.json({
        message: 'Payment failed',
        status: false,
      });
    }
    res.json({
      message: 'Payment successful',
      status: true,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      message: 'An error occured',
      status: false,
    });
  }
};

module.exports = { createPaymentIntent };
