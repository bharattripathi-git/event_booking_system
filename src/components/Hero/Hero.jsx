import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-[#1a1330] overflow-hidden px-5 md:px-10 pt-16 pb-24 md:pt-24 md:pb-32">
      {/* background glow - signature ticket-light feel */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#f2b544]/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-10 w-60 h-60 bg-[#ef5f6d]/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
        <span className="flex items-center gap-2 bg-white/5 border border-white/10 text-[#f2b544] text-xs md:text-sm px-4 py-1.5 rounded-full">
          <Sparkles size={14} /> Bareilly's own event platform
        </span>

        <h1 className="text-white font-display font-bold text-4xl md:text-6xl leading-tight">
          Find your next event, <span className="text-[#f2b544]">right here</span>
        </h1>

        <p className="text-white/60 text-base md:text-lg max-w-xl">
          Concerts, workshops, festivals and networking meetups - all in one
          place, book in just a few clicks.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <button
            onClick={() => navigate("/events")}
            className="flex items-center justify-center gap-2 bg-[#f2b544] hover:bg-[#e0a530] text-[#1a1330] font-semibold px-7 py-3 rounded-full transition-all duration-300 hover:scale-105"
          >
            Explore Events <ArrowRight size={18} />
          </button>
          <button
            onClick={() =>
              document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" })
            }
            className="border border-white/20 text-white px-7 py-3 rounded-full hover:bg-white/5 transition-all duration-300"
          >
            See what's trending
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
