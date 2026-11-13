import React, { useContext } from "react";
import { EventContext } from "../context/EventContext";
import SearchFilter from "../components/SearchFilter/SearchFilter";
import EventListing from "../components/EventListing/EventListing";

const AllEvents = () => {
  const { filteredEvents } = useContext(EventContext);

  return (
    <div className="pt-10 pb-16">
      <div className="text-center mb-8 px-5">
        <h1 className="font-display font-bold text-3xl md:text-4xl text-[#221830]">
          All Events
        </h1>
        <p className="text-[#6b6375] mt-2">
          Search by name or filter by category
        </p>
      </div>

      <SearchFilter />
      <EventListing events={filteredEvents} />
    </div>
  );
};

export default AllEvents;
