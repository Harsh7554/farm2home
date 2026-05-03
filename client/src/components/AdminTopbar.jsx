import React, { useState } from "react";
import { FaBell, FaSearch, FaUserCircle, FaBars } from "react-icons/fa";

const Topbar = ({ toggleSidebar }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full bg-white shadow-md px-4 py-3 flex items-center justify-between sticky top-0 z-50">
      
      {/* LEFT SECTION */}
      <div className="flex items-center gap-3">
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-xl"
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>

        <h1 className="text-lg font-semibold text-gray-700">
          Admin Panel
        </h1>
      </div>

      {/* CENTER - SEARCH */}
      <div className="hidden md:flex items-center bg-gray-100 px-3 py-2 rounded-lg w-1/3">
        <FaSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none w-full text-sm"
        />
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-4 relative">
        
        {/* Notifications */}
        <div className="relative cursor-pointer">
          <FaBell className="text-xl text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
            3
          </span>
        </div>

        {/* Profile */}
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <FaUserCircle className="text-2xl text-gray-600" />
          <span className="hidden md:block text-sm font-medium">
            Admin
          </span>
        </div>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 top-12 bg-white shadow-lg rounded-md w-40 py-2">
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
              Profile
            </button>
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
              Settings
            </button>
            <button className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100">
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;