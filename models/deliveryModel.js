const mongoose = require('mongoose');

const deliverySchema = mongoose.Schema(
  {
    pickup_address: String,
    pickup_phone_number: String,
    dropoff_address: String,
    pickup_business_name: String,
    dropoff_business_name: String,
    dropoff_phone_number: String,
    order_value: Number,
    tip: Number,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Delivery', deliverySchema);
