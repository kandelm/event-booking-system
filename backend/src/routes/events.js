const express = require('express');
const { createEvent, getEvents, getEvent, updateEvent, deleteEvent, upload } = require('../controllers/events');
const { auth, admin } = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, admin, upload.single('image'), createEvent);
router.get('/', getEvents);
router.get('/:id', getEvent);
router.put('/:id', auth, admin, upload.single('image'), updateEvent);
router.delete('/:id', auth, admin, deleteEvent);

module.exports = router;