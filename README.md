# Utsav - Event Booking Platform

React + Vite + Tailwind frontend with an Express + MongoDB backend.

## Backend structure
```
backend/
├── config/db.js                  # MongoDB connection
├── models/                       # Event, Booking schemas
├── controllers/                  # request logic (events, bookings)
├── routes/                       # URL -> controller mapping
├── middleware/errorMiddleware.js # 404 + central error handler
├── seed.js                       # inserts sample events
└── server.js                     # app entry point
```

## Run the backend
```
cd backend
npm install
cp .env.example .env   # set MONGO_URI if needed
npm run seed           # MongoDB must be running
npm start              # http://localhost:5000
```

## Run the frontend
```
npm install
npm run dev
```

## API
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/events | All events (optional `?search=` and `?category=`) |
| GET | /api/events/:id | Single event |
| POST | /api/bookings | Create booking (name, email, phone, eventId, tickets) |
| GET | /api/bookings | List all bookings (optional `?phone=`) |
| GET | /api/bookings/:id | Single booking with its status |
| PATCH | /api/bookings/:id/status | Change status: pending / confirmed / cancelled |

## Confirming a booking manually
Every new booking starts as `pending`. To confirm it, send this from Postman:
```
PATCH http://localhost:5000/api/bookings/<booking _id>/status
Body (JSON): { "status": "confirmed" }
```
or change the `status` field directly in MongoDB Compass. The frontend shows
"Ticket Confirmed" on the booking page (Refresh status) and on the My Bookings page.
