import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const ProtectedRoute = ({
  children,
  allowedRoles = [],
  useOutlet = false,
}) => {
  const isAuthenticated = localStorage.getItem("authToken");
  const userRoles = JSON.parse(localStorage.getItem("userRoles")) || [];
  //console.log(allowedRoles);
  //console.log(userRoles);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login and remember the last location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const userRolesLower = userRoles.map((role) => role.toLowerCase());

  const allowedRolesLower = allowedRoles.map((role) => role.toLowerCase());

  const isAuthorized = userRolesLower.some((userRole) =>
    allowedRolesLower.includes(userRole)
  );

  if (isAuthorized) {
    // Optionally render children or an Outlet based on useOutlet flag
    return useOutlet ? <Outlet /> : children;
  } else {
    // Redirect to a default or unauthorized access page if the user does not have an allowed role
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }
};
