const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, phoneNumber, password, isChecked } = req.body;
  console.log(userName, email, phoneNumber, password, isChecked, "req.body");
  if (!userName || !email || !password || !phoneNumber || !isChecked) {
    return res
      .status(400)
      .send({ message: "Please fill all fields", status: false });
  }

  const userExists = await User.findOne({ $or: [{ userName }, { email }] });

  if (userExists) {
    if (userExists.userName === userName) {
      return res
        .status(400)
        .send({ message: "Username already taken", status: false });
    }
    if (userExists.email === email) {
      return res
        .status(400)
        .send({ message: "Email already registered", status: false });
    }
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    userName,
    email,
    phoneNumber,
    password: hashedPassword,
    isChecked,
  });
  const data = {
    _id: user.id,
    userName: user.userName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    isChecked: user.isChecked,
    isAdmin: user.isAdmin,
    token: generateToken(user._id),
  };
  if (user) {
    res.status(201).json({
      message: "User created successfully",
      data,
      status: true,
    });
  } else {
    res.status(400).send({ message: "Invalid user data", status: false });
  }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password, "req.body");
  const user = await User.findOne({ email });
  console.log(user, "user");

  if (!user) {
    return res
      .status(400)
      .send({ message: "User does not exist", status: false });
  }

  const data = {
    _id: user.id,
    userName: user.userName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    isAdmin: user.isAdmin,
    token: generateToken(user._id),
  };

  if (await bcrypt.compare(password, user.password)) {
    res
      .status(200)
      .json({
        message:
          data.isAdmin === true
            ? "Admin logged in successfully"
            : "User logged in successfully",
        data,
        status: true,
      });
  } else {
    res
      .status(400)
      .send({ message: "Invalid email or password", status: false });
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  console.log(user, "user");
  if (user) {
    res.status(200).json({
      message: "User fetched successfully",
      data: user,
      status: true,
    });
  } else {
    res.status(404).send({ message: "User not found", status: false });
  }
});

module.exports = { registerUser, loginUser, getUserById };
