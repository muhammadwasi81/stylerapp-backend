const User = require("../models/userModel");
const Delivery = require("../models/deliveryModel");
const Product = require("../models/productModel");

const dashboardData = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    const users = await User.find({ isAdmin: false })
      .select("-password")
      .sort({ createdAt: -1 });
    const deliveries = await Delivery.find({})
      .sort({ createdAt: -1 })
      .populate({ path: "userId", select: "-_id userName email" });

    console.log(deliveries, "deliveries");
    return res.send({
      data: {
        products,
        users,
        deliveries,
      },
      message: "Data fetched successfully",
      status: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error, status: false });
  }
};

module.exports = { dashboardData };
