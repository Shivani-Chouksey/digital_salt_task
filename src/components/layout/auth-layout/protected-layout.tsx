// ProtectedLayout.tsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/root-reducer";
import { Outlet } from "react-router-dom"; // To render nested routes

// AdminRoute Component to protect admin routes
const ProtectedLayout: React.FC = () => {
  const { success, loginUser } = useSelector((state: RootState) => state.loginUser); // Access login state from Redux
  const location = useLocation(); // To pass the current location for redirecting

  // Check if success is true and the user has a valid accessToken
  if (!success || !loginUser?.accessToken) {
    // If not authenticated, redirect to login page (or other pages)
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If the user is authenticated, render the child route (admin routes)
  return <Outlet />;
};

export default ProtectedLayout;
