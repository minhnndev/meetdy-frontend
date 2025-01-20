import { useAppSelector } from "@/redux/store";
import { isEmpty } from "lodash";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const { user } = useAppSelector((state) => state.global);
    return !isEmpty(user) && !user.isAdmin ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default ProtectedRoute;
