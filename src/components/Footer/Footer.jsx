import React from "react";
import { Ticket, AtSign, PlayCircle, Globe } from "lucide-react";

const Footer = () => {
  return (
    <div id="contact" className="bg-[#1a1330] text-white/70 px-5 md:px-10 pt-14 pb-6 mt-10">
      <div className="flex flex-col md:flex-row justify-between gap-10 pb-10 border-b border-white/10">
        <div className="max-w-sm">
          <div className="flex items-center gap-2 mb-4">
            <Ticket className="text-[#f2b544]" size={24} />
            <h2 className="text-white font-display font-bold text-xl">
              Utsav<span className="text-[#f2b544]">.</span>
            </h2>
          </div>
          <p className="text-sm leading-relaxed">
            All the concerts, workshops and festivals happening in and around
            Bareilly - in one place. Find your next event and book a ticket
            in under 2 minutes.
          </p>
          <div className="flex gap-4 mt-5">
            <AtSign className="hover:text-[#f2b544] cursor-pointer transition-colors" size={20} />
            <PlayCircle className="hover:text-[#f2b544] cursor-pointer transition-colors" size={20} />
            <Globe className="hover:text-[#f2b544] cursor-pointer transition-colors" size={20} />
          </div>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li className="hover:text-[#f2b544] cursor-pointer">Home</li>
            <li className="hover:text-[#f2b544] cursor-pointer">Browse Events</li>
            <li className="hover:text-[#f2b544] cursor-pointer">Categories</li>
            <li className="hover:text-[#f2b544] cursor-pointer">FAQs</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Get in touch</h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li>+91 98765 43210</li>
            <li>support@utsavevents.in</li>
            <li>Bareilly, Uttar Pradesh</li>
          </ul>
        </div>
      </div>

      <p className="text-center text-xs pt-6">
        © 2026 Utsav Events. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
