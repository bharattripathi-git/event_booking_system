import React, { useContext } from "react";
import { EventContext } from "../context/EventContext";
import Hero from "../components/Hero/Hero";
import Categories from "../components/Categories/Categories";
import EventListing from "../components/EventListing/EventListing";

const Home = () => {
  const { events_list } = useContext(EventContext);

  // only show top 3 events on homepage, rest live on /events
  const featuredEvents = events_list.slice(0, 3);

  return (
    <div>
      <Hero />
      <Categories />
      <EventListing events={featuredEvents} title="Trending this week" />
    </div>
  );
};

export default Home;
