import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isRegistered }) => {
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-gray-800 text-white px-4 py-2 flex justify-end">
      <ul className="flex space-x-6">
        <li>
          <Link to="/register" className="hover:underline">
            Register
          </Link>
        </li>
        <li>
          <button
            className={`hover:underline ${
              !isRegistered ? "text-gray-500 cursor-not-allowed" : ""
            }`}
            onClick={() => isRegistered && navigate("/home")}
            disabled={!isRegistered}
          >
            Home
          </button>
        </li>
        <li>
          <button
            className={`hover:underline ${
              !isRegistered ? "text-gray-500 cursor-not-allowed" : ""
            }`}
            onClick={() => isRegistered && navigate("/bookmark")}
            disabled={!isRegistered}
          >
            Bookmark
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
