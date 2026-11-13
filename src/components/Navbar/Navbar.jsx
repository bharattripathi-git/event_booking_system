import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Ticket, Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // if not on home, go home first then scroll, otherwise scroll directly
  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <div className="sticky top-0 z-50 bg-[#1a1330] px-5 md:px-10 py-4 flex items-center justify-between">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <Ticket className="text-[#f2b544]" size={26} />
        <h1 className="text-white font-display font-bold text-xl md:text-2xl">
          Utsav<span className="text-[#f2b544]">.</span>
        </h1>
      </div>

      <ul className="hidden md:flex gap-8 text-white/80 font-medium">
        <li
          className="hover:text-[#f2b544] cursor-pointer transition-colors"
          onClick={() => navigate("/")}
        >
          Home
        </li>
        <li
          className="hover:text-[#f2b544] cursor-pointer transition-colors"
          onClick={() => scrollToSection("featured")}
        >
          Events
        </li>
        <li
          className="hover:text-[#f2b544] cursor-pointer transition-colors"
          onClick={() => navigate("/events")}
        >
          Browse All
        </li>
        <li
          className="hover:text-[#f2b544] cursor-pointer transition-colors"
          onClick={() => navigate("/my-bookings")}
        >
          My Bookings
        </li>
        <li
          className="hover:text-[#f2b544] cursor-pointer transition-colors"
          onClick={() => scrollToSection("contact")}
        >
          Contact
        </li>
      </ul>

      <Link to="/events" className="hidden md:block">
        <button className="bg-[#f2b544] hover:bg-[#e0a530] text-[#1a1330] font-semibold px-5 py-2 rounded-full transition-all duration-300 hover:scale-105">
          Find Tickets
        </button>
      </Link>

      <button
        className="md:hidden text-white"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {menuOpen && (
        <div className="md:hidden absolute top-16 right-0 w-[70%] bg-[#241b3f] flex flex-col gap-5 px-6 py-6 rounded-bl-2xl border-l border-b border-[#3a2f5c] text-white/90">
          <span onClick={() => { navigate("/"); setMenuOpen(false); }} className="cursor-pointer">Home</span>
          <span onClick={() => scrollToSection("featured")} className="cursor-pointer">Events</span>
          <span onClick={() => { navigate("/events"); setMenuOpen(false); }} className="cursor-pointer">Browse All</span>
          <span onClick={() => { navigate("/my-bookings"); setMenuOpen(false); }} className="cursor-pointer">My Bookings</span>
          <span onClick={() => scrollToSection("contact")} className="cursor-pointer">Contact</span>
          <Link to="/events" onClick={() => setMenuOpen(false)}>
            <button className="bg-[#f2b544] text-[#1a1330] font-semibold px-4 py-2 rounded-full w-full">
              Find Tickets
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
