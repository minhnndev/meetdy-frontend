import EnterUsernameForm, {
    EnterUsernameValuesProps,
} from "@/app/Auth/components/form/EnterUsernameForm";
import ForgotPasswordForm, {
    ForgotPasswordValuesProps,
} from "@/app/Auth/components/form/ForgotPasswordForm";
import AlertDialogBase from "@/components/common/AlertDialogBase";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RESEND_OTP_TIME_LIMIT } from "@/constants/auth.constant";
import { useConfirmAccount } from "@/hooks/auth/useConfirmAccount";
import { useConfirmPassword } from "@/hooks/auth/useConfirmPassword";
import { checkAndFetchUser } from "@/hooks/auth/useFetchUser";
import { useForgot } from "@/hooks/auth/useForgot";
import { useToastify } from "@/hooks/utils/useToastify";
import { IUser } from "@/models/auth.model";
import { setLoading } from "@/redux/slice/accountSlice";
import { useAppDispatch } from "@/redux/store";
import { countdown } from "@/utils/countdownUtils";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { toast } = useToastify();
    const navigate = useNavigate();

    const [account, setAccount] = useState<IUser | null>(null);
    const [remainingTime, setRemainingTime] = useState(0);
    const [isCounting, setIsCounting] = useState(false);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

    const { mutateAsync: forgot } = useForgot();
    const { mutateAsync: confirmPassword } = useConfirmPassword();
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

    const handleGetOtp = useCallback(
        async ({ username }: EnterUsernameValuesProps) => {
            try {
                dispatch(setLoading(true));
                const user = await checkAndFetchUser(username);
                setAccount(user);
                await forgot(username);
                toast({
                    variant: "info",
                    title: t("common.sendOTP", {
                        username,
                    }),
                });
                startCountdown();
            } catch (error) {
                toast({
                    variant: "error",
                    title: t("error.accountDoesNotExist"),
                });
            } finally {
                dispatch(setLoading(false));
            }
        },
        [dispatch, forgot, t, toast]
    );

    const handleResendCode = useCallback(async () => {
        if (!account) return;

        try {
            dispatch(setLoading(true));
            await forgot(account.username);
            toast({
                variant: "info",
                title: t("common.resendOTP", {
                    username: account.username,
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
    }, [account, dispatch, forgot, t, toast]);

    const handleForgotPassword = useCallback(
        async ({ pin, password }: ForgotPasswordValuesProps) => {
            if (!account) return;
            try {
                dispatch(setLoading(true));
                if (!account.isActived) {
                    await confirmAccount({ username: account.username, otp: pin });
                }
                await confirmPassword({ username: account.username, otp: pin, password });
                setOpenConfirmDialog(true);
            } catch (error) {
                toast({
                    variant: "error",
                    title: t("error.invalidOTP"),
                });
            } finally {
                dispatch(setLoading(false));
            }
        },
        [account, confirmAccount, confirmPassword, dispatch, t, toast]
    );

    return (
        <div className="w-full sm:w-[400px]">
            <Card>
                <CardHeader>
                    <div className="text-lg font-bold text-left">{t("common.forgotPassword")}</div>
                </CardHeader>
                <CardContent>
                    <TooltipProvider>
                        {account ? (
                            <ForgotPasswordForm
                                onSubmit={handleForgotPassword}
                                resendCode={handleResendCode}
                                isCounting={isCounting}
                                remainingTime={remainingTime}
                            />
                        ) : (
                            <EnterUsernameForm onSubmit={handleGetOtp} />
                        )}
                    </TooltipProvider>
                    <Link
                        to="/auth/login"
                        className="text-primary text-sm hover:underline block mt-4 text-center"
                    >
                        {t("common.login")}
                    </Link>
                </CardContent>
            </Card>
            <div className="mt-6 text-sm text-center">
                <span>{t("common.youDontHaveAccount")}</span>{" "}
                <Link to="/auth/register" className="text-primary hover:underline">
                    {t("common.registerNow")}
                </Link>
            </div>
            <AlertDialogBase
                title={t("common.success")}
                description={t("success.updateAccountSuccess")}
                onAction={() => navigate("/auth/login")}
                open={openConfirmDialog}
                onOpenChange={setOpenConfirmDialog}
            />
        </div>
    );
};
export default ForgotPassword;
