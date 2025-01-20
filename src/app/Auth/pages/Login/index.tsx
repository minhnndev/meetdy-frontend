import LoginForm, { LoginValuesProps } from "@/app/Auth/components/form/LoginForm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useLogin } from "@/hooks/auth/useLogin";
import { useFetchProfile } from "@/hooks/me/useFetchProfile";
import { setError, setLoading } from "@/redux/slice/accountSlice";
import { setLogin, setUserProfile } from "@/redux/slice/globalSlice";
import { useAppDispatch } from "@/redux/store";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isProfileFetchEnabled, setProfileFetchEnabled] = useState(false);

    const { profile } = useFetchProfile({ enabled: isProfileFetchEnabled });
    const { mutateAsync: login } = useLogin();

    useEffect(() => {
        if (profile) {
            dispatch(setUserProfile(profile));
            if (profile.isAdmin) {
                navigate("/admin");
            } else {
                navigate("/chat");
            }
        }
    }, [profile, dispatch, navigate]);

    const handleSubmit = useCallback(
        async ({ username, password }: LoginValuesProps) => {
            dispatch(setLoading(true));
            try {
                const { token, refreshToken } = await login({ username, password });
                localStorage.setItem("token", token);
                localStorage.setItem("refreshToken", refreshToken);
                dispatch(setError(null));
                dispatch(setLogin(true));
                setProfileFetchEnabled(true);
            } catch (error) {
                dispatch(setError(error));
                dispatch(setLogin(false));
            } finally {
                dispatch(setLoading(false));
            }
        },
        [dispatch, login]
    );

    return (
        <div className="w-full sm:w-[400px]">
            <Card>
                <CardHeader>
                    <div className="text-lg font-bold text-left">{t("common.welcome")}</div>
                </CardHeader>
                <CardContent>
                    <LoginForm onSubmit={handleSubmit} />
                    <Link
                        to="/auth/forgot"
                        className="text-sm text-primary hover:underline block mt-4 text-center"
                    >
                        {t("common.forgotPassword")}
                    </Link>
                </CardContent>
            </Card>
            <div className="mt-6 text-sm text-center">
                <span>{t("common.youDontHaveAccount")}</span>{" "}
                <Link to="/auth/register" className="text-primary hover:underline">
                    {t("common.registerNow")}
                </Link>
            </div>
        </div>
    );
};

export default Login;
