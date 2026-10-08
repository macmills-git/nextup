import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import User from "../models/User.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });
dotenv.config();

const ADMIN_EMAIL = "admin@upnext.com";
const ADMIN_PASSWORD = "AdminUpNext2026!";
const ADMIN_NAME = "upNext Administrator";

const seedAdmin = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/upnext";
    await mongoose.connect(mongoUri);
    console.log("[MongoDB Connected] Seeding Admin credentials...");

    let adminUser = await User.findOne({ email: ADMIN_EMAIL });

    if (adminUser) {
      console.log("Admin user already exists. Updating role & password...");
      adminUser.role = "admin";
      adminUser.name = ADMIN_NAME;
      adminUser.password = ADMIN_PASSWORD; // Will be hashed by User pre-save hook
      await adminUser.save();
    } else {
      console.log("Creating primary Admin user in MongoDB Atlas...");
      adminUser = await User.create({
        name: ADMIN_NAME,
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        role: "admin",
      });
    }

    console.log("----------------------------------------");
    console.log("👑 ADMIN ACCOUNT CREATED & PERSISTED TO MONGODB ATLAS:");
    console.log(`   Email: ${adminUser.email}`);
    console.log(`   Role : ${adminUser.role}`);
    console.log("----------------------------------------");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding Admin:", error.message);
    process.exit(1);
  }
};

seedAdmin();
