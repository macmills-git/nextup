import mongoose from "mongoose";

const ATLAS_URI = "mongodb+srv://kusiboatengmills_db_user:ueg9lIK4zQF6LKJu@cluster0.qody7yk.mongodb.net/upnext?retryWrites=true&w=majority&appName=Cluster0";

export const connectDB = async () => {
  const uri = process.env.MONGO_URI || ATLAS_URI;
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[MongoDB Connected]: ${conn.connection.host} / Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`[MongoDB Connection Error]: ${error.message}`);
    console.warn("⚠️ Continuing with fallback state until MongoDB connection is active.");
  }
};
