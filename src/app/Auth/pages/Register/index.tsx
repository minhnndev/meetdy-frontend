import RegisterForm, { RegisterValuesProps } from "@/app/Auth/components/form/RegisterForm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { checkAndFetchUser } from "@/hooks/auth/useFetchUser";
import { useToastify } from "@/hooks/utils/useToastify";
import { setLoading } from "@/redux/slice/accountSlice";
import { useAppDispatch } from "@/redux/store";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { toast } = useToastify();

    const handleSubmit = useCallback(
        async ({ username, name, password }: RegisterValuesProps) => {
            try {
                dispatch(setLoading(true));
                const user = await checkAndFetchUser(username);
                if (user?.isActived) {
                    toast({
                        variant: "error",
                        title: t("error.accountAlreadyExist"),
                    });
                }
            } catch {
                navigate("/auth/verify", {
                    state: {
                        name,
                        username,
                        password,
                        register: true,
                    },
                });
            } finally {
                dispatch(setLoading(false));
            }
        },
        [dispatch, navigate, t, toast]
    );

    return (
        <div className="w-full sm:w-[400px]">
            <Card>
                <CardHeader>
                    <div className="text-lg font-bold text-left">{t("common.welcome")}</div>
                </CardHeader>
                <CardContent>
                    <RegisterForm onSubmit={handleSubmit} />
                    <Link
                        to="/auth/login"
                        className="text-primary text-sm hover:underline block mt-4 text-center"
                    >
                        {t("common.login")}
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
};

export default Register;
