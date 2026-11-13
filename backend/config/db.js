import mongoose from "mongoose";

// connect to MongoDB, stop the server if the connection fails
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("DB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
