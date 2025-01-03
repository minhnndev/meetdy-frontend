import { Button, Form, Toast, Typography } from "@douyinfe/semi-ui";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";

import { useAppDispatch } from "@/redux/store";
import { Link, useNavigate } from "react-router-dom";

import ServiceAuth from "@/api/loginApi";
import CapchaInput from "@/components/common/CapchaInput";
import { TLogin } from "@/models/auth.model";
import { setLoading } from "@/redux/slice/accountSlice";
import { fetchUserProfile, setLogin } from "@/redux/slice/globalSlice";

const { Text, Title } = Typography;
const LoginPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [isError, setError] = useState(false);
    const [isVerify, setVerify] = useState(false);

    const handleSubmit = async (values: TLogin) => {
        const { username, password } = values;
        console.log("CAPTCHA:", isVerify);
        try {
            if (isVerify) {
                dispatch(setLoading(true));
                const { token, refreshToken } = await ServiceAuth.login({
                    username,
                    password,
                });
                localStorage.setItem("token", token);
                localStorage.setItem("refreshToken", refreshToken);
                dispatch(setLogin(true));
                const userProfile = unwrapResult(await dispatch(fetchUserProfile()));
                if (userProfile.isAdmin) navigate("/admin");
                else navigate("/chat");
            } else {
                Toast.error({ content: "Hãy xác thực captcha" });
            }
        } catch (error) {
            console.log("🚀 error:", error);
            setError(true);
        }

        dispatch(setLoading(false));
    };

    const onChange = () => {
        setError(false);
        setVerify(true);
    };

    return (
        <div>
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
                <Form onSubmit={handleSubmit}>
                    <Form.Input
                        field="username"
                        label="Tài khoản"
                        rules={[
                            {
                                required: true,
                                message: "Tài khoản không hợp lệ",
                            },
                        ]}
                        placeholder="Nhập Email hoặc SĐT"
                    />
                    <Form.Input
                        mode="password"
                        field="password"
                        label="Mật khẩu"
                        rules={[
                            {
                                required: true,
                                message: "Mật khẩu phải từ 8-50 ký tự",
                                min: 8,
                                max: 50,
                            },
                        ]}
                        placeholder="Nhập mật khẩu của bạn"
                    />
                    <CapchaInput onChange={onChange} />
                    {isError && (
                        <Text style={{ textAlign: "center" }} type="danger">
                            Tài khoản không hợp lệ
                        </Text>
                    )}
                    <Button
                        block
                        disabled={!isVerify}
                        htmlType="submit"
                        theme="solid"
                        type="primary"
                        className="submit-button"
                    >
                        Đăng nhập
                    </Button>
                </Form>
                <Link to="/auth/forgot" style={{ fontSize: 14 }}>
                    Quên mật khẩu
                </Link>
            </div>
            <div style={{ marginTop: "20px" }}>
                <span>Bạn chưa có tài khoản?</span> <Link to="/auth/register">Đăng ký ngay</Link>
            </div>
        </div>
    );
};

export default LoginPage;
