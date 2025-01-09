import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import Hamburger from "hamburger-react";
import { useAuth0 } from "@auth0/auth0-react";

const Header = ({ isBlocked }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLinkClick = (e) => {
    if (isBlocked) {
      e.preventDefault(); // Prevent navigation if blocked
    }
  };

  return (
    <header className="bg-orange-500 text-white py-4 px-6 flex flex-wrap justify-between items-center shadow-md">
      {/* Logo and Title */}
      <NavLink
        to="/home"
        className={`flex flex-col md:mb-2 sm:flex-row items-center gap-2 w-full sm:w-auto ${
          isBlocked ? "cursor-not-allowed opacity-50" : ""
        }`}
        onClick={handleLinkClick}
      >
        <img
          src="/basketball.webp"
          alt="Logo"
          className="h-8 w-12 sm:h-10 sm:w-14 md:h-10 md:w-14"
        />
        <h1 className="text-lg sm:text-xl font-bold text-center sm:text-left w-full sm:w-auto">
          Basketball League Manager
        </h1>
      </NavLink>

      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden">
        <Hamburger toggled={menuOpen} size={20} toggle={setMenuOpen} />
      </div>

      {/* Navigation Links */}
      <nav
        className={`${
          menuOpen
            ? "flex flex-col bg-orange-500 p-4 rounded-md mt-4"
            : "hidden"
        } md:flex gap-6 items-center md:static md:bg-transparent md:mt-0`}
      >
        {"/home,/standings,/teams,/players,/games"
          .split(",")
          .map((path, idx) => (
            <NavLink
              key={idx}
              to={path}
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `px-4 py-2 rounded ${
                  isBlocked ? "cursor-not-allowed opacity-50" : ""
                } ${
                  isActive
                    ? "bg-white text-orange-500 font-bold"
                    : "hover:bg-orange-600"
                }`
              }
            >
              {path === "/home"
                ? "Home"
                : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
            </NavLink>
          ))}
      </nav>

      {/* Login/Logout Button */}
      <div className="flex items-center">
        {!isAuthenticated ? (
          <button
            disabled={isBlocked}
            onClick={() => !isBlocked && loginWithRedirect()}
            className={`bg-white text-orange-500 px-4 py-2 rounded-md font-semibold hover:bg-orange-100 ${
              isBlocked ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            Login
          </button>
        ) : (
          <button
            disabled={isBlocked}
            onClick={() => !isBlocked && logout()}
            className={`bg-white text-orange-500 px-4 py-2 rounded-md font-semibold hover:bg-orange-100 ${
              isBlocked ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
