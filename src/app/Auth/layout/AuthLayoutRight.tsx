import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useTranslation } from "react-i18next";

const AuthLayoutRight = () => {
    const { t } = useTranslation();
    return (
        <div className="hidden lg:flex w-[500px] bg-bg-auth-left bg-bg-auth-gradient flex-col justify-center items-center h-screen">
            <DotLottieReact
                src="https://lottie.host/11f340bc-6da9-4053-99d0-75e24373d98b/mnhsrIh68h.json"
                loop
                autoplay
                style={{ height: "50%" }}
            />
            <div className="text-center">
                <p className="font-bold text-2xl">{t("app.auth.title")}</p>
                <p className="mt-4 px-10">{t("app.auth.description")} </p>
            </div>
        </div>
    );
};

export default AuthLayoutRight;
