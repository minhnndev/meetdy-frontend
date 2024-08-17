import { IconHelpCircle } from "@douyinfe/semi-icons";
import { Button, Form, Tooltip } from "@douyinfe/semi-ui";

const ResendOTPForm = ({ formState, counter, handleResendOTP }) => {
  return (
    <>
      <Form.Input
        field="username"
        label={{
          text: "Tài khoản",
          extra: (
            <Tooltip content="Mã OTP sẽ được gửi đến Email hoặc SĐT này">
              <IconHelpCircle style={{ color: "var(--semi-color-text-2)" }} />
            </Tooltip>
          ),
        }}
        style={{ width: "100%" }}
        rules={[
          {
            required: true,
            message: "Tài khoản không được bỏ trống.",
          },
        ]}
        placeholder="Nhập Email hoặc SĐT"
      ></Form.Input>
      <Button
        onClick={() => handleResendOTP(formState.values.username)}
        htmlType="submit"
        theme="solid"
        type="primary"
        block
        disabled={counter > 0 ? true : false}
        className="submit-button"
      >
        Lấy mã OTP {`${counter > 0 ? `sau ${counter}` : ""}`}
      </Button>
    </>
  );
};

export default ResendOTPForm;
