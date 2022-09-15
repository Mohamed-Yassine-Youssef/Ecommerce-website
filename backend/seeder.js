import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import order from "./models/orderModel.js";
import user from "./models/userModel.js";
import product from "./models/productModel.js";

import connectDB from "./config/db.js";
dotenv.config();
connectDB();
const importData = async () => {
  try {
    await order.deleteMany();
    await product.deleteMany();
    await user.deleteMany();

    const createdUsers = await user.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });
    await product.insertMany(sampleProducts);
    console.log("data emported".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await order.deleteMany();
    await product.deleteMany();
    await user.deleteMany();

    console.log("data destroyed".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
