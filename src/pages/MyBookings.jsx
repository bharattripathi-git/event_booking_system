import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Ticket } from "lucide-react";
import { EventContext } from "../context/EventContext";
import StatusBadge from "../components/StatusBadge/StatusBadge";

const MyBookings = () => {
  const navigate = useNavigate();
  const { getEventById, getMyBookings } = useContext(EventContext);

  const [phone, setPhone] = useState("");
  const [bookings, setBookings] = useState([]);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError("Enter the 10 digit phone number used while booking");
      return;
    }

    setError("");
    const data = await getMyBookings(phone);
    if (data === null) {
      setError("Could not load bookings. Please try again.");
      return;
    }
    setBookings(data);
    setSearched(true);
  };

  return (
    <div className="max-w-2xl mx-auto px-5 py-12">
      <h1 className="font-display font-bold text-3xl text-[#221830] mb-1">
        My Bookings
      </h1>
      <p className="text-[#6b6375] mb-8">
        Enter your phone number to check the status of your tickets.
      </p>

      <form onSubmit={handleSearch} className="flex gap-3 mb-2">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b6375]"
            size={18}
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="9876543210"
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-[#e5decf] focus:outline-none focus:border-[#f2b544] text-sm"
          />
        </div>
        <button
          type="submit"
          className="bg-[#1a1330] text-white font-semibold px-6 rounded-full hover:bg-[#241b3f] transition-colors"
        >
          Check
        </button>
      </form>
      {error && <p className="text-red-500 text-xs mb-4 ml-4">{error}</p>}

      <div className="flex flex-col gap-4 mt-6">
        {searched && bookings.length === 0 && (
          <p className="text-center text-[#6b6375] py-8">
            No bookings found for this number.
          </p>
        )}

        {bookings.map((booking) => {
          const event = getEventById(booking.eventId);
          return (
            <div
              key={booking._id}
              className={`bg-white rounded-2xl border p-5 flex flex-col gap-3 ${
                booking.status === "confirmed"
                  ? "border-green-300"
                  : "border-[#e5decf]"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display font-bold text-lg text-[#221830]">
                    {event ? event.name : "Event"}
                  </h3>
                  <p className="text-xs text-[#6b6375]">
                    Booking ID: #{booking._id.slice(-6).toUpperCase()}
                  </p>
                </div>
                <StatusBadge status={booking.status} />
              </div>

              <div className="flex justify-between text-sm text-[#6b6375]">
                <span>{booking.tickets} ticket(s)</span>
                <span className="font-semibold text-[#221830]">
                  {booking.total === 0 ? "Free" : `₹${booking.total}`}
                </span>
              </div>

              {booking.status === "confirmed" && (
                <div className="flex items-center gap-2 bg-green-50 text-green-700 text-sm rounded-xl px-4 py-2">
                  <Ticket size={16} />
                  Ticket confirmed. Show your booking ID at the entry.
                </div>
              )}
              {booking.status === "pending" && (
                <p className="text-sm text-yellow-700 bg-yellow-50 rounded-xl px-4 py-2">
                  Waiting for confirmation. Check again in some time.
                </p>
              )}
            </div>
          );
        })}
      </div>

      <button
        onClick={() => navigate("/events")}
        className="mt-8 text-[#f2b544] font-semibold"
      >
        Browse more events
      </button>
    </div>
  );
};

export default MyBookings;
