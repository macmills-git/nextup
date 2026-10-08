import express from "express";
import {
  getEvents,
  getNearbyEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  toggleBookmarkEvent,
  getOrganizerStats,
} from "../controllers/eventController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.route("/").get(getEvents).post(protect, createEvent);
router.get("/nearby", getNearbyEvents);
router.get("/organizers/stats", protect, getOrganizerStats);

router.route("/:id").get(getEventById).put(protect, updateEvent).delete(protect, deleteEvent);
router.post("/:id/bookmark", protect, toggleBookmarkEvent);

export default router;
