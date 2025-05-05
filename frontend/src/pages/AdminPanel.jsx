import { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPanel() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
    date: '',
    venue: '',
    price: '',
    image: null,
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await axios.get('http://localhost:5000/api/events');
      setEvents(res.data.events);
    };
    fetchEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (key === 'image' && form[key]) {
        formData.append('image', form[key]);
      } else {
        formData.append(key, form[key]);
      }
    });

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/events/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
      } else {
        await axios.post('http://localhost:5000/api/events', formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
      }
      setForm({ name: '', description: '', category: '', date: '', venue: '', price: '', image: null });
      setEditingId(null);
      const res = await axios.get('http://localhost:5000/api/events');
      setEvents(res.data.events);
    } catch (error) {
      console.error('Event save error:', error);
    }
  };

  const handleEdit = (eve) => {
    setForm({
      name: eve.name,
      description: eve.description,
      category: eve.category,
      date: eve.date.split('T')[0],
      venue: eve.venue,
      price: eve.price,
      image: null,
    });
    setEditingId(eve._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setEvents(events.filter((eve) => eve._id !== id));
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      <form onSubmit={handleSubmit} className="mb-8 bg-white dark:bg-gray-800 p-4 rounded shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Event Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="p-2 border dark:bg-gray-700 dark:text-white"
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="p-2 border dark:bg-gray-700 dark:text-white"
            required
          />
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="p-2 border dark:bg-gray-700 dark:text-white"
            required
          >
            <option value="">Select Category</option>
            <option value="Concert">Concert</option>
            <option value="Workshop">Workshop</option>
            <option value="Conference">Conference</option>
          </select>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="p-2 border dark:bg-gray-700 dark:text-white"
            required
          />
          <input
            type="text"
            placeholder="Venue"
            value={form.venue}
            onChange={(e) => setForm({ ...form, venue: e.target.value })}
            className="p-2 border dark:bg-gray-700 dark:text-white"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="p-2 border dark:bg-gray-700 dark:text-white"
            required
          />
          <input
            type="file"
            onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
            className="p-2 border dark:bg-gray-700 dark:text-white"
          />
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {editingId ? 'Update Event' : 'Create Event'}
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <div key={event._id} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="text-xl font-bold">{event.name}</h2>
            <p className="text-gray-600 dark:text-gray-300">{event.description}</p>
            <p className="text-gray-600 dark:text-gray-300">Category: {event.category}</p>
            <p className="text-gray-600 dark:text-gray-300">Date: {new Date(event.date).toLocaleDateString()}</p>
            <div className="mt-2">
              <button
                onClick={() => handleEdit(event)}
                className="bg-yellow-500 text-white px-4 py-2 rounded mr-2 hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(event._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPanel;