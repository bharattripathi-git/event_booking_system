import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const formattedDate = new Date(event.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });

  return (
    <div
      onClick={() => navigate(`/event/${event._id}`)}
      className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={event.image}
          alt={event.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/events/default.svg";
          }}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <span className="absolute top-3 left-3 bg-[#1a1330]/80 text-white text-xs px-3 py-1 rounded-full">
          {event.category}
        </span>
      </div>

      {/* ticket stub cut - dashed divider with half circle notches */}
      <div className="ticket-notch relative border-t-2 border-dashed border-[#e5decf]">
        <div className="p-5 flex flex-col gap-2">
          <h3 className="font-display font-bold text-lg text-[#221830] leading-snug">
            {event.name}
          </h3>

          <div className="flex items-center gap-2 text-sm text-[#6b6375]">
            <Calendar size={15} />
            <span>{formattedDate} • {event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#6b6375]">
            <MapPin size={15} />
            <span className="truncate">{event.venue}</span>
          </div>

          <div className="flex items-center justify-between pt-3">
            <p className="font-semibold text-[#1a1330]">
              {event.price === 0 ? "Free entry" : `₹${event.price}`}
            </p>
            <button className="text-xs font-semibold text-[#f2b544] bg-[#1a1330] px-4 py-1.5 rounded-full hover:bg-[#241b3f] transition-colors">
              View details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
