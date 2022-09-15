import mongoose from "mongoose";
const connectDB = async () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("DB connected".cyan.underline))
    .catch((err) => console.log(err.message.red.bold));
};
export default connectDB;
