import React from "react";
import logo from "../assets/Logo.png";

const Navbar = () => {
  return (
    <div className="h-[10vh] w-full backdrop-blur-md bg-black/20 shadow-md fixed top-0 left-0 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 z-50">
      <div className="flex items-center gap-4 sm:gap-6">
        <img className="h-12 w-12 rounded-full shadow-md" src={logo} alt="Weather Report Logo" />
        <h1 className="text-2xl font-semibold text-white tracking-wide drop-shadow-lg">Weather Report</h1>
      </div>
    </div>
  );
};

export default Navbar;
