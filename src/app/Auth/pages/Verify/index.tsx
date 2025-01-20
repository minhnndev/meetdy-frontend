import VerifyForm, { VerifyValuesProps } from "@/app/Auth/components/form/VerifyForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RESEND_OTP_TIME_LIMIT } from "@/constants/auth.constant";
import { useConfirmAccount } from "@/hooks/auth/useConfirmAccount";
import { useForgot } from "@/hooks/auth/useForgot";
import { useRegister } from "@/hooks/auth/useRegister";
import { useToastify } from "@/hooks/utils/useToastify";
import { TRegister } from "@/models/auth.model";
import { setLoading } from "@/redux/slice/accountSlice";
import { useAppDispatch } from "@/redux/store";
import { countdown } from "@/utils/countdownUtils";
import { get } from "lodash";
import { MoveLeft } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Verify = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { state } = useLocation();
    const { toast } = useToastify();
    const dispatch = useAppDispatch();
    const isRegister = useMemo(() => state?.register || false, [state]);
    const { name, username, password } = {
        name: get(state, "name", ""),
        username: get(state, "username", ""),
        password: get(state, "password", ""),
    };
    const hasRegistered = useRef(false);
    const [remainingTime, setRemainingTime] = useState(0);
    const [isCounting, setIsCounting] = useState(false);

    const { mutateAsync: register } = useRegister();
    const { mutateAsync: forgot } = useForgot();
    const { mutateAsync: confirmAccount } = useConfirmAccount();

    const startCountdown = () => {
        setIsCounting(true);
        setRemainingTime(RESEND_OTP_TIME_LIMIT);
        countdown(RESEND_OTP_TIME_LIMIT, (time) => {
            setRemainingTime(time);
            if (time === 0) {
                setIsCounting(false);
            }
        });
    };

    useEffect(() => {
        if (isRegister && !hasRegistered.current) {
            const registerUser = async () => {
                try {
                    const params: TRegister = {
                        name,
                        username,
                        password,
                    };
                    await register(params);
                    toast({
                        variant: "info",
                        title: t("common.verifyOTP"),
                    });
                    startCountdown();
                } catch (error) {
                    toast({
                        variant: "error",
                        title: t("error.errorOccurred"),
                    });
                }
            };

            registerUser();
            hasRegistered.current = true;
        } else {
            navigate("/auth/register");
        }
    }, [isRegister, name, navigate, password, register, state, t, toast, username]);

    const handleResendCode = useCallback(async () => {
        try {
            dispatch(setLoading(true));
            await forgot(username);
            toast({
                variant: "info",
                title: t("common.resendOTP", {
                    username,
                }),
            });
            startCountdown();
        } catch (error) {
            toast({
                variant: "error",
                title: t("error.errorOccurred"),
            });
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch, forgot, t, toast, username]);

    const handleSubmit = useCallback(
        async (values: VerifyValuesProps) => {
            try {
                dispatch(setLoading(true));
                await confirmAccount({
                    username,
                    otp: values.pin,
                });
                toast({
                    variant: "success",
                    title: t("success.verifySuccess"),
                });
                navigate("/auth/login");
            } catch (error) {
                toast({
                    variant: "error",
                    title: t("error.invalidOTP"),
                });
            } finally {
                dispatch(setLoading(false));
            }
        },
        [confirmAccount, dispatch, navigate, t, toast, username]
    );

    return (
        <div className="w-full sm:w-[400px]">
            <Button variant="link" className="gap-2" onClick={() => navigate(-1)}>
                <MoveLeft className="h-4 w-4" />
                {t("common.goBack")}
            </Button>
            <Card>
                <CardHeader>
                    <div className="text-lg font-bold text-left">{t("common.welcome")}</div>
                </CardHeader>
                <CardContent>
                    <VerifyForm
                        onSubmit={handleSubmit}
                        resendCode={handleResendCode}
                        isCounting={isCounting}
                        remainingTime={remainingTime}
                    />
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

export default Verify;
