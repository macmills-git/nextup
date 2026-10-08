import express from "express";
import { registerUser, loginUser, getMe } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/register", (req, res) => {
  res.json({ success: true, message: "Auth Register endpoint active. Please send a POST request with name, email, and password." });
});

router.post("/login", loginUser);
router.get("/login", (req, res) => {
  res.json({ success: true, message: "Auth Login endpoint active. Please send a POST request with email and password." });
});

router.get("/me", protect, getMe);

export default router;
