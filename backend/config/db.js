require("dotenv").config(); // Load environment variables from the .env file

const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    // console.log(process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("database connected successfully!");
  } catch (err) {
    console.error(err.message);
  }
};
module.exports = connectDB;
