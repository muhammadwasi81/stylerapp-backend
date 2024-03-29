const mongoose = require("mongoose");

const deliverySchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    external_delivery_id: {
      type: String,
      required: true,
      trim: true,
    },
    pickup_address: {
      type: String,
      required: true,
    },
    pickup_phone_number: {
      type: String,
      required: true,
    },
    pickup_reference_tag: {
      type: String,
      required: true,
    },
    dropoff_address: {
      type: String,
      required: true,
    },
    pickup_business_name: {
      type: String,
    },
    dropoff_business_name: {
      type: String,
    },
    dropoff_phone_number: {
      type: String,
      required: true,
    },
    order_value: {
      type: Number,
      required: false,
    },
    tip: {
      type: Number,
      required: false,
    },
    action_if_undeliverable: {
      type: String,
      required: false,
    },
    paymentStatus: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
deliverySchema.index({ external_delivery_id: 1 }, { unique: true });
module.exports = mongoose.model("Delivery", deliverySchema);
