import { Spin } from "antd";
import NotFoundPage from "@/components/legacy/NotFoundPage";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import ForgotPage from "./pages/ForgotPage";
import LoginPage from "./pages/LoginPage";
import RegistryPage from "./pages/RegistryPage";
import "./style.css";

function Account() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { isLoading } = useSelector((state) => state.account);
    const { user } = useSelector((state) => state.global);
    const { infoWebApps } = useSelector((state) => state.home);

    if (user) {
        if (user.isAdmin) navigate("/admin");
        else navigate("/chat");
    }

    return (
        <Spin spinning={isLoading}>
            <div id="account_page">
                <Routes>
                    <Route path={`${pathname}/login`} element={<LoginPage />} />
                    <Route path={`${pathname}/registry`} element={<RegistryPage />} />
                    <Route path={`${pathname}/forgot`} element={<ForgotPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </div>
        </Spin>
    );
}

export default Account;
