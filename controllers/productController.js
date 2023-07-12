const Product = require('../models/productModel');
const User = require('../models/userModel');

// @Desc Create a new product
// @route POST /api/create_product
// @access Public
const createProductInfo = async (req, res) => {
  try {
    const {
      productName,
      quantity,
      color,
      address,
      firstName,
      lastName,
      image,
    } = req.body;

    // const userId = req.user._id; // Retrieve the user ID directly
    // console.log(userId, 'user id');
    const requiredFields = [
      productName,
      quantity,
      color,
      address,
      firstName,
      lastName,
      image,
    ];
    if (requiredFields.includes('')) {
      return res.status(400).json({
        message: 'Please fill all the fields',
        status: false,
      });
    }

    // if (!req.file) {
    //   return res
    //     .status(400)
    //     .json({ message: 'Please upload an image', status: false });
    // }

    const newProduct = new Product({
      productName,
      quantity,
      color,
      address,
      firstName,
      lastName,
      image,
      // user: userId,
    });

    const savedProduct = await newProduct.save();
    console.log('Saved product: ' + savedProduct);
    if (savedProduct) {
      console.log('Saved saved product saved');
      return res.status(201).json({
        message: 'Product created successfully',
        data: savedProduct,
        status: true,
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'Server error', status: false });
  }
};

module.exports = { createProductInfo };
