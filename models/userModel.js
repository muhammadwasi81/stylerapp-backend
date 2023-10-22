const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      trim: true,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Please enter your email"],
      unique: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
      required: [true, "Please enter your phone number"],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Please enter your password"],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
