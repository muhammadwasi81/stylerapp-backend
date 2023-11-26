const { DoorDashClient } = require("@doordash/sdk");
require("dotenv").config();
const asyncHandler = require("express-async-handler");
const Delivery = require("../models/deliveryModel");
const mongoose = require("mongoose");
const userModel = require("../models/userModel");

// @Desc:   Create a delivery
// @Route:  POST /api/delivery/create_delivery
// @Access: Public
const createDelivery = asyncHandler(async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const userId = req.user._id;
  console.log(userId, "userID");
  try {
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
      order_value,
      action_if_undeliverable,
    } = req.body;
    console.log(req.body, "req.body");
    const client = new DoorDashClient({
      developer_id: "176d0960-96de-41e6-8348-2018b8643934", // local
      key_id: "01a18f0f-ed66-4e78-9f17-0dbe9c341c72", // local
      // developer_id: "176d0960-96de-41e6-8348-2018b8643934", // live
      // key_id: "de24935d-cfa9-4389-b9f4-bc145f2f1b62", // live
      signing_secret: "ww4QAu1v0Te2jz9W_c_-GbzyS2JbFsgal8o5xJVkZqs",
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
      order_value,
      action_if_undeliverable,
    });
    console.log("RESPONSE FROM DOORDASH API", data);
    const delivery = new Delivery({
      ...req.body,
      userId,
    });
    await delivery.save({ session });
    console.log(delivery, "delivery.message");
    console.log(data.message, "data.message");

    await session.commitTransaction();
    return res.status(201).send(data);
  } catch (error) {
    await session.abortTransaction();
    console.log(error.message, "error.message");
    if (error.code === 11000) {
      // 11000 is MongoDB's code for duplicate key error
      return res
        .status(400)
        .send({ message: "Delivery Already Created", status: false });
    }

    if (error.message === "Duplicate delivery ID") {
      return res
        .status(400)
        .send({ message: "Delivery Already Created", status: false });
    }
    res.status(500).send({ message: error.message, status: false });
  } finally {
    session.endSession();
  }
});

// @Desc:   Get delivery status
// @Route:  GET /api/delivery/get_delivery_status
// @Access: Public
// const getDeliverStatus = asyncHandler(async (req, res) => {
//   try {
//     const { external_delivery_id } = req.query;
//     if (!external_delivery_id)
//       return res
//         .status(400)
//         .send({ message: "external_delivery_id is required", status: false });

//     console.log(external_delivery_id);
//     const client = new DoorDashClient({
//       developer_id: "176d0960-96de-41e6-8348-2018b8643934",
//       key_id: "01a18f0f-ed66-4e78-9f17-0dbe9c341c72",
//       signing_secret: "ww4QAu1v0Te2jz9W_c_-GbzyS2JbFsgal8o5xJVkZqs",
//     });

//     await client
//       .getDelivery(external_delivery_id)
//       .then((data) => {
//         return res.status(200).send({
//           message: "Delivery fetched Successfully",
//           data: data.data,
//           status: true,
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//         return res
//           .status(404)
//           .send({ message: "Delivery not found", status: false });
//       });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send({ message: error.message, status: false });
//   }
// });

const getDeliverStatus = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId)
      return res
        .status(400)
        .send({ message: "userId is required", status: false });

    // Fetch the delivery associated with the userId
    const delivery = await Delivery.findOne({ userId: userId });

    if (!delivery)
      return res
        .status(404)
        .send({ message: "Delivery not found for this user", status: false });

    const external_delivery_id = delivery.external_delivery_id;

    const client = new DoorDashClient({
      developer_id: "176d0960-96de-41e6-8348-2018b8643934",
      key_id: "01a18f0f-ed66-4e78-9f17-0dbe9c341c72",
      signing_secret: "ww4QAu1v0Te2jz9W_c_-GbzyS2JbFsgal8o5xJVkZqs",
    });

    await client
      .getDelivery(external_delivery_id)
      .then((data) => {
        return res.status(200).send({
          message: "Delivery fetched Successfully",
          data: data.data,
          status: true,
        });
      })
      .catch((err) => {
        console.log(err);
        return res
          .status(404)
          .send({ message: "Delivery not found in DoorDash", status: false });
      });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message, status: false });
  }
});

// @Desc:   Get all deliveries
// @Route:  GET /api/delivery/get_deliveries
// @Access: Public
const getAllDeliveries = asyncHandler(async (req, res) => {
  try {
    const deliveries = await Delivery.find({});
    console.log(deliveries, "deliveries");

    if (!deliveries) {
      return res
        .status(404)
        .send({ message: "No deliveries found", status: false });
    }
    res.status(200).send({
      message: "Deliveries fetched Successfully",
      data: deliveries,
      status: true,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message, status: false });
  }
});

module.exports = { createDelivery, getAllDeliveries, getDeliverStatus };
