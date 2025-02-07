import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = "mongodb+srv://shashanksingh9694:Sha789@#$@cluster0.l7jmt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async (retries = 5, delay = 5000) => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);

    if (retries > 0) {
      console.log(`🔄 Retrying in ${delay / 1000} seconds... (${retries} attempts left)`);
      setTimeout(() => connectDB(retries - 1, delay), delay);
    } else {
      console.error("❌ MongoDB Connection Failed after multiple retries.");
      process.exit(1);
    }
  }
};

export default connectDB;
