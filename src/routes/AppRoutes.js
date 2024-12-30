import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import BookmarkPage from "../pages/BookmarkPage";
import AdminPage from "../pages/AdminPage"; // Import halaman AdminPage
import Navbar from "../components/Navbar";
import ProtectedRoute from "../routes/ProtectedRoute";

const AppRoutes = () => {
  const isRegistered = !!localStorage.getItem("user");

  return (
    <Router>
      <Navbar isRegistered={isRegistered} />
      <div className="p-4">
        <Routes>
          {/* Rute tanpa proteksi */}
          <Route path="/register" element={<RegisterPage />} />

          {/* Rute dengan proteksi */}
          <Route
            element={<ProtectedRoute isRegistered={isRegistered} />}
          >
            <Route path="/home" element={<HomePage />} />
            <Route path="/bookmark" element={<BookmarkPage />} />
            <Route path="/admin" element={<AdminPage />} /> {/* Rute AdminPage */}
          </Route>

          {/* Redirect default */}
          <Route path="*" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRoutes;
