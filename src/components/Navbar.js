import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isRegistered }) => {
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-gray-800 text-white px-4 py-2 flex items-center justify-between">
      {/* Bagian kiri: Logo */}
      <div className="flex items-center space-x-2">
        <img
          src="https://pbs.twimg.com/profile_images/1305467421294092291/Et-C3LcF_400x400.jpg"
          alt="Logo"
          className="h-8 w-8"
        />
        <span className="text-lg font-bold">InfoSeminarHub</span>
      </div>

      {/* Bagian kanan: Navigasi */}
      <div className="flex items-center space-x-6">
        <Link to="/register" className="hover:underline">
          Register
        </Link>
        <button
          className={`hover:underline ${
            !isRegistered ? "text-gray-500 cursor-not-allowed" : ""
          }`}
          onClick={() => isRegistered && navigate("/home")}
          disabled={!isRegistered}
        >
          Home
        </button>
        <button
          className={`hover:underline ${
            !isRegistered ? "text-gray-500 cursor-not-allowed" : ""
          }`}
          onClick={() => isRegistered && navigate("/bookmark")}
          disabled={!isRegistered}
        >
          Bookmark
        </button>
        <Link to="/admin" className="hover:underline">
          AdminPage
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
