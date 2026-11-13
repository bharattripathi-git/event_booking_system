import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import AllEvents from "./pages/AllEvents";
import EventDetails from "./pages/EventDetails";
import BookingForm from "./pages/BookingForm";
import MyBookings from "./pages/MyBookings";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<AllEvents />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/book/:id" element={<BookingForm />} />
          <Route path="/book" element={<BookingForm />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
