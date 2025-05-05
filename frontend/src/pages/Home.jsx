import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function Home() {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState('');
  const { user } = useContext(AuthContext);
  const [bookedEvents, setBookedEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await axios.get(`http://localhost:5000/api/events?page=${page}&limit=6${category ? `&category=${category}` : ''}`);
      setEvents(res.data.events);
      setTotalPages(res.data.totalPages);
    };

    const fetchBookedEvents = async () => {
      if (user) {
        const res = await axios.get('http://localhost:5000/api/bookings', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setBookedEvents(res.data.map(booking => booking.event._id));
      }
    };

    fetchEvents();
    fetchBookedEvents();
  }, [page, category, user]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Upcoming Events</h1>
      <div className="mb-4">
        <label className="mr-2">Filter by Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border dark:bg-gray-800 dark:text-white"
        >
          <option value="">All</option>
          <option value="Concert">Concert</option>
          <option value="Workshop">Workshop</option>
          <option value="Conference">Conference</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <div key={event._id} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <img src={event.image || 'https://via.placeholder.com/150'} alt={event.name} className="w-full h-48 object-cover rounded mb-4" />
            <h2 className="text-xl font-bold">{event.name}</h2>
            <p className="text-gray-600 dark:text-gray-300">{event.description.substring(0, 100)}...</p>
            <p className="text-gray-600 dark:text-gray-300">Date: {new Date(event.date).toLocaleDateString()}</p>
            <p className="text-gray-600 dark:text-gray-300">Price: ${event.price}</p>
            {bookedEvents.includes(event._id) ? (
              <span className="inline-block bg-green-500 text-white px-4 py-2 rounded mt-2">Booked</span>
            ) : (
              <Link to={`/events/${event._id}`} className="inline-block bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600">
                Book Now
              </Link>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded mr-2 disabled:bg-gray-400"
        >
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;