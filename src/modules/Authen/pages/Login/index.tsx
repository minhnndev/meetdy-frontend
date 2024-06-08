import React, { useState, useEffect } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import ReCAPTCHA from "react-google-recaptcha";
import { Button, Form, Typography, Divider } from "@douyinfe/semi-ui";

import axiosClient from "@/api/_httpAxios";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux/store";

import { setLoading } from "@/redux/slice/accountSlice";
import ServiceAuth from "@/api/loginApi";
import { setLogin, fetchUserProfile } from "@/redux/slice/globalSlice";

interface Props {
  message: any;
}

interface LoginFormValues {
  username: string;
  password: string;
}

const COMMON_GOOGLE_CAPTCHA = "/common/google-captcha";

const { Text, Title } = Typography;

const LoginPage: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isError, setError] = useState(false);
  const [isVerify, setVerify] = useState(false);
  const [keyGoogleCaptcha, setKeyGoogleCaptcha] = useState<string | null>(null);

  useEffect(() => {
    axiosClient
      .get(COMMON_GOOGLE_CAPTCHA)
      .then((res: any) => setKeyGoogleCaptcha(res.KEY_GOOGLE_CAPTCHA));
  }, []);

  const handleSubmit = async (values: LoginFormValues) => {
    const { username, password } = values;
    console.log("CAPTCHA:", isVerify);
    try {
      if (isVerify) {
        dispatch(setLoading(true));
        const response: any = await ServiceAuth.login(username, password);
        const { token, refreshToken } = response;
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
        dispatch(setLogin(true));
        const resultAction = await dispatch();
        const { isAdmin } = unwrapResult(resultAction);
        navigate("/admin");
      } else {
        props.message.error("Hãy xác thực captcha", 5);
      }
    } catch (error) {
      console.log("🚀 error:", error);
      setError(true);
    }

    dispatch(setLoading(false));
  };

  const onChange = (value: string | null) => {
    console.log("🚀 ~ onChange ~ value:", value);
    setError(false);
    setVerify(true);
  };

  return (
    <div className="account-common-page">
      <div className="account-wrapper">
        <div className="account-right">
          <Title
            heading={2}
            style={{ textAlign: "center", fontWeight: "bold" }}
          >
            Đăng Nhập
          </Title>
          <Divider margin={12} />
          <div className="form-account">
            <Form onSubmit={handleSubmit} style={{ width: 400 }}>
              {() => (
                <>
                  <Form.Input
                    field="username"
                    label="Tài khoản"
                    style={{ width: "100%" }}
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
                    style={{ width: "100%" }}
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
                  {keyGoogleCaptcha && (
                    <ReCAPTCHA sitekey={keyGoogleCaptcha} onChange={onChange} />
                  )}
                  {isError && (
                    <Text style={{ textAlign: "center" }} type="danger">
                      Tài khoản không hợp lệ
                    </Text>
                  )}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      block
                      disabled={!isVerify}
                      htmlType="submit"
                      theme="solid"
                      type="primary"
                      className={!isVerify ? "" : "bg-blue-600"}
                      style={{ marginTop: 12 }}
                    >
                      Đăng nhập
                    </Button>
                  </div>
                </>
              )}
            </Form>
          </div>
          <Divider margin={24} />
          <div className="addtional-link">
            <Link to="/">Trang chủ</Link>
            <Link to="/account/forgot">Quên mật khẩu</Link>
            <Link to="/account/registry">Bạn chưa có tài khoản ?</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
