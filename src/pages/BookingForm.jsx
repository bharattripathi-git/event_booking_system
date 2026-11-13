import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle2, Clock } from "lucide-react";
import { EventContext } from "../context/EventContext";
import StatusBadge from "../components/StatusBadge/StatusBadge";

const BookingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events_list, getEventById, addBooking, getBookingById } =
    useContext(EventContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventId: id || "",
    tickets: 1,
  });
  const [errors, setErrors] = useState({});
  const [savedBooking, setSavedBooking] = useState(null);
  const [checking, setChecking] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // basic client-side validation - a real backend would also check this server-side
  const validate = () => {
    const newErrors = {};
    if (formData.name.trim().length < 3) {
      newErrors.name = "Name should be at least 3 characters";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10 digit phone number";
    }
    if (!formData.eventId) newErrors.eventId = "Please choose an event";
    if (formData.tickets < 1 || formData.tickets > 10) {
      newErrors.tickets = "You can book 1 to 10 tickets";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const { booking, error } = await addBooking(formData);
    if (error) {
      setErrors({ server: error });
    } else {
      setSavedBooking(booking);
    }
  };

  const selectedEvent = getEventById(formData.eventId);

  // fetch the booking again to see if it has been confirmed
  const refreshStatus = async () => {
    setChecking(true);
    const latest = await getBookingById(savedBooking._id);
    if (latest) setSavedBooking(latest);
    setChecking(false);
  };

  if (savedBooking) {
    const isConfirmed = savedBooking.status === "confirmed";

    return (
      <div className="max-w-md mx-auto px-5 py-20 text-center flex flex-col items-center gap-4">
        {isConfirmed ? (
          <CheckCircle2 className="text-green-500" size={56} />
        ) : (
          <Clock className="text-[#f2b544]" size={56} />
        )}
        <h1 className="font-display font-bold text-2xl text-[#221830]">
          {isConfirmed ? "Ticket Confirmed!" : "Booking request sent!"}
        </h1>
        <p className="text-[#6b6375]">
          {isConfirmed
            ? "Your ticket is confirmed. Show your booking ID at the entry."
            : "Your booking is pending. Check the status again once it is confirmed."}
        </p>

        <div className="w-full bg-white border border-[#e5decf] rounded-2xl p-5 text-sm text-left flex flex-col gap-2">
          <div className="flex justify-between">
            <span className="text-[#6b6375]">Booking ID</span>
            <span className="font-semibold">
              #{savedBooking._id.slice(-6).toUpperCase()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6b6375]">Event</span>
            <span className="font-semibold">{selectedEvent?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6b6375]">Tickets</span>
            <span className="font-semibold">{savedBooking.tickets}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#6b6375]">Status</span>
            <StatusBadge status={savedBooking.status} />
          </div>
        </div>

        {!isConfirmed && (
          <button
            onClick={refreshStatus}
            disabled={checking}
            className="bg-[#f2b544] hover:bg-[#e0a530] text-[#1a1330] font-semibold px-6 py-3 rounded-full transition-all duration-300"
          >
            {checking ? "Checking..." : "Refresh status"}
          </button>
        )}
        <button
          onClick={() => navigate("/my-bookings")}
          className="bg-[#1a1330] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#241b3f] transition-colors"
        >
          View my bookings
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-5 py-12">
      <h1 className="font-display font-bold text-3xl text-[#221830] mb-1">
        Ticket Booking
      </h1>
      <p className="text-[#6b6375] mb-8">
        Fill in your details and we'll send a confirmation email/call.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="text-sm font-medium text-[#221830]">
            Full name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Prashant Kumar"
            className={`w-full mt-1 px-4 py-2.5 rounded-xl border ${
              errors.name ? "border-red-400" : "border-[#e5decf]"
            } focus:outline-none focus:border-[#f2b544]`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-[#221830]">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={`w-full mt-1 px-4 py-2.5 rounded-xl border ${
              errors.email ? "border-red-400" : "border-[#e5decf]"
            } focus:outline-none focus:border-[#f2b544]`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-[#221830]">
            Phone number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="9876543210"
            className={`w-full mt-1 px-4 py-2.5 rounded-xl border ${
              errors.phone ? "border-red-400" : "border-[#e5decf]"
            } focus:outline-none focus:border-[#f2b544]`}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-[#221830]">Event</label>
          <select
            name="eventId"
            value={formData.eventId}
            onChange={handleChange}
            className={`w-full mt-1 px-4 py-2.5 rounded-xl border bg-white ${
              errors.eventId ? "border-red-400" : "border-[#e5decf]"
            } focus:outline-none focus:border-[#f2b544]`}
          >
            <option value="">-- Choose an event --</option>
            {events_list.map((event) => (
              <option key={event._id} value={event._id}>
                {event.name}
              </option>
            ))}
          </select>
          {errors.eventId && (
            <p className="text-red-500 text-xs mt-1">{errors.eventId}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-[#221830]">
            Number of tickets
          </label>
          <input
            type="number"
            name="tickets"
            min="1"
            max="10"
            value={formData.tickets}
            onChange={handleChange}
            className={`w-full mt-1 px-4 py-2.5 rounded-xl border ${
              errors.tickets ? "border-red-400" : "border-[#e5decf]"
            } focus:outline-none focus:border-[#f2b544]`}
          />
          {errors.tickets && (
            <p className="text-red-500 text-xs mt-1">{errors.tickets}</p>
          )}
        </div>

        {selectedEvent && (
          <div className="bg-[#faf6ef] border border-[#e5decf] rounded-xl px-4 py-3 flex justify-between text-sm">
            <span className="text-[#6b6375]">Total</span>
            <span className="font-semibold text-[#221830]">
              {selectedEvent.price === 0
                ? "Free"
                : `₹${selectedEvent.price * formData.tickets}`}
            </span>
          </div>
        )}

        {errors.server && (
          <p className="text-red-500 text-sm text-center">{errors.server}</p>
        )}

        <button
          type="submit"
          className="bg-[#f2b544] hover:bg-[#e0a530] text-[#1a1330] font-semibold py-3 rounded-full transition-all duration-300 hover:scale-[1.02]"
        >
          Submit Booking Request
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
