const User = require("../models/userModel");
const mongoose = require("mongoose");
const Product = require("../models/productModel");

const dashboardData = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ message: "Invalid user ID", status: false });
    }

    const products = await Product.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "deliveries",
          localField: "userId",
          foreignField: "userId",
          as: "deliveries",
        },
      },
      {
        $project: {
          userId: 1,
          firstName: 1,
          lastName: 1,
          imageUrl: {
            $concat: ["https://stylre-app.onrender.com/", "$image"],
          },
          deliveries: 1,
        },
      },
    ]);
    console.log(products, "products");
    return res.send({
      data: products,
      message: "Data fetched successfully",
      status: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error, status: false });
  }
};

module.exports = { dashboardData };
