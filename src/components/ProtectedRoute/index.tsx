import { useAppSelector } from "@/redux/store";
import commonFunc from "@/utils/commonFunc";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user } = useAppSelector((state) => state.global);
  return !commonFunc.isEmpty(user) ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default ProtectedRoute;
