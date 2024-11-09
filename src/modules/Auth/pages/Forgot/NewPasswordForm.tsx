import React from "react";
import InputOTP from "@/components/common/InputOTP";
import { Button, Form } from "@douyinfe/semi-ui";
import { useState } from "react";

const NewPasswordForm = ({ counter, handleForgot, handleResendOTP }) => {
  const [otpValue, setOtpValue] = useState<string>("");
  return (
    <Form onSubmit={(values) => handleForgot({ ...values, otp: otpValue })}>
      {({ formState }) => (
        <>
          <InputOTP setOtpValue={setOtpValue} />
          <Form.Input
            mode="password"
            field="password"
            label="Mật khẩu mới"
            rules={[
              {
                required: true,
                message: "Mật khẩu không được bỏ trống.",
              },
            ]}
            placeholder="Nhập mật khẩu của bạn"
          ></Form.Input>
          <Form.Input
            mode="password"
            field="passwordconfirm"
            label="Nhập lại mật khẩu"
            style={{ width: "100%" }}
            trigger="blur"
            rules={[
              {
                validator: (_rule, value) =>
                  value === formState.values.password,
                message: "Mật khẩu không khớp",
              },
            ]}
            placeholder="Nhập mật khẩu của bạn"
          ></Form.Input>
          <Button
            theme="solid"
            type="primary"
            block
            disabled={counter > 0 ? true : false}
            onClick={handleResendOTP}
            className="submit-button"
          >
            Lấy mã OTP {`${counter > 0 ? `sau ${counter}` : ""}`}
          </Button>
          <Button
            block
            htmlType="submit"
            theme="solid"
            type="primary"
            style={{ marginBottom: 12 }}
            disabled={otpValue.length !== 6}
          >
            Xác nhận
          </Button>
        </>
      )}
    </Form>
  );
};

export default NewPasswordForm;
