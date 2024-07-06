import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import direct from '@/constants/direct';
import { UserProfile, defaultAccount, fetchUserProfile } from '@/redux/slice/accountSlice';
import { ReactNode, useEffect } from 'react';
import sleep from '@/utils/sleep';

type MiddleProps = {
  path?: string;
  component: ReactNode;
}

const MiddleRoute = (props: MiddleProps) => {
    const { path, component } = props;
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const { homeEndpoint, loginEndpoint } = direct();
    const isLogged = useSelector((state: any) => state.account.isLogged) as boolean;

    useEffect(() => {
      sleep(2000).then(() => {
        isLogged ? handleDirect() : navigator(loginEndpoint);
      })
    }, [])

    const handleDirect = async () => {
      const userProfile = await fetchProfile();
      if (userProfile && !userProfile.isAdmin) {
        path ? navigator(path) : navigator(homeEndpoint);
        return;
      }

      await defaultValue();
      navigator(loginEndpoint);
    }

    const fetchProfile = async (): Promise<UserProfile> => {
        const userProfile = await dispatch(fetchUserProfile() as any) as UserProfile;
        return userProfile
    }

    const defaultValue = async () => {
      dispatch(defaultAccount());
    }

    return component
};

export default MiddleRoute;
