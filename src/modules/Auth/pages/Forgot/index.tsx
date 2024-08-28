import { Form, Modal, Notification, Typography } from "@douyinfe/semi-ui";
import { Link, useNavigate } from "react-router-dom";
import { setLoading } from "@/redux/slice/accountSlice";
import { useEffect, useState } from "react";
import ServiceAuth from "@/api/loginApi";
import { useAppDispatch } from "@/redux/store";
import NewPasswordForm from "./NewPasswordForm";
import ResendOTPForm from "./ResendOTPForm";
import { RESEND_OTP_TIME_LIMIT } from "@/constants/auth.constant";

const { Title } = Typography;
const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  let resendOTPTimerInterval;
  const navigate = useNavigate();
  //set time counter
  const [counter, setCounter] = useState<number>(0);
  //set OTP value
  const [account, setAccount] = useState(null);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const handleForgot = async (values) => {
    dispatch(setLoading(true));
    const { username, password, otpValue } = values;

    if (isSubmit) {
      try {
        if (account.isActived) {
          await ServiceAuth.confirmPassword({ username, otpValue, password });
        } else {
          Promise.all([
            ServiceAuth.confirmAccount({ username, otpValue }),
            ServiceAuth.confirmPassword({ username, otpValue, password }),
          ]);
        }
        Modal.success({
          title: "Cập nhật tài khoản thành công",
          okText: "Xong",
          hasCancel: false,
          onOk: () => navigate("/auth/login"),
        });
      } catch (error) {
        Notification.error({ title: "OTP không hợp lệ" });
      }
    } else {
      try {
        setCounter(RESEND_OTP_TIME_LIMIT);
        startResendOTPTimer();
        const account = await ServiceAuth.fetchUser(username);
        setAccount(account);
        await ServiceAuth.forgot(username);
        Notification.info({ title: `Đã gửi OTP đến ${username}` });
        setIsSubmit(true);
      } catch (error) {
        Notification.error({ title: "Tài khoản không tồn tại" });
      }
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

  const handleResendOTP = async (username) => {
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
        <Form initValues={{}} onSubmit={(values) => handleForgot(values)}>
          {({ formState }) => {
            return (
              <>
                {isSubmit ? (
                  <NewPasswordForm />
                ) : (
                  <ResendOTPForm
                    formState={formState}
                    counter={counter}
                    handleResendOTP={handleResendOTP}
                  />
                )}
              </>
            );
          }}
        </Form>
        <Link to="/auth/login" style={{ fontSize: 14 }}>
          Đăng nhập
        </Link>
      </div>
      <div style={{ marginTop: "20px" }}>
        <span>Bạn chưa có tài khoản?</span>{" "}
        <Link to="/auth/register">Đăng ký ngay</Link>
      </div>
    </>
  );
};

export default ForgotPassword;
