import express from "express";
import { purchaseTicket, getMyTickets } from "../controllers/ticketController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, purchaseTicket);
router.get("/my", protect, getMyTickets);

export default router;
