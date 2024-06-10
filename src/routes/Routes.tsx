import reactLogo from "@/assets/react.svg";
import viteLogo from "/vite.svg";
import { useEffect } from "react";
import ServiceInfoWeb from "@/api/infoWebApi";
import axiosClient from "@/api/_httpAxios";
import LoginPage from "@/modules/Authen/pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import SplashPage from "@/modules/Splash";

const ApplicationNavigator = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashPage />} />
          <Route path="/login" element={<LoginPage message={""} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default ApplicationNavigator;
