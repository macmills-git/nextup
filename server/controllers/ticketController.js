import Ticket from "../models/Ticket.js";
import Event from "../models/Event.js";

// @desc    Purchase / Book tickets for an event
// @route   POST /api/tickets
export const purchaseTicket = async (req, res) => {
  try {
    const { eventId, quantity = 1 } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    const totalPrice = event.price * quantity;
    const ticketId = `TKT-${Math.floor(100000 + Math.random() * 900000)}`;

    const ticket = await Ticket.create({
      ticketId,
      event: event._id,
      user: req.user ? req.user._id : "650000000000000000000000",
      quantity,
      totalPrice,
      qrCode: `UPNEXT-${ticketId}-${Date.now()}`,
    });

    // Update tickets sold count
    event.ticketsSold += quantity;
    await event.save();

    res.status(201).json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get user tickets
// @route   GET /api/tickets/my
export const getMyTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user._id }).populate("event");
    res.json({
      success: true,
      data: tickets,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
