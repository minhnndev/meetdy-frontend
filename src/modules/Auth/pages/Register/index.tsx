import ServiceAuth from "@/api/loginApi";
import { setLoading } from "@/redux/slice/accountSlice";
import { useAppDispatch } from "@/redux/store";
import { Form, Typography } from "@douyinfe/semi-ui";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import OTPForm from "./OTPForm";

const { Title } = Typography;
export const RESEND_OTP_TIME_LIMIT = 60;
const RegisterPage = () => {
  const dispatch = useAppDispatch();
  let resendOTPTimerInterval;
  const navigate = useNavigate();
  //set time counter
  const [counter, setCounter] = useState<number>(0);
  //set OTP value
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  // const openNotification = () => {
  //   const args = {
  //     message: mes ? mes : "Xác thực OTP để hoàn tất việc đăng ký",
  //   };
  //   notification.info(args);
  // };

  function success() {
    // Display a modal success
    navigate("/account/login");
    // Modal.success({
    //   content: "Đăng ký thành công !",
    //   onOk: () => {
    //     navigate("/account/login");
    //   },
    //   onCancel: () => {
    //     navigate("/account/login");
    //   },
    // });
  }

  const handleRegister = async (values) => {
    const { name, username, password, otpValue } = values;
    dispatch(setLoading(true));
    if (isSubmit) {
      handleConfirmAccount(username, otpValue);
    } else {
      await ServiceAuth.fetchUser(username)
        .then(() => {
          // message.error("Email hoặc số điện thoại đã được đăng ký");
        })
        .catch(async () => {
          try {
            await ServiceAuth.registry(name, username, password);
            setIsSubmit(true);
            // openNotification();
            setCounter(RESEND_OTP_TIME_LIMIT);
            startResendOTPTimer();
          } catch (error) {
            // message.error("Đã có lỗi xảy ra");
          }
        });
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

  const handleResendOTP = async (username) => {
    setCounter(RESEND_OTP_TIME_LIMIT);
    startResendOTPTimer();

    dispatch(setLoading(true));
    try {
      await ServiceAuth.forgot(username);
      // openNotification(`Đã gửi lại mã OTP đến  ${username}`);
    } catch (error) {
      console.log("error");
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

  const handleConfirmAccount = async (username, otp) => {
    try {
      await ServiceAuth.confirmAccount(username, otp);
      success();
    } catch (error) {
      console.log("OTP không hợp lệ");
    }
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
      <Form initValues={{}} onSubmit={(values) => handleRegister(values)}>
        {({ formState, values }) => {
          return (
            <>
              {isSubmit ? (
                <OTPForm
                  formState={formState}
                  counter={counter}
                  handleResendOTP={handleResendOTP}
                />
              ) : (
                <RegisterForm values={values} />
              )}
            </>
          );
        }}
      </Form>
      <Link to="/auth/login" style={{ fontSize: 14 }}>
        Đăng nhập
      </Link>
    </div>
  );
};

export { RegisterPage };
