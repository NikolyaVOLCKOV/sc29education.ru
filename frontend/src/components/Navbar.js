import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="font-bold text-xl">
          My App
        </Link>
        <div>
          <Link to="/login" className="mr-4 hover:underline">
            Login
          </Link>
          <Link to="/register" className="hover:underline">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
