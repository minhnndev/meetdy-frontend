import { Form, Typography } from "@douyinfe/semi-ui";
import { Link } from "react-router-dom";
import { RESEND_OTP_TIME_LIMIT } from "../Register";
import { setLoading } from "@/redux/slice/accountSlice";
import { useEffect, useState } from "react";
import ServiceAuth from "@/api/loginApi";
import { useAppDispatch } from "@/redux/store";
import NewPasswordForm from "./NewPasswordForm";
import ResendOTPForm from "./ResendOTPForm";

const { Title } = Typography;
const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  let resendOTPTimerInterval;
  // const history = useHistory();
  //set time counter
  const [counter, setCounter] = useState<number>(0);
  //set OTP value
  const [account, setAccount] = useState(null);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  // const openNotification = (mes) => {
  //   const args = {
  //     message: `Đã gửi OTP đến ${mes}`,
  //   };
  //   notification.info(args);
  // };

  function success() {
    // Modal.success({
    //   content: "Cập nhật tài khoản thành công !",
    //   onOk: () => {
    //     history.push("/account/login");
    //   },
    //   onCancel: () => {
    //     history.push("/account/login");
    //   },
    // });
  }

  const handleForgot = async (values) => {
    dispatch(setLoading(true));
    const { username, password, otpValue } = values;

    if (isSubmit) {
      try {
        if (account.isActived) {
          await ServiceAuth.confirmPassword(username, otpValue, password);
        } else {
          await ServiceAuth.confirmAccount(username, otpValue);
          await ServiceAuth.confirmPassword(username, otpValue, password);
        }
        success();
      } catch (error) {
        // message.error("OTP không hợp lệ");
      }
    } else {
      try {
        setCounter(RESEND_OTP_TIME_LIMIT);
        startResendOTPTimer();
        const account = await ServiceAuth.fetchUser(username);
        setAccount(account);
        await ServiceAuth.forgot(username);
        // openNotification(username);
        setIsSubmit(true);
      } catch (error) {
        // message.error("Tài khoản không tồn tại");
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
      // openNotification(`Đã gửi lại mã OTP đến  ${username}`);
    } catch (error) {
      console.log("error");
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
