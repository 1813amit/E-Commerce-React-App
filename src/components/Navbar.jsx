import React from "react";
import { ChevronDown, Search, User, ShoppingCart } from "lucide-react";
import logo from "../assets/Frame 1.png";

export default function Navbar({ searchTitle, setSearchTitle }) {
  return (
    <nav className="w-full bg-white  shadow px-4 py-3 flex items-center justify-around flex-wrap gap-4 md:gap-10">
      {/* Logo and Search */}
      <div className="flex items-center gap-3 flex-grow md:flex-grow-0">
  {/* Logo */}
  <img src={logo} alt="Logo" className="w-[70px] h-[50px] object-contain" />

  {/* Responsive Search Bar */}
  <div className="hidden md:flex items-center relative flex-grow md:max-w-[470px] min-w-[200px]">
    <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
    <input
      type="text"
      value={searchTitle}
      onChange={(e) => setSearchTitle(e.target.value)}
      placeholder="Search Here..."
      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
</div>


      {/* Desktop Right Menu */}
      <div className="hidden md:flex items-center space-x-6 text-gray-700 text-sm font-medium">
        <div className="flex items-center cursor-pointer">
          <span>Zoffi</span>
          <ChevronDown className="w-4 h-4 ml-1" />
        </div>
        <span className="cursor-pointer">Become a Seller</span>
        <div className="flex items-center cursor-pointer">
          <span>More</span>
          <ChevronDown className="w-4 h-4 ml-1" />
        </div>
        <div className="cursor-pointer">Cart</div>
      </div>

      {/* Mobile Icons */}
      <div className="flex md:hidden items-center space-x-4 text-[#A2A4A9]">
        <Search className="w-5 h-5" />
        <User className="w-5 h-5" />
        <ShoppingCart className="w-5 h-5" />
      </div>
    </nav>
  );
}
