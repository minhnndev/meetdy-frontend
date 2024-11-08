import React from "react";
import { Outlet } from "react-router";
import SelectLanguage from "@/components/SelectLanguage";
import IconImage from "@/assets/images/auth/meetdy_logo_horizon.png";

const AuthLayoutLeft = () => {
  return (
    <div id="auth-left">
      <div id="auth-header">
        <img src={IconImage} alt="logo" width={150} height={66} />
        <SelectLanguage />
      </div>
      <div id="auth-main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayoutLeft;
