import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import Event from "../models/Event.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });
dotenv.config();

const sampleEvents = [
  {
    eventId: "evt-101",
    title: "Accra Tech & AI Summit 2026",
    shortDescription: "Ghana's largest gathering of software developers, AI engineers, and tech innovators.",
    description: "Join over 2,000 technology enthusiasts, founders, and developers in Accra for a full day of hands-on workshops, keynotes, AI demonstrations, and networking opportunities.",
    category: "Tech",
    venue: "Accra International Conference Centre",
    city: "Accra",
    latitude: 5.5506,
    longitude: -0.1962,
    location: {
      type: "Point",
      coordinates: [-0.1962, 5.5506],
    },
    date: "2026-11-15",
    time: "09:00 AM",
    price: 0,
    isFree: true,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200",
    organizerName: "Accra Tech Community",
  },
  {
    eventId: "evt-102",
    title: "Afrobeat & Culture Fest",
    shortDescription: "A vibrant celebration of African music, dance performance, and local cuisine.",
    description: "Experience world-class live performances from top West African Afrobeats artists, cultural dance troupes, local food vendors, and art installations.",
    category: "Music",
    venue: "Labadi Beach Park",
    city: "Accra",
    latitude: 5.556,
    longitude: -0.18,
    location: {
      type: "Point",
      coordinates: [-0.18, 5.556],
    },
    date: "2026-12-05",
    time: "04:00 PM",
    price: 35,
    isFree: false,
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200",
    organizerName: "AfroNation Events",
  },
  {
    eventId: "evt-103",
    title: "West Africa Business & Startup Expo",
    shortDescription: "Connecting entrepreneurs with venture capital investors and business mentors.",
    description: "Pitch your startup, find co-founders, and attend panel discussions on scaling businesses across Africa and entering international markets.",
    category: "Business",
    venue: "Mövenpick Ambassador Hotel",
    city: "Accra",
    latitude: 5.555,
    longitude: -0.201,
    location: {
      type: "Point",
      coordinates: [-0.201, 5.555],
    },
    date: "2026-10-28",
    time: "10:00 AM",
    price: 50,
    isFree: false,
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200",
    organizerName: "Venture Africa",
  },
  {
    eventId: "evt-104",
    title: "UG Legon Campus Hackathon",
    shortDescription: "48-hour student coding competition to build solutions for sustainable agriculture.",
    description: "Compete with fellow university students to build web and mobile applications addressing climate change and food security. Great prizes and internship opportunities!",
    category: "Tech",
    venue: "University of Ghana, Legon CS Dept",
    city: "Legon",
    latitude: 5.658,
    longitude: -0.187,
    location: {
      type: "Point",
      coordinates: [-0.187, 5.658],
    },
    date: "2026-11-20",
    time: "08:00 AM",
    price: 0,
    isFree: true,
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200",
    organizerName: "UG Developers Club",
  },
];

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/upnext";
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB for seeding...");

    await Event.deleteMany({});
    console.log("Cleared existing events.");

    await Event.insertMany(sampleEvents);
    console.log(`Successfully seeded ${sampleEvents.length} events into MongoDB!`);

    process.exit(0);
  } catch (error) {
    console.error("Error seeding DB:", error);
    process.exit(1);
  }
};

seedDB();
