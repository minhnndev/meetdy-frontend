import { useAppSelector } from "@/redux/store";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ component: Component }) => {
  const { user } = useAppSelector((state) => state.global);
  const location = useLocation();

  if (user && !user.isAdmin) {
    return <Component />;
  } else {
    return <Navigate to="/account/login" state={{ from: location }} />;
  }
};

export default ProtectedRoute;
