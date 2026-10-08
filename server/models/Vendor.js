import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Vendor name is required"],
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    logo: {
      type: String,
      default: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400",
    },
    description: {
      type: String,
      default: "",
    },
    categories: [
      {
        type: String,
        enum: [
          "MC / Host",
          "DJ",
          "Decoration",
          "Sound",
          "Lighting",
          "Catering / Food",
          "Photography",
          "Videography",
          "Event Planning",
          "Security",
          "Ushers",
          "Venue",
          "Equipment Rental",
          "Printing / Branding",
          "Transport",
          "Other",
        ],
      },
    ],
    services: [
      {
        title: String,
        price: String,
        description: String,
      },
    ],
    city: {
      type: String,
      default: "Accra",
    },
    location: {
      type: String,
      default: "Accra",
    },
    latitude: {
      type: Number,
      default: 5.5506,
    },
    longitude: {
      type: Number,
      default: -0.1962,
    },
    rating: {
      type: Number,
      default: 4.8,
    },
    reviewsCount: {
      type: Number,
      default: 12,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    contact: {
      phone: String,
      email: String,
      whatsapp: String,
      instagram: String,
      website: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Vendor", vendorSchema);
