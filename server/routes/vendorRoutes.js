import express from "express";
import { getVendors, getVendorById, createOrUpdateVendor } from "../controllers/vendorController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.route("/").get(getVendors).post(protect, createOrUpdateVendor);
router.route("/:id").get(getVendorById);

export default router;
