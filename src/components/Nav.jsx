import React, { useContext, useState } from "react";
import { UserContext } from "./context/ContextProvider";
import { auth } from "../main";

function Nav() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    await auth.signOut();
    setUser(null); // Clear user state
    window.location.reload();
  };
  return (
    <nav className="bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand */}
        <div className="flex gap-2 items-center">
          {" "}
          <img
            className="h-8 w-8 rounded-full"
            src={
              "https://icons.iconarchive.com/icons/microsoft/fluentui-emoji-3d/512/Sun-Behind-Large-Cloud-3d-icon.png"
            }
            alt=""
          />
          <a href="#" className="text-white font-bold text-xl">
            {" "}
            Weather App{" "}
          </a>
        </div>

        {/* Navbar links */}
        <div className="hidden md:flex space-x-4">
          <a href="#" className="text-white">
            Home
          </a>
          <a href="#" className="text-white">
            About
          </a>
          <a href="#" className="text-white">
            Services
          </a>
          {/* Add more links as needed */}
        </div>

        {/* Dropdown for user profile */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <span className="absolute -inset-1.5" />
            <span className="sr-only">Open user menu</span>
            <img className="h-8 w-8 rounded-full" src={user?.photoURL} alt="" />
          </button>
          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute z-50 top-full right-0 mt-2 bg-white rounded-md shadow-lg w-[200px]">
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                {user?.displayName}
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 overflow-scroll"
              >
                {user?.email}
              </a>
              <hr />
              <button
                onClick={handleLogout}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
