import mongoose from "mongoose";
import Booking from "../models/Booking.js";
import Event from "../models/Event.js";

// create a new booking
const createBooking = async (req, res) => {
  try {
    const { name, email, phone, eventId, tickets } = req.body;

    // check if anything is missing
    if (!name || !email || !phone || !eventId || !tickets) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const cleanName = String(name).trim();
    const cleanEmail = String(email).trim().toLowerCase();
    const cleanPhone = String(phone).trim();
    const ticketCount = Number(tickets);

    if (cleanName.length < 3) {
      return res
        .status(400)
        .json({ message: "Name should be at least 3 characters" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({ message: "Please enter a valid email" });
    }

    // indian mobile numbers have 10 digits and start with 6, 7, 8 or 9
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      return res
        .status(400)
        .json({ message: "Please enter a valid 10 digit phone number" });
    }

    if (!Number.isInteger(ticketCount) || ticketCount < 1 || ticketCount > 10) {
      return res
        .status(400)
        .json({ message: "You can book 1 to 10 tickets at a time" });
    }

    // make sure the event actually exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // calculating total here so nobody can change the price from the frontend
    const booking = await Booking.create({
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      eventId,
      tickets: ticketCount,
      total: event.price * ticketCount,
    });

    res.status(201).json({ message: "Booking successful", booking });
  } catch (error) {
    console.log("Error in createBooking:", error.message);
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
};

// get all bookings (latest first)
// optional: ?phone=9876543210 to get only one person's bookings
const getBookings = async (req, res) => {
  try {
    const filter = {};
    if (req.query.phone) filter.phone = req.query.phone;

    const bookings = await Booking.find(filter).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    console.log("Error in getBookings:", error.message);
    res.status(500).json({ message: "Could not fetch bookings" });
  }
};

// get a single booking (used to check the current status)
const getBookingById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid booking id" });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(booking);
  } catch (error) {
    console.log("Error in getBookingById:", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// change booking status - this is how a booking gets confirmed manually
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ["pending", "confirmed", "cancelled"];

    if (!allowed.includes(status)) {
      return res
        .status(400)
        .json({ message: "Status must be pending, confirmed or cancelled" });
    }
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid booking id" });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json({ message: `Booking ${status}`, booking });
  } catch (error) {
    console.log("Error in updateBookingStatus:", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export { createBooking, getBookings, getBookingById, updateBookingStatus };
