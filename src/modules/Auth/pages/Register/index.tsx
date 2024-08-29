import ServiceAuth from "@/api/loginApi";
import { setLoading } from "@/redux/slice/accountSlice";
import { useAppDispatch } from "@/redux/store";
import { Modal, Notification, Typography } from "@douyinfe/semi-ui";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RESEND_OTP_TIME_LIMIT } from "@/constants/auth.constant";
import OTPForm from "./OTPForm";
import RegisterForm from "./RegisterForm";
import { TUser } from "@/models/auth.model";

const { Title } = Typography;
const RegisterPage = () => {
  const dispatch = useAppDispatch();
  let resendOTPTimerInterval;
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  //set time counter
  const [counter, setCounter] = useState<number>(0);
  //set OTP value
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const handleRegister = async (values) => {
    const { name, username, password } = values;
    dispatch(setLoading(true));
    await ServiceAuth.fetchUser(username)
      .then((value: TUser) => {
        if (value.isActived)
          Notification.error({
            title: "Email hoặc số điện thoại đã được đăng ký",
          });
        else {
          setIsSubmit(true);
          setUsername(username);
          Notification.info({
            title: "Xác thực OTP để hoàn tất việc đăng ký",
          });
        }
      })
      .catch(async () => {
        try {
          await ServiceAuth.register({ name, username, password });
          setIsSubmit(true);
          setUsername(username);
          Notification.info({
            title: "Xác thực OTP để hoàn tất việc đăng ký",
          });
          setCounter(RESEND_OTP_TIME_LIMIT);
          startResendOTPTimer();
        } catch (error) {
          Notification.error({ title: "Đã có lỗi xảy ra" });
        }
      });
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

  const handleResendOTP = async (username: string) => {
    setCounter(RESEND_OTP_TIME_LIMIT);
    startResendOTPTimer();

    dispatch(setLoading(true));
    try {
      await ServiceAuth.forgot(username);
      Notification.info({ title: `Đã gửi lại mã OTP đến ${username}` });
    } catch (error) {
      Notification.error({ title: "Đã có lỗi xảy ra" });
    }
    dispatch(setLoading(false));
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

  const handleConfirmAccount = async (otp: string) => {
    dispatch(setLoading(true));
    try {
      await ServiceAuth.confirmAccount({ username, otp });
      Modal.success({
        title: "Đăng ký thành công",
        okText: "Xong",
        hasCancel: false,
        onOk: () => navigate("/auth/login"),
      });
    } catch (error) {
      Notification.error({ title: "OTP không hợp lệ" });
    }
    dispatch(setLoading(false));
  };

  return (
    <div className="auth-modal">
      <Title
        heading={5}
        style={{
          textAlign: "left",
          marginBottom: "16px",
          fontWeight: "bold",
        }}
      >
        Chào mừng đến với Meetdy
      </Title>
      {isSubmit ? (
        <OTPForm
          counter={counter}
          handleConfirm={handleConfirmAccount}
          handleResendOTP={() => handleResendOTP(username)}
        />
      ) : (
        <RegisterForm handleRegister={handleRegister} />
      )}
      <Link to="/auth/login" style={{ fontSize: 14 }}>
        Đăng nhập
      </Link>
    </div>
  );
};

export { RegisterPage };
