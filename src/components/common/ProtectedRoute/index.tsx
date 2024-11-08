import React from "react";
import { useAppSelector } from "@/redux/store";
import { Navigate, Outlet } from "react-router-dom";
import { isEmpty } from "lodash";

const ProtectedRoute = () => {
  const { user } = useAppSelector((state) => state.global);
  return !isEmpty(user) && !user.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" />
  );
};

export default ProtectedRoute;
