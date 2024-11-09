import React from "react";
import { Button, Form } from "@douyinfe/semi-ui";

const RegisterForm = ({ handleRegister }) => {
  return (
    <Form
      initValues={{
        name: "",
        username: "",
        password: "",
        passwordconfirm: "",
      }}
      onSubmit={(values) => handleRegister(values)}
    >
      {({ formState, values }) => (
        <>
          <Form.Input
            field="name"
            label="Tên"
            rules={[
              {
                required: true,
                message: "Tên không được bỏ trống.",
              },
            ]}
            placeholder="Tên của bạn, VD: Nguyễn Văn A"
          ></Form.Input>
          <Form.Input
            field="username"
            label="Tài khoản"
            rules={[
              {
                required: true,
                message: "Tài khoản không được bỏ trống.",
              },
            ]}
            placeholder="Nhập Email hoặc SĐT"
          ></Form.Input>
          <Form.Input
            mode="password"
            field="password"
            label="Mật khẩu"
            rules={[
              {
                required: true,
                message: "Mật khẩu không được bỏ trống.",
              },
              {
                min: 8,
                max: 50,
                message: "Mật khẩu phải từ 8-50 ký tự",
              },
            ]}
            placeholder="Nhập mật khẩu của bạn"
          ></Form.Input>
          <Form.Input
            mode="password"
            field="passwordconfirm"
            label="Nhập lại mật khẩu"
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
          <Form.Checkbox field="agree" noLabel>
            Tôi đã đọc đồng ý với điều khoản và chính sách
          </Form.Checkbox>

          <Button
            block
            disabled={!values.agree}
            htmlType="submit"
            theme="solid"
            type="primary"
            className="submit-button"
          >
            Đăng ký
          </Button>
        </>
      )}
    </Form>
  );
};

export default RegisterForm;
