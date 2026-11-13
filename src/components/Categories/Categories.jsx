import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Music2, GraduationCap, Users, Film, PartyPopper } from "lucide-react";
import { EventContext } from "../../context/EventContext";

const categoryData = [
  { name: "Concert", icon: Music2 },
  { name: "Workshop", icon: GraduationCap },
  { name: "Networking", icon: Users },
  { name: "Film", icon: Film },
  { name: "Festival", icon: PartyPopper },
];

const Categories = () => {
  const navigate = useNavigate();
  const { setActiveCategory } = useContext(EventContext);

  const goToCategory = (name) => {
    setActiveCategory(name);
    navigate("/events");
  };

  return (
    <div className="px-5 md:px-10 py-14">
      <h2 className="font-display font-bold text-2xl md:text-3xl text-[#221830] text-center mb-8">
        Browse by category
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
        {categoryData.map(({ name, icon: Icon }) => (
          <div
            key={name}
            onClick={() => goToCategory(name)}
            className="cursor-pointer flex flex-col items-center gap-3 bg-white border border-[#e5decf] rounded-2xl py-6 hover:border-[#f2b544] hover:-translate-y-1 transition-all duration-300"
          >
            <div className="bg-[#1a1330] text-[#f2b544] p-3 rounded-full">
              <Icon size={22} />
            </div>
            <p className="text-sm font-medium text-[#221830]">{name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
