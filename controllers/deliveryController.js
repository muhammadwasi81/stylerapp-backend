const { DoorDashClient } = require('@doordash/sdk');
// const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const asyncHandler = require('express-async-handler');
const Delivery = require('../models/deliveryModel');

const createDelivery = asyncHandler(async (req, res) => {
  try {
    const {
      external_delivery_id,
      pickup_address,
      pickup_phone_number,
      dropoff_address,
      pickup_business_name,
      dropoff_business_name,
      dropoff_phone_number,
      order_value,
      tip,
    } = req.body;
    const client = new DoorDashClient({
      developer_id: '176d0960-96de-41e6-8348-2018b8643934',
      key_id: '3f2ff2e9-be37-42ef-bb59-865b78ffb145',
      signing_secret: ' 1w7PDA8Foi0q0YOlRLiMJ3SBmnwq_6rwlfaLKAct7Bs',
    });
    const data = await client.createDelivery({
      external_delivery_id,
      pickup_address,
      pickup_phone_number,
      dropoff_address,
      pickup_business_name,
      dropoff_business_name,
      dropoff_phone_number,
      order_value,
      tip,
    });
    console.log(data, 'response from doordash');

    // Save the delivery data in Mongoose
    const userId = req.user._id;
    console.log(userId, 'USER_ID');
    const delivery = new Delivery({
      external_delivery_id,
      pickup_address,
      pickup_phone_number,
      dropoff_address,
      pickup_business_name,
      dropoff_business_name,
      dropoff_phone_number,
      order_value,
      tip,
      userId,
    });
    await delivery.save();

    res
      .status(200)
      .send({ data, message: 'Delivery created successfully', status: true });
  } catch (error) {
    console.log(error.message, 'error from doordash');
    res.status(500).send({ message: error.message, status: false });
  }
});

module.exports = { createDelivery };
