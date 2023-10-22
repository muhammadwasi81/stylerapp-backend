const User = require("./models/userModel");
require("dotenv").config();
const connectDB = require("./config/db");
const color = require("colors");
const { adminUser } = require("./utils/data");

connectDB();

const importData = async () => {
  try {
    // await User.deleteMany();

    const createUser = await User.insertMany(adminUser);
    await createUser[0]._id;

    console.log("Data Imported!".green.inverse);
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();

    console.log("Data Destroyed!".red.inverse);
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] == "-d") {
  destroyData();
} else {
  importData();
}
