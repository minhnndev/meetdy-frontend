import { useAppSelector } from "@/redux/store";
import { Navigate, useLocation } from "react-router-dom";
import direct from '@/constants/direct';

const AdminProtectedRoute = ({ component: Component }) => {
  const location = useLocation();
  const { user } = useAppSelector((state) => state.global);
  const { loginEndpoint } = direct();


  if (user && user.isAdmin) {
    return <Component />;
  } else {
    return <Navigate to={loginEndpoint} state={{ from: location }} />;
  }
};

export default AdminProtectedRoute;
