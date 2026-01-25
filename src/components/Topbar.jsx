// Topbar.jsx
import React from "react";
import { FaBars } from "react-icons/fa";

const Topbar = ({ onHamburgerClick }) => {
  return (
    <header className="h-16 bg-black border-b border-white/10 flex items-center justify-between md:justify-end px-4 md:px-6 sticky top-0 z-30">
      {/* Hamburger */}
      <button className="md:hidden text-white text-2xl min-h-[44px] min-w-[44px] flex items-center justify-center -ml-2" onClick={onHamburgerClick}>
        <FaBars />
      </button>

      {/* User info */}
      <div className="flex items-center gap-3 min-w-0">
        <span className="text-sm text-blue-100 truncate hidden sm:inline">Doctor Aleena</span>
        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold flex-shrink-0">
          A
        </div>
      </div>
    </header>
  );
};

export default Topbar;
