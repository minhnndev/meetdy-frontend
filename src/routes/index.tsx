import { AuthLayout } from "@/app/Auth/layout";
import ForgotPassword from "@/app/Auth/pages/ForgotPassword";
import Login from "@/app/Auth/pages/Login";
import Register from "@/app/Auth/pages/Register";
import Verify from "@/app/Auth/pages/Verify";
import ChatLayout from "@/app/Chat/layout";
import Chat from "@/app/Chat/pages/Chat";
import FriendLayout from "@/app/Friend/layout";
import Friend from "@/app/Friend/pages/Friend";
import { LoadingScreen } from "@/components/common/LoadingScreen";
import MainLayout from "@/components/layout/MainLayout";
import { useFetchInfoWeb } from "@/hooks/info-web/useFetchInfoWeb";
import { useFetchProfile } from "@/hooks/me/useFetchProfile";
import { setUserProfile } from "@/redux/slice/globalSlice";
import { setInfoWebs } from "@/redux/slice/homeSlice";
import { useAppDispatch } from "@/redux/store";
import ProtectedRoute from "@/routes/ProtectedRoute";
import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const AppRoutes = () => {
    const dispatch = useAppDispatch();
    const [isProfileFetchEnabled, setProfileFetchEnabled] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loadingProgress, setLoadingProgress] = useState(0);

    const { profile, isFetched } = useFetchProfile({
        enabled: isProfileFetchEnabled,
    });
    const { infoWeb } = useFetchInfoWeb();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setProfileFetchEnabled(true);
            setIsLoading(true);
            setLoadingProgress(50);
        } else {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (profile) {
            setLoadingProgress((prev) => prev + 40);
            dispatch(setUserProfile(profile));
        }

        if (isFetched) {
            timeout = setTimeout(() => {
                setLoadingProgress(100);
                setIsLoading(false);
            }, 1000);
        }

        return () => clearTimeout(timeout);
    }, [profile, dispatch, isFetched]);

    useEffect(() => {
        if (infoWeb) {
            dispatch(setInfoWebs(infoWeb));
        }
    }, [dispatch, infoWeb]);

    if (isLoading) return <LoadingScreen progress={loadingProgress} />;
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/chat" />} />
                <Route element={<ProtectedRoute />}>
                    <Route element={<MainLayout />}>
                        <Route path="/chat" element={<ChatLayout />}>
                            <Route path="/chat" element={<Chat />} />
                        </Route>
                        <Route path="/friend" element={<FriendLayout />}>
                            <Route path="/friend" element={<Friend />} />
                        </Route>
                    </Route>
                </Route>
                <Route path="/auth" element={<AuthLayout />}>
                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/auth/register" element={<Register />} />
                    <Route path="/auth/forgot" element={<ForgotPassword />} />
                    <Route path="/auth/verify" element={<Verify />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
