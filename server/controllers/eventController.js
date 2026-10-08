import Event from "../models/Event.js";
import User from "../models/User.js";
import Ticket from "../models/Ticket.js";

// @desc    Get all events with search, category, and radius filtering
// @route   GET /api/events
export const getEvents = async (req, res) => {
  try {
    const { search, category, city, minPrice, maxPrice, isFree, lat, lng, radiusKm } = req.query;

    let query = {};

    // Keyword Search
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { venue: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
      ];
    }

    // Category Filter
    if (category && category !== "All") {
      query.category = { $regex: new RegExp(`^${category}$`, "i") };
    }

    // City Filter
    if (city) {
      query.city = { $regex: new RegExp(city, "i") };
    }

    // Free filter
    if (isFree === "true") {
      query.price = 0;
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Location Radius Filter (MongoDB 2dsphere $near)
    if (lat && lng && radiusKm) {
      const latitude = parseFloat(lat);
      const longitude = parseFloat(lng);
      const radiusInMeters = parseFloat(radiusKm) * 1000;

      if (!isNaN(latitude) && !isNaN(longitude) && !isNaN(radiusInMeters)) {
        query.location = {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [longitude, latitude],
            },
            $maxDistance: radiusInMeters,
          },
        };
      }
    }

    const events = await Event.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get nearby events within specific radius (GeoSpatial Map Endpoint)
// @route   GET /api/events/nearby
export const getNearbyEvents = async (req, res) => {
  try {
    const { lat, lng, radiusKm = 10 } = req.query;

    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);

    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({ success: false, message: "Valid lat and lng query params are required" });
    }

    const radiusInMeters = parseFloat(radiusKm) * 1000;

    const events = await Event.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          $maxDistance: radiusInMeters,
        },
      },
    });

    res.json({
      success: true,
      count: events.length,
      radiusKm: parseFloat(radiusKm),
      data: events,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single event by ID
// @route   GET /api/events/:id
export const getEventById = async (req, res) => {
  try {
    let event = await Event.findById(req.params.id);
    if (!event) {
      event = await Event.findOne({ eventId: req.params.id });
    }

    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    res.json({
      success: true,
      data: event,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new event
// @route   POST /api/events
export const createEvent = async (req, res) => {
  try {
    const { title, description, shortDescription, category, venue, city, latitude, longitude, date, time, price, image } = req.body;

    const lat = parseFloat(latitude) || 5.5506;
    const lng = parseFloat(longitude) || -0.1962;

    const event = await Event.create({
      title,
      description,
      shortDescription: shortDescription || description?.slice(0, 120),
      category: category || "Tech",
      venue,
      city: city || "Accra",
      latitude: lat,
      longitude: lng,
      location: {
        type: "Point",
        coordinates: [lng, lat],
      },
      date,
      time,
      price: Number(price) || 0,
      isFree: Number(price) === 0,
      image: image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200",
      organizer: req.user ? req.user._id : null,
      organizerName: req.user ? req.user.name : "Community Host",
    });

    res.status(201).json({
      success: true,
      data: event,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Toggle Bookmark on Event
// @route   POST /api/events/:id/bookmark
export const toggleBookmarkEvent = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const eventId = req.params.id;

    const isBookmarked = user.bookmarks.includes(eventId);

    if (isBookmarked) {
      user.bookmarks = user.bookmarks.filter((id) => id.toString() !== eventId);
    } else {
      user.bookmarks.push(eventId);
    }

    await user.save();

    res.json({
      success: true,
      isBookmarked: !isBookmarked,
      bookmarks: user.bookmarks,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update an event
// @route   PUT /api/events/:id
export const updateEvent = async (req, res) => {
  try {
    let event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    if (req.body.latitude && req.body.longitude) {
      req.body.location = {
        type: "Point",
        coordinates: [parseFloat(req.body.longitude), parseFloat(req.body.latitude)],
      };
    }

    event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      data: event,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    await event.deleteOne();

    res.json({
      success: true,
      message: "Event removed successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get organizer stats (total events created, tickets sold, revenue)
// @route   GET /api/organizers/stats
export const getOrganizerStats = async (req, res) => {
  try {
    const events = await Event.find({ organizer: req.user._id });
    const eventIds = events.map((e) => e._id);

    const tickets = await Ticket.find({ event: { $in: eventIds } });

    const totalTicketsSold = tickets.reduce((sum, t) => sum + t.quantity, 0);
    const totalRevenue = tickets.reduce((sum, t) => sum + t.totalPrice, 0);

    res.json({
      success: true,
      data: {
        totalEvents: events.length,
        totalTicketsSold,
        totalRevenue,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
