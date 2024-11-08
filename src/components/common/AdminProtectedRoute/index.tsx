import React from "react";
import { useAppSelector } from "@/redux/store";
import { Navigate, useLocation } from "react-router-dom";

const AdminProtectedRoute = ({ component: Component }) => {
  const location = useLocation();
  const { user } = useAppSelector((state) => state.global);

  if (user && user.isAdmin) {
    return <Component />;
  } else {
    return <Navigate to="/account/login" state={{ from: location }} />;
  }
};

export default AdminProtectedRoute;
