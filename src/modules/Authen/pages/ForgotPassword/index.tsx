import { Button, Form, Typography, Divider, Tooltip, Modal, Notification } from '@douyinfe/semi-ui';
import loginApi from '@/api/loginApi';
import { setLoading } from '@/redux/slice/accountSlice';
import { forgotPasswordSchema } from '@/schemas/auth.schema';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import lang from '@/i18n';
import { IcHelper } from '@/theme/icons/MDIcons';
import direct from '@/constants/direct';

const RESEND_OTP_TIME_LIMIT = 60;
const { Text, Title } = Typography;

interface Props {}

interface ForgotFormValues {
  username: string;
  password: string;
  passwordconfirm: string;
  otpValue: string;
}

interface Account {
  isActived: boolean;
}

const ForgotPassword = (props: Props) => {
  const dispatch = useDispatch();
  let resendOTPTimerInterval: NodeJS.Timeout;
  const [isError, setError] = useState<string>('');
  const navigate = useNavigate();
  // set time counter
  const [counter, setCounter] = useState<number>(0);
  // set OTP value
  const [account, setAccount] = useState<any | null>(null);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [isSentOTP, setIsSendOTP] = useState<boolean>(false);
  const pathes = direct()
  const {t} = lang();

  const sendOTPCompleted = (username: string) => {
    setIsSubmit(true);
    openNotification(`${t("forgot_password.form_send_otp.msg_send_otp_completed")} ${username}`)    
  }

  const openNotification = (msg: string) => {
    const args = {
        content: msg,
    };
    Notification.info(args);
  }

  const success = () => {
    Modal.success({
      content: t("forgot_password.form_change_password.msg_update_completed"),
      onOk: () => {
        navigate(pathes.loginEndpoint);
      },
      onCancel: () => {
        navigate(pathes.loginEndpoint);
      },
    });
  };

  const handleForgot = async (values: ForgotFormValues) => {
    dispatch(setLoading(true));
    const { username, password, otpValue } = values;

    if (isSubmit) {
      try {
        if (account && account.isActived) {
          await loginApi.confirmPassword(username, otpValue, password);
        } else {
          await loginApi.confirmAccount(username, otpValue);
          await loginApi.confirmPassword(username, otpValue, password);
        }
        success();
      } catch (error) {
        Notification.error(
            { content: t("forgot_password.form_change_password.msg_otp_unvalid") }
        );
      }
    } else {
      try {
        setCounter(RESEND_OTP_TIME_LIMIT);
        startResendOTPTimer();
        const fetchedAccount = await loginApi.fetchUser(username);
        setAccount(fetchedAccount);
        await loginApi.forgot(username);
        sendOTPCompleted(username);
      } catch (error) {
        Notification.error(
            { content: t("forgot_password.form_send_otp.msg_username_unexist") }
        );
      }
        
    }

    dispatch(setLoading(false));
  };

  // start time from 60 to '0'
  const startResendOTPTimer = () => {
    if (resendOTPTimerInterval) {
      clearInterval(resendOTPTimerInterval);
    }
    resendOTPTimerInterval = setInterval(() => {
      if (counter <= 0) {
        clearInterval(resendOTPTimerInterval);
      } else {
        setCounter((prevCounter) => prevCounter - 1);
      }
    }, 1000);
  };

  // useEffect when counter changes
  useEffect(() => {
    startResendOTPTimer();
    return () => {
      if (resendOTPTimerInterval) {
        clearInterval(resendOTPTimerInterval);
      }
    };
  }, [counter]);

  return (
    <div className="account-common-page">
      <div className="account-wrapper">
        <div className="account-right">
          <Title heading={2} style={{ textAlign: 'center', fontWeight: 'bold' }}>
            { t("forgot_password.title") }
          </Title>
          <Divider margin={12} />
          <div className="form-account">
            <Form
              initValues={forgotPasswordSchema}
              onSubmit={(values) => handleForgot(values)}
              style={{ width: 400 }}
            > 
                {isSubmit ? (
                    <>
                        <Form.Input
                            mode="password"
                            field="password"
                            label= { t("forgot_password.form_change_password.lb_new_password") }
                            style={{ width: '100%' }}
                            rules={[
                            {
                                required: true,
                                message: t("forgot_password.form_change_password.msg_valid_new_password"),
                            },
                            ]}
                            placeholder= { t("forgot_password.form_change_password.phd_new_password")}
                        />
                        <Form.Input
                            mode="password"
                            field="passwordconfirm"
                            label= { t("forgot_password.form_change_password.lb_confirm_password") }
                            style={{ width: '100%' }}
                            rules={[
                            {
                                required: true,
                                message: t("forgot_password.form_change_password.msg_valid_confirm_password"),
                            },
                            ]}
                            placeholder= { t("forgot_password.form_change_password.phd_confirm_password")}
                        />
                        <Form.Input
                            field="otpValue"
                            type="text"
                            label={{
                            text: t("forgot_password.form_change_password.lb_confirm_otp"),
                            extra: (
                                <Tooltip content={t("forgot_password.form_change_password.msg_tooltip_username")}>
                                <IcHelper style={{ color: 'var(--semi-color-text-2)' }} />
                                </Tooltip>
                            ),
                            }}
                            placeholder={t("forgot_password.form_change_password.phd_confirm_otp")}
                            rules={[
                            {
                                required: true,
                                message: t("forgot_password.form_change_password.msg_valid_otp"),
                            },
                            ]}
                            style={{ width: '100%' }}
                        />
                        <Button block htmlType="submit" theme="solid" type="primary">
                            {t("forgot_password.form_change_password.btn_send")}
                        </Button>
                    </>
                ) : (
                    <>
                    <Form.Input
                        field="username"
                        label={{
                        text: t("forgot_password.form_send_otp.lb_username"),
                        extra: (
                            <Tooltip content={t("forgot_password.form_send_otp.msg_tooltip_username")}>
                            <IcHelper style={{ color: 'var(--semi-color-text-2)' }} />
                            </Tooltip>
                        ),
                        }}
                        style={{ width: '100%' }}
                        rules={[
                        {
                            required: true,
                            message: t("forgot_password.form_send_otp.msg_valid_username"),
                        },
                        ]}
                        placeholder={t("forgot_password.form_send_otp.phd_username")}
                    />

                    {isError ? (
                        <Text style={{ textAlign: 'center' }} type="danger">
                        {t("forgot_password.form_send_otp.err_username")}
                        </Text>
                    ) : (
                        ''
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Button
                        htmlType="submit"
                        theme="solid"
                        type="primary"
                        block
                        disabled={counter > 0}
                        >
                        {t("forgot_password.form_send_otp.btn_send_otp") + ` ${counter > 0 ? `sau ${counter}` : ''}`}
                        </Button>
                    </div>
                    </>
                )}
            </Form>
          </div>

          <Divider margin={24} />

          <div className="addtional-link">
            <Link to={pathes.defaultEndpoint}>{t("forgot_password.link.lb_home")}</Link>
            <Link to={pathes.loginEndpoint}>{t("forgot_password.link.lb_login")}</Link>
            <Link to={pathes.forgotEndpoint}>{t("forgot_password.link.lb_register")}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
