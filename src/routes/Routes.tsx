import reactLogo from "@/assets/react.svg";
import viteLogo from "/vite.svg";
import { useEffect } from "react";
import ServiceInfoWeb from "@/api/infoWebApi";
import axiosClient from "@/api/_httpAxios";
import LoginPage from "@/modules/Authen/pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import SplashPage from "@/modules/Splash";
import Authen from "@/modules/Authen";

const ApplicationNavigator = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashPage/>} />
          <Route path="/auth/*" element={<Authen/>} />
          <Route path="/home" element={<div>HomeScreen</div>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default ApplicationNavigator;
