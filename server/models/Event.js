import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
    },
    eventId: {
      type: String,
      unique: true,
      sparse: true,
    },
    shortDescription: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      required: [true, "Event description is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["Tech", "Music", "Business", "Arts", "Sports", "Food & Drink", "Nightlife", "Community", "Education"],
      default: "Tech",
    },
    venue: {
      type: String,
      required: [true, "Venue is required"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
      default: "Accra",
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    // GeoJSON for MongoDB 2dsphere spatial querying
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    date: {
      type: String,
      required: [true, "Event date is required"],
    },
    time: {
      type: String,
      required: [true, "Event time is required"],
    },
    price: {
      type: Number,
      default: 0,
    },
    isFree: {
      type: Boolean,
      default: function () {
        return this.price === 0;
      },
    },
    image: {
      type: String,
      default: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200",
    },
    organizerName: {
      type: String,
      default: "upNext Events",
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    capacity: {
      type: Number,
      default: 100,
    },
    ticketsSold: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed", "cancelled"],
      default: "upcoming",
    },
  },
  {
    timestamps: true,
  }
);

// Create 2dsphere index for location searching radius
eventSchema.index({ location: "2dsphere" });

export default mongoose.model("Event", eventSchema);
