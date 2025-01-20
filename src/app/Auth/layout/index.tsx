import { useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import AuthLayoutLeft from "./AuthLayoutLeft";
import AuthLayoutRight from "./AuthLayoutRight";

const AuthLayout = () => {
    const navigate = useNavigate();
    const { user } = useAppSelector((state) => state.global);

    useEffect(() => {
        if (user) {
            if (user.isAdmin) navigate("/admin");
            else navigate("/chat");
        }
    }, [user, navigate]);

    return (
        <div className="flex h-screen w-screen">
            <AuthLayoutLeft />
            <AuthLayoutRight />
        </div>
    );
};

export { AuthLayout };
