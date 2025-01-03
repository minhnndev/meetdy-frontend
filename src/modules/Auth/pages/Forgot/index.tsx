import React from "react";
import { Modal, Notification, Toast, Typography } from "@douyinfe/semi-ui";
import { Link, useNavigate } from "react-router-dom";
import { setLoading } from "@/redux/slice/accountSlice";
import { useEffect, useState } from "react";
import ServiceAuth from "@/api/loginApi";
import { useAppDispatch } from "@/redux/store";
import NewPasswordForm from "./NewPasswordForm";
import { RESEND_OTP_TIME_LIMIT } from "@/constants/auth.constant";
import { TConfirmPassword, TUser } from "@/models/auth.model";
import GetOTPForm from "./GetOTPForm";

const { Title } = Typography;
const ForgotPassword = () => {
    const dispatch = useAppDispatch();
    let resendOTPTimerInterval;
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>("");
    //set time counter
    const [counter, setCounter] = useState<number>(0);
    //set OTP value
    const [account, setAccount] = useState<TUser | null>(null);
    const [isSubmit, setIsSubmit] = useState<boolean>(false);

    const handleForgot = async (values: TConfirmPassword) => {
        dispatch(setLoading(true));
        const { password, otp } = values;
        try {
            if (account.isActived) {
                await ServiceAuth.confirmPassword({ username, otp, password });
            } else {
                Promise.all([
                    ServiceAuth.confirmAccount({ username, otp }),
                    ServiceAuth.confirmPassword({ username, otp, password }),
                ]);
            }
            Modal.success({
                title: "Cập nhật tài khoản thành công",
                okText: "Xong",
                hasCancel: false,
                onOk: () => navigate("/auth/login"),
            });
        } catch (error) {
            Toast.error({ content: "OTP không hợp lệ" });
        }
        dispatch(setLoading(false));
    };

    const handleGetOTP = async (username: string) => {
        dispatch(setLoading(true));
        try {
            setCounter(RESEND_OTP_TIME_LIMIT);
            startResendOTPTimer();

            const account = await ServiceAuth.fetchUser(username);
            setAccount(account);

            await ServiceAuth.forgot(username);
            Notification.info({ title: `Đã gửi OTP đến ${username}` });
            setIsSubmit(true);
            setUsername(username);
        } catch (error) {
            Toast.error({ content: "Tài khoản không tồn tại" });
        }
        dispatch(setLoading(false));
    };

    //start time from 30 to '0'
    const startResendOTPTimer = () => {
        if (resendOTPTimerInterval) {
            clearInterval(resendOTPTimerInterval);
        }
        resendOTPTimerInterval = setInterval(() => {
            if (counter <= 0) {
                clearInterval(resendOTPTimerInterval);
            } else {
                setCounter(counter - 1);
            }
        }, 1000);
    };

    //useEffect khi counter thay đổi
    useEffect(() => {
        startResendOTPTimer();
        return () => {
            if (resendOTPTimerInterval) {
                clearInterval(resendOTPTimerInterval);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [counter]);

    const handleResendOTP = async (username: string) => {
        setCounter(RESEND_OTP_TIME_LIMIT);
        startResendOTPTimer();

        dispatch(setLoading(true));
        try {
            await ServiceAuth.forgot(username);
            Notification.info({ title: `Đã gửi lại mã OTP đến ${username}` });
        } catch (error) {
            Toast.error({ content: "Đã có lỗi xảy ra" });
        }
        dispatch(setLoading(false));
    };

    return (
        <>
            <div className="auth-modal">
                <Title
                    heading={5}
                    style={{
                        textAlign: "left",
                        marginBottom: "16px",
                        fontWeight: "bold",
                    }}
                >
                    Quên mật khẩu
                </Title>
                {isSubmit ? (
                    <NewPasswordForm
                        counter={counter}
                        handleResendOTP={() => handleResendOTP(username)}
                        handleForgot={handleForgot}
                    />
                ) : (
                    <GetOTPForm handleGetOTP={handleGetOTP} />
                )}
                <Link to="/auth/login" style={{ fontSize: 14 }}>
                    Đăng nhập
                </Link>
            </div>
            <div style={{ marginTop: "20px" }}>
                <span>Bạn chưa có tài khoản?</span> <Link to="/auth/register">Đăng ký ngay</Link>
            </div>
        </>
    );
};

export { ForgotPassword };
