// import { message, Modal, notification } from 'antd';
import { Button, Form, Typography, Divider, Tooltip, Modal, Notification } from '@douyinfe/semi-ui';
import { IconHelpCircle } from '@douyinfe/semi-icons';

import loginApi from '@/api/loginApi';
import { setLoading } from '@/redux/slice/accountSlice';
import { registerSchema } from '@/schemas/auth.schema';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

const RESEND_OTP_TIME_LIMIT = 60;
const { Text, Title } = Typography;

interface Props {}

interface FormValues {
    name?: string;
    username?: string;
    password?: string;
    otpValue?: string;
}

const initValue = {
    name: '',
    username: '',
    password: '',
    otpValue: '',
};

const RegistryPage = (props: Props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let resendOTPTimerInterval = useRef<NodeJS.Timeout | null>(null);
    const [msgError, setError] = useState<string>('');
    const [counter, setCounter] = useState<number>(0);
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [getInitValues, setInitValues] = useState<FormValues>(initValue);

    const openNotification = (mes?: string) => {
        const args = {
            title: "",
            content: mes ? mes : 'Xác thực OTP để hoàn tất việc đăng ký',
            duration: 2,
        };
        Notification.info({ ...args });
    };

    const success = () => {
        Modal.success({
            content: 'Đăng ký thành công !',
            onOk: () => {
                navigate('/account/login');
            },
            onCancel: () => {
                navigate('/account/login');
            },
        });
    };

    useEffect(() => {
        const args = {
            title: "",
            content: msgError ? msgError : 'Xác thực OTP để hoàn tất việc đăng ký',
            duration: 2,
        };
        Notification.error({
            content: msgError,
        });
    }, [msgError]);

    const handleRegistry = async (values: FormValues) => {
        const { name, username, password, otpValue } = values;
        dispatch(setLoading(true));
        if (isSubmit) {
            handleConfirmAccount(getInitValues.username!, otpValue!);
        } else {
            await loginApi
                .fetchUser(username!)
                .then(() => {
                    setIsSubmit(true);
                    openNotification();
                    setCounter(RESEND_OTP_TIME_LIMIT);
                    startResendOTPTimer();
                })
                .catch(async () => {
                    try {
                        await loginApi.registry(name!, username!, password!);
                        setIsSubmit(true);
                        openNotification();
                        setCounter(RESEND_OTP_TIME_LIMIT);
                        startResendOTPTimer();
                    } catch (error) {

                        // message.error('Đã có lỗi xảy ra');
                    }
                });
        }

        dispatch(setLoading(false));
    };

    const startResendOTPTimer = () => {
        if (resendOTPTimerInterval.current) {
            clearInterval(resendOTPTimerInterval.current);
        }
        resendOTPTimerInterval.current = setInterval(() => {
            setCounter((prevCounter) => {
                if (prevCounter <= 0) {
                    clearInterval(resendOTPTimerInterval.current!);
                    return 0;
                }
                return prevCounter - 1;
            });
        }, 1000);
    };

    const handleResendOTP = async (username: string) => {
        setCounter(RESEND_OTP_TIME_LIMIT);
        startResendOTPTimer();

        dispatch(setLoading(true));
        try {
            await loginApi.forgot(username);
            openNotification(`Đã gửi lại mã OTP đến  ${username}`);
        } catch (error) {}
        dispatch(setLoading(false));
    };

    useEffect(() => {
        startResendOTPTimer();
        return () => {
            if (resendOTPTimerInterval.current) {
                clearInterval(resendOTPTimerInterval.current);
            }
        };
    }, [counter]);

    const handleConfirmAccount = async (username: string, otp: string) => {
        try {
            await loginApi.confirmAccount(username, otp);
            success();
        } catch (error) {
            // message.error('OTP không hợp lệ');
        }
    };

    return (
        <div className="account-common-page">
            <div className="account-wrapper">
                <div className="account-right">
                    <Title heading={2} style={{ textAlign: 'center', fontWeight: 'bold' }}>
                        Đăng ký
                    </Title>
                    <Divider margin={12} />
                    <div className="form-account">
                        <Form
                            initValues={registerSchema}
                            onSubmit={(values) => handleRegistry(values)}
                            style={{ width: 400 }}
                        >
                            {({ formState, values }) => {
                                return (
                                    <>
                                        {isSubmit ? (
                                            <>
                                                <Form.Input
                                                    field="otpValue"
                                                    type="text"
                                                    label={{
                                                        text: 'Xác nhận OTP',
                                                        extra: (
                                                            <Tooltip content="Mã OTP được gữi đến Email bạn đã đăng ký">
                                                                <IconHelpCircle
                                                                    style={{
                                                                        color: 'var(--semi-color-text-2)',
                                                                    }}
                                                                />
                                                            </Tooltip>
                                                        ),
                                                    }}
                                                    placeholder="Mã OTP có 6 kí tự"
                                                    rules={[
                                                        {
                                                            required: true,
                                                        },
                                                    ]}
                                                    style={{ width: '100%' }}
                                                />

                                                <Button
                                                    onClick={() =>
                                                        handleResendOTP(formState.values.username!)
                                                    }
                                                    theme="solid"
                                                    type="primary"
                                                    block
                                                    disabled={counter > 0}
                                                    className={counter > 0 ? '' : 'bg-blue-600'}
                                                >
                                                    Gửi lại OTP{' '}
                                                    {`${counter > 0 ? `sau ${counter}` : ''}`}
                                                </Button>
                                                <Button
                                                    block
                                                    htmlType="submit"
                                                    theme="solid"
                                                    type="primary"
                                                    disabled={!formState.values.otpValue}
                                                    className={formState.values.otpValue ? 'bg-blue-600' : ''}
                                                    style={{ marginTop: 12 }}
                                                >
                                                    Xác nhận
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <Form.Input
                                                    field="name"
                                                    label="Tên"
                                                    style={{ width: '100%' }}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Tên không được bỏ trống.',
                                                        },
                                                    ]}
                                                    placeholder="Tên của bạn, VD: Nguyễn Văn A"
                                                />
                                                <Form.Input
                                                    field="username"
                                                    label="Tài khoản"
                                                    style={{ width: '100%' }}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                'Tài khoản không được bỏ trống.',
                                                        },
                                                    ]}
                                                    placeholder="Nhập Email hoặc SĐT"
                                                />
                                                <Form.Input
                                                    mode="password"
                                                    field="password"
                                                    label="Mật khẩu"
                                                    style={{ width: '100%' }}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                'Mật khẩu không được bỏ trống.',
                                                        },
                                                    ]}
                                                    placeholder="Nhập mật khẩu của bạn"
                                                />
                                                <Form.Input
                                                    mode="password"
                                                    field="passwordconfirm"
                                                    label="Nhập lại mật khẩu"
                                                    style={{ width: '100%' }}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                'Mật khẩu không được bỏ trống và phải giống với mật khẩu bạn đã nhập.',
                                                        },
                                                    ]}
                                                    placeholder="Nhập mật khẩu của bạn"
                                                />
                                                <Form.Checkbox field="agree" noLabel>
                                                    Tôi đã đọc đồng ý với điều khoản và chính sách
                                                </Form.Checkbox>
                                                {msgError && (
                                                    <Text
                                                        style={{
                                                            textAlign: 'center',
                                                        }}
                                                        type="danger"
                                                    >
                                                        Tài khoản không hợp lệ
                                                    </Text>
                                                )}
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <Button
                                                        block
                                                        disabled={!values.agree}
                                                        htmlType="submit"
                                                        theme="solid"
                                                        type="primary"
                                                        className={values.agree ? 'bg-blue-600' : ''}
                                                    >
                                                        Đăng ký
                                                    </Button>
                                                </div>
                                            </>
                                        )}
                                    </>
                                );
                            }}
                        </Form>
                    </div>

                    <Divider margin={24} />

                    <div className="addtional-link">
                        <Link to="/">Trang chủ</Link>
                        <Link to="/auth/login">Đăng nhập</Link>
                        <Link to="/auth/forgot">Quên mật khẩu ?</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistryPage;
