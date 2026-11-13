import React, { useContext } from "react";
import { Search } from "lucide-react";
import { EventContext } from "../../context/EventContext";
import { categories } from "../../assets/assets";

const SearchFilter = () => {
  const { searchTerm, setSearchTerm, activeCategory, setActiveCategory } =
    useContext(EventContext);

  return (
    <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between px-5 md:px-10">
      <div className="relative w-full md:w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b6375]" size={18} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search event by name..."
          className="w-full pl-10 pr-4 py-2.5 rounded-full border border-[#e5decf] focus:outline-none focus:border-[#f2b544] text-sm"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === cat
                ? "bg-[#1a1330] text-white"
                : "bg-white border border-[#e5decf] text-[#6b6375] hover:border-[#f2b544]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchFilter;
