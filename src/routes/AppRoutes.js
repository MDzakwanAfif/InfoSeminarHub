import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import BookmarkPage from "../pages/BookmarkPage";
import Navbar from "../components/Navbar";

const AppRoutes = () => {
  const isRegistered = !!localStorage.getItem("user");

  return (
    <Router>
      <Navbar isRegistered={isRegistered} />
      <div className="p-4">
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/home"
            element={isRegistered ? <HomePage /> : <Navigate to="/register" />}
          />
          <Route
            path="/bookmark"
            element={isRegistered ? <BookmarkPage /> : <Navigate to="/register" />}
          />
          <Route path="*" element={<Navigate to="/register" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRoutes;
