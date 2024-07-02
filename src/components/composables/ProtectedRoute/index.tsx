import { UserProfile } from '@/redux/slice/globalSlice';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import direct from '@/constants/direct';

const ProtectedRoute = ({ component: Component }) => {
    const { user } = useSelector((state: any) => state.global);
    const profile = user as UserProfile;
    const location = useLocation();
    const { splashEndpoint } = direct();

    if (profile && !profile.isAdmin) {
      return Component;
    } else {
      return <Navigate to={"/auth/login"} state={{ from: location }} />;
    }
};

export default ProtectedRoute;
