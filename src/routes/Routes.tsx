import { fetchUserProfile } from "@/redux/slice/globalSlice";
import { fetchInfoWebs } from "@/redux/slice/homeSlice";
import { useAppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import {
  AuthLayout,
  ForgotPassword,
  LoginPage,
  RegisterPage,
} from "@/modules/Auth";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Chat, ChatLayout, Friend } from "@/modules/Chat";

const AppRoutes = () => {
  const dispatch = useAppDispatch();
  const [isFetch, setIsFetch] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (token) await dispatch(fetchUserProfile());
      setIsFetch(true);
    };
    fetchProfile();
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchInfoWebs());
  }, [dispatch]);

  if (!isFetch) return null;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/chat" element={<ChatLayout />}>
            <Route path="/chat" element={<Chat />} />
            <Route path="/chat/friends" element={<Friend />} />
          </Route>
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/auth/forgot" element={<ForgotPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
