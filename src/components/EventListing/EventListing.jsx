import React from "react";
import EventCard from "../EventCard/EventCard";

const EventListing = ({ events, title }) => {
  return (
    <div id="featured" className="px-5 md:px-10 py-10">
      {title && (
        <h2 className="font-display font-bold text-2xl md:text-3xl text-[#221830] mb-8 text-center">
          {title}
        </h2>
      )}

      {events.length === 0 ? (
        <p className="text-center text-[#6b6375] py-10">
          No events found for this category or search term. Try something else.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventListing;
