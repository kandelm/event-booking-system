import { Link } from 'react-router-dom';

function BookingConfirmation() {
  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Congratulations!</h1>
      <p className="text-lg mb-4">Your event has been booked successfully.</p>
      <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Back to Home
      </Link>
    </div>
  );
}

export default BookingConfirmation;