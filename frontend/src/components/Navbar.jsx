import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { user, logout, darkMode, toggleDarkMode } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 dark:bg-blue-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">Event Booking</Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              {user.role === 'admin' && <Link to="/admin" className="text-white hover:text-gray-200">Admin Panel</Link>}
              <button onClick={handleLogout} className="text-white hover:text-gray-200">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-gray-200">Login</Link>
              <Link to="/register" className="text-white hover:text-gray-200">Register</Link>
            </>
          )}
          <button onClick={toggleDarkMode} className="text-white">
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;