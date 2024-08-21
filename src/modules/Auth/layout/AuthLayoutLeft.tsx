import { Outlet } from "react-router";
import SelectLanguage from "@/components/SelectLanguage";
import IconImage from "../../../assets/images/auth/meetdy_logo.png";

const AuthLayoutLeft = () => {
  return (
    <div id="auth-left">
      <div id="auth-header">
        <img src={IconImage} alt="logo" width={80} height={80} />
        <SelectLanguage />
      </div>
      <div id="auth-main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayoutLeft;
