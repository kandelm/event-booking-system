const express = require('express');
const { bookEvent, getUserBookings } = require('../controllers/bookings');
const { auth } = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, bookEvent);
router.get('/', auth, getUserBookings);

module.exports = router;