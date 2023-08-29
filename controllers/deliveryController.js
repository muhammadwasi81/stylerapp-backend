const { DoorDashClient } = require('@doordash/sdk');
// const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const asyncHandler = require('express-async-handler');
const Delivery = require('../models/deliveryModel');

const createDelivery = asyncHandler(async (req, res) => {
  try {
    // const userId = req.user._id;
    const {
      external_delivery_id,
      pickup_address,
      pickup_business_name,
      dropoff_phone_number,
      dropoff_instructions,
      dropoff_address,
      pickup_reference_tag,
      dropoff_contact_given_name,
      pickup_instructions,
      pickup_phone_number,
      tip,
    } = req.body;
    console.log(req.body, 'req.body');
    const client = new DoorDashClient({
      developer_id: '176d0960-96de-41e6-8348-2018b8643934',
      key_id: '3f2ff2e9-be37-42ef-bb59-865b78ffb145',
      signing_secret: ' 1w7PDA8Foi0q0YOlRLiMJ3SBmnwq_6rwlfaLKAct7Bs',
    });
    const data = await client.createDelivery({
      external_delivery_id,
      pickup_address,
      pickup_business_name,
      dropoff_phone_number,
      dropoff_instructions,
      dropoff_address,
      pickup_reference_tag,
      dropoff_contact_given_name,
      pickup_instructions,
      pickup_phone_number,
      tip,
    });
    console.log('RESPONSE FROM DOORDASH API', data);
    const delivery = new Delivery({
      external_delivery_id,
      pickup_address,
      pickup_business_name,
      dropoff_phone_number,
      dropoff_instructions,
      dropoff_address,
      pickup_reference_tag,
      dropoff_contact_given_name,
      pickup_instructions,
      pickup_phone_number,
      tip,
      doordash_response: data.data,
      // user: userId,
    });
    // console.log(userId, 'userId');
    await delivery.save();
    res
      .status(201)
      .send({ data, message: 'Delivery created successfully', status: true });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message, status: false });
  }
});

const getAllDeliveries = asyncHandler(async (req, res) => {
  try {
    const deliveries = await Delivery.find({});
    console.log(deliveries, 'deliveries');

    if (!deliveries) {
      return res
        .status(404)
        .send({ message: 'No deliveries found', status: false });
    }
    res.status(200).send({
      message: 'Deliveries fetched Successfully',
      data: deliveries,
      status: true,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message, status: false });
  }
});

module.exports = { createDelivery, getAllDeliveries };
