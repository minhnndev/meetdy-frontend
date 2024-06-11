import { useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Button, Form, Typography, Divider } from "@douyinfe/semi-ui";

import axiosClient from "@/api/_httpAxios";
import { Link } from "react-router-dom";
import { useAppDispatch } from "@/redux/store";

import { setLoading } from "@/redux/slice/accountSlice";
import ServiceAuth from "@/api/loginApi";
import { setLogin, fetchUserProfile } from "@/redux/slice/globalSlice";

import { loginSchema } from "@/schemas/auth.schema";
import lang from "@/i18n";

interface LoginFormValues {
  username: string;
  password: string;
}

const COMMON_GOOGLE_CAPTCHA = "/common/google-captcha";

const { Text, Title } = Typography;

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const { t } = lang();

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
    try {
      if (isVerify) {
        dispatch(setLoading(true));
        const response: any = await ServiceAuth.login(username, password);
        const { token, refreshToken } = response;
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
        dispatch(setLogin(true));
        dispatch(fetchUserProfile())
          .unwrap()
          .then((payload: any) => {
            const { isAdmin } = payload;
            if (isAdmin) {
              console.log("isAdmin");
            }
          });
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
    <div className="account-common-page">
      <div className="account-wrapper">
        <div className="account-right">
          <Title
            heading={2}
            style={{ textAlign: "center", fontWeight: "bold" }}
          >
            {t("login.title")}
          </Title>
          <Divider margin={12} />
          <div className="form-account">
            <Form
              initValues={loginSchema}
              onSubmit={(values) => handleSubmit(values)}
              style={{ width: 400 }}
            >
              {() => (
                <>
                  <Form.Input
                    field="username"
                    label={t("login.form.lb_username")}
                    style={{ width: "100%" }}
                    rules={[
                      {
                        required: true,
                        message: t("login.form.msg_valid_username"),
                      },
                    ]}
                    placeholder={t("login.form.phd_username")}
                  />
                  <Form.Input
                    mode="password"
                    field="password"
                    label={t("login.form.lb_password")}
                    style={{ width: "100%" }}
                    rules={[
                      {
                        required: true,
                        message: t("login.form.msg_valid_password"),
                        min: 8,
                        max: 50,
                      },
                    ]}
                    placeholder={t("login.form.phd_password")}
                  />
                  {keyGoogleCaptcha && (
                    <ReCAPTCHA
                      sitekey={keyGoogleCaptcha}
                      onChange={onChange}
                    />
                  )}
                  {isError && (
                    <Text style={{ textAlign: "center" }} type="danger">
                      {t("login.form.msg_error")}
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
                      {t("login.form.btn_login")}
                    </Button>
                  </div>
                </>
              )}
            </Form>
          </div>
          <Divider margin={24} />
          <div className="addtional-link">
            <Link to="/">{t("login.link.lb_home")}</Link>
            <Link to="/auth/forgot">{t("login.link.lb_forgot_password")}</Link>
            <Link to="/auth/registry">{t("login.link.lb_register")}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
