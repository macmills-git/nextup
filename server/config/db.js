import mongoose from "mongoose";

const ATLAS_URI = "mongodb+srv://kusiboatengmills_db_user:ueg9lIK4zQF6LKJu@cluster0.qody7yk.mongodb.net/upnext?retryWrites=true&w=majority&appName=Cluster0";

// Disable buffering so queries fail fast with diagnostic errors instead of hanging
mongoose.set("bufferCommands", false);

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;
  const uri = process.env.MONGO_URI || ATLAS_URI;
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[MongoDB Connected]: ${conn.connection.host} / Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`[MongoDB Connection Error]: ${error.message}`);
  }
};
