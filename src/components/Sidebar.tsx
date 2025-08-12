import React, { useState } from "react";
import { Murale } from "../models/Model";

interface SidebarProps {
  murals: Murale[];
  onFilter: (searchTerm: string) => void;
  onSelect: (murale: Murale) => void;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ murals, onFilter, onSelect, className }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onFilter(value);
  };

  const handleReset = () => {
    setSearchValue("");
    onFilter("");
  };

  return (
    <div className={`sidebar p-4 h-screen ${className}`}>

      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Cerca murale..."
          value={searchValue}
          onChange={handleInputChange}
          className="w-full p-2 pr-10 border border-gray-300 rounded h-10"
        />
        {searchValue && (
          <button
            onClick={handleReset}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Reset ricerca"
            style={{ lineHeight: 0 }}
          >
            ✕
          </button>
        )}
       <hr className="h-px my-2 bg-4red-500 border-0 bg-red-500" />
      </div>

      <div className="overflow-y-auto max-h-auto">
        <ul>
          {murals.map((murale) => (
            <li
              key={murale.id}
              onClick={() => onSelect(murale)}
              className="cursor-pointer p-2 hover:bg-gray-200 rounded"
            >
              {murale.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;