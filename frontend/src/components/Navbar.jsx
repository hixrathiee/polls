import React from "react";
import { NavLink } from "react-router-dom";
import { FaPoll, FaHome, FaPlusCircle, FaChartPie } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white py-3 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
       
        <h1 className="text-2xl font-bold tracking-wide flex items-center gap-2">
          <FaPoll className="text-blue-400" size={26} />
          <span className="hidden sm:inline">Poll App</span>
        </h1>

        <div className="flex space-x-6 text-lg font-medium gap-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-2 transition duration-200 ${
                isActive
                  ? "text-blue-400 font-semibold "
                  : "hover:text-blue-400"
              }`
            }
          >
            <FaHome size={18} /> Home
          </NavLink>

          <NavLink
            to="/create"
            className={({ isActive }) =>
              `flex items-center gap-2 transition duration-200 ${
                isActive
                  ? "text-blue-400 font-semibold "
                  : "hover:text-blue-400"
              }`
            }
          >
            <FaPlusCircle size={18} /> Create Poll
          </NavLink>

          <NavLink
            to="/results"
            className={({ isActive }) =>
              `flex items-center gap-2 transition duration-200 ${
                isActive
                  ? "text-blue-400 font-semibold "
                  : "hover:text-blue-400"
              }`
            }
          >
            <FaChartPie size={18} /> Results
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
