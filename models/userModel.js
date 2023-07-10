const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, 'Please enter your name'],
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: [true, 'Please enter your phone number'],
    },
    password: {
      type: String,
      required: [true, 'Please enter your password'],
    },
    isChecked: {
      type: Boolean,
      required: [true, 'Please check the box'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
