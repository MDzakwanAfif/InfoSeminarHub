import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isRegistered }) => {
  return isRegistered ? <Outlet /> : <Navigate to="/register" />;
};

export default ProtectedRoute;
