Event Booking System Backend
Setup Instructions

Prerequisites:

Node.js (v16 or higher)
MongoDB (running locally or via a cloud provider)
Git


Clone the Repository:
git clone <repository-url>
cd event-booking-system/backend


Install Dependencies:
npm install


Set Up Environment:

Create a .env file in the backend directory:PORT=5000
MONGODB_URI=mongodb://localhost:27017/event-booking
JWT_SECRET=secret_key




Run the Application:

Development mode (with hot reload):npm run dev


Production mode:npm start




Run Tests:
npm test



API Endpoints

Auth:
POST /api/auth/register - Register a new user
POST /api/auth/login - Login a user


Events:
GET /api/events - Get all events (supports pagination and category filter)
GET /api/events/:id - Get event details
POST /api/events - Create an event (admin only)
PUT /api/events/:id - Update an event (admin only)
DELETE /api/events/:id - Delete an event (admin only)


Bookings:
POST /api/bookings - Book an event
GET /api/bookings - Get user bookings



Deployment
The backend can be deployed to Vercel:

Push the backend code to a GitHub repository.
Connect the repository to Vercel.
Set environment variables in Vercel (e.g., MONGODB_URI, JWT_SECRET).
Deploy the application.

