import "../style.css";
import React from "react";
import AuthLayoutRight from "./AuthLayoutRight";
import AuthLayoutLeft from "./AuthLayoutLeft";
import { useNavigate } from "react-router";
import { useAppSelector } from "@/redux/store";

const AuthLayout = () => {
    const navigate = useNavigate();
    const { user } = useAppSelector((state) => state.global);

    if (user) {
        if (user.isAdmin) navigate("/admin");
        else navigate("/chat");
    }

    return (
        <div id="auth-page">
            <AuthLayoutLeft />
            <AuthLayoutRight />
        </div>
    );
};

export { AuthLayout };
