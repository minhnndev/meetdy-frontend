import { IconHelpCircle } from "@douyinfe/semi-icons";
import { Button, Form, Tooltip } from "@douyinfe/semi-ui";

const NewPasswordForm = () => {
  return (
    <>
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
        rules={[
          {
            required: true,
            message:
              "Mật khẩu không được bỏ trống và phải giống với mật khẩu bạn đã nhập.",
          },
        ]}
        placeholder="Nhập mật khẩu của bạn"
      ></Form.Input>
      <Form.Input
        field="otpValue"
        type="text"
        label={{
          text: "Xác nhận OTP",
          extra: (
            <Tooltip content="Mã OTP được gửi đến Email bạn đã nhập">
              <IconHelpCircle style={{ color: "var(--semi-color-text-2)" }} />
            </Tooltip>
          ),
        }}
        placeholder="Mã OTP có 6 kí tự"
        rules={[
          {
            required: true,
            message: "Phải có OTP",
          },
        ]}
      />
      <Button
        block
        htmlType="submit"
        theme="solid"
        type="primary"
        className="submit-button"
      >
        Xác nhận
      </Button>
    </>
  );
};

export default NewPasswordForm;
