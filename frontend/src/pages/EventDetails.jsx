import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      const res = await axios.get(`http://localhost:5000/api/events/${id}`);
      setEvent(res.data);
    };

    const checkBooking = async () => {
      if (user) {
        const res = await axios.get('http://localhost:5000/api/bookings', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setIsBooked(res.data.some(booking => booking.event._id === id));
      }
    };

    fetchEvent();
    checkBooking();
  }, [id, user]);

  const handleBook = async () => {
    try {
      await axios.post(
        'http://localhost:5000/api/bookings',
        { eventId: id },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      navigate('/booking-confirmation');
    } catch (error) {
      console.error('Booking error:', error);
    }
  };

  if (!event) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{event.name}</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <img src={event.image || 'https://via.placeholder.com/300'} alt={event.name} className="w-full md:w-1/2 h-64 object-cover rounded" />
        <div>
          <p className="text-gray-600 dark:text-gray-300"><strong>Description:</strong> {event.description}</p>
          <p className="text-gray-600 dark:text-gray-300"><strong>Category:</strong> {event.category}</p>
          <p className="text-gray-600 dark:text-gray-300"><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
          <p className="text-gray-600 dark:text-gray-300"><strong>Venue:</strong> {event.venue}</p>
          <p className="text-gray-600 dark:text-gray-300"><strong>Price:</strong> ${event.price}</p>
          {isBooked ? (
            <span className="inline-block bg-green-500 text-white px-4 py-2 rounded mt-2">Booked</span>
          ) : (
            <button
              onClick={handleBook}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600"
              disabled={!user}
            >
              Book Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventDetails;