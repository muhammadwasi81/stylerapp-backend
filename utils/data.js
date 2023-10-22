const bcrypt = require("bcrypt");

const adminUser = [
  {
    name: "Ray Lawernce",
    userName: "ray",
    phoneNumber: "08123456789",
    email: "ray@gmail.com",
    password: bcrypt.hashSync("2375cbf2", 10),
    isAdmin: true,
  },
];

module.exports = { adminUser };
