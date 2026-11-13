import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, MapPin, User, Clock, ArrowLeft } from "lucide-react";
import { EventContext } from "../context/EventContext";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getEventById, loading } = useContext(EventContext);

  const event = getEventById(id);

  // wait for events to load before deciding the event is missing
  if (loading) {
    return <p className="text-center py-20 text-[#6b6375]">Loading event...</p>;
  }

  // guard so it doesn't crash if the event doesn't exist
  if (!event) {
    return (
      <div className="text-center py-20">
        <p className="text-[#6b6375]">This event could not be found.</p>
        <button
          onClick={() => navigate("/events")}
          className="mt-4 text-[#f2b544] font-semibold"
        >
          Browse all events
        </button>
      </div>
    );
  }

  const formattedDate = new Date(event.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="max-w-4xl mx-auto px-5 md:px-10 py-10">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-[#6b6375] hover:text-[#1a1330] mb-6 transition-colors"
      >
        <ArrowLeft size={18} /> Go back
      </button>

      <div className="rounded-2xl overflow-hidden h-64 md:h-80 mb-6">
        <img
          src={event.image}
          alt={event.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/events/default.svg";
          }}
          className="w-full h-full object-cover"
        />
      </div>

      <span className="bg-[#1a1330] text-[#f2b544] text-xs px-3 py-1 rounded-full">
        {event.category}
      </span>

      <h1 className="font-display font-bold text-3xl md:text-4xl text-[#221830] mt-4 mb-5">
        {event.name}
      </h1>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="flex items-center gap-3 text-[#221830]">
          <Calendar className="text-[#f2b544]" size={20} />
          <div>
            <p className="text-xs text-[#6b6375]">Date</p>
            <p className="font-medium">{formattedDate}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-[#221830]">
          <Clock className="text-[#f2b544]" size={20} />
          <div>
            <p className="text-xs text-[#6b6375]">Time</p>
            <p className="font-medium">{event.time}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-[#221830]">
          <MapPin className="text-[#f2b544]" size={20} />
          <div>
            <p className="text-xs text-[#6b6375]">Venue</p>
            <p className="font-medium">{event.venue}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-[#221830]">
          <User className="text-[#f2b544]" size={20} />
          <div>
            <p className="text-xs text-[#6b6375]">Organizer</p>
            <p className="font-medium">{event.organizer}</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="font-display font-bold text-xl text-[#221830] mb-2">
          About this event
        </h2>
        <p className="text-[#6b6375] leading-relaxed">{event.description}</p>
      </div>

      <div className="mb-10">
        <h2 className="font-display font-bold text-xl text-[#221830] mb-4">
          Schedule
        </h2>
        <div className="flex flex-col gap-3">
          {event.schedule.map((item, index) => (
            <div
              key={index}
              className="flex gap-4 border-l-2 border-[#f2b544] pl-4 py-1"
            >
              <p className="font-semibold text-[#1a1330] w-28 shrink-0">
                {item.time}
              </p>
              <p className="text-[#6b6375]">{item.activity}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="sticky bottom-4 bg-white border border-[#e5decf] rounded-2xl p-5 flex items-center justify-between shadow-lg">
        <div>
          <p className="text-xs text-[#6b6375]">Ticket price</p>
          <p className="font-display font-bold text-xl text-[#221830]">
            {event.price === 0 ? "Free entry" : `₹${event.price}`}
          </p>
        </div>
        <button
          onClick={() => navigate(`/book/${event._id}`)}
          className="bg-[#f2b544] hover:bg-[#e0a530] text-[#1a1330] font-semibold px-7 py-3 rounded-full transition-all duration-300 hover:scale-105"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default EventDetails;
