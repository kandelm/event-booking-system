const Booking = require('../models/Booking');
const Event = require('../models/Event');

const bookEvent = async (req, res) => {
  const { eventId } = req.body;
  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const existingBooking = await Booking.findOne({ user: req.user._id, event: eventId });
    if (existingBooking) return res.status(400).json({ message: 'Event already booked' });

    const booking = new Booking({ user: req.user._id, event: eventId });
    await booking.save();
    res.status(201).json({ message: 'Event booked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('event');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { bookEvent, getUserBookings };