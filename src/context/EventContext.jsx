import { createContext, useState, useEffect } from "react";

export const EventContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const EventContextProvider = (props) => {
  const [events_list, setEventsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // load all events from the backend once when the app starts
  useEffect(() => {
    fetch(`${API_URL}/events`)
      .then((res) => res.json())
      .then((data) => setEventsList(data))
      .catch((err) => console.log("Failed to load events:", err))
      .finally(() => setLoading(false));
  }, []);

  const getEventById = (id) => {
    return events_list.find((event) => event._id === id);
  };

  // send the booking to the backend, returns { booking, error }
  const addBooking = async (bookingData) => {
    try {
      const res = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
      const data = await res.json();
      if (res.ok) return { booking: data.booking, error: null };
      return { booking: null, error: data.message || "Booking failed. Please try again." };
    } catch (error) {
      return { booking: null, error: "Could not reach the server. Please try again." };
    }
  };

  // get one booking again to see its latest status
  const getBookingById = async (id) => {
    try {
      const res = await fetch(`${API_URL}/bookings/${id}`);
      if (!res.ok) return null;
      return await res.json();
    } catch (error) {
      return null;
    }
  };

  // get all bookings made with a phone number
  const getMyBookings = async (phone) => {
    try {
      const res = await fetch(`${API_URL}/bookings?phone=${phone}`);
      if (!res.ok) return null;
      return await res.json();
    } catch (error) {
      return null;
    }
  };

  // apply both filters together - name search + category
  const filteredEvents = events_list.filter((event) => {
    const matchesSearch = event.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || event.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const contextValue = {
    events_list,
    filteredEvents,
    loading,
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
    getEventById,
    addBooking,
    getBookingById,
    getMyBookings,
  };

  return (
    <EventContext.Provider value={contextValue}>
      {props.children}
    </EventContext.Provider>
  );
};

export default EventContextProvider;
