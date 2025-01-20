import SelectLanguage from "@/components/common/SelectLanguage";
import { Outlet } from "react-router";

const AuthLayoutLeft = () => {
    return (
        <div className="flex-1 relative bg-background">
            <div className="flex justify-between items-center ml-2 mr-3">
                <img
                    src="/images/auth/meetdy_logo_horizon.png"
                    alt="logo"
                    width={150}
                    height={66}
                />
                <SelectLanguage />
            </div>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayoutLeft;
