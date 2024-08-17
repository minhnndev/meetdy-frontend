import { IconHelpCircle } from "@douyinfe/semi-icons";
import { Button, Form, Tooltip } from "@douyinfe/semi-ui";

const OTPForm = ({ formState, counter, handleResendOTP }) => {
  return (
    <>
      <Form.Input
        field="otpValue"
        type="text"
        label={{
          text: "Xác nhận OTP",
          extra: (
            <Tooltip content="Mã OTP được gửi đến Email bạn đã đăng ký">
              <IconHelpCircle style={{ color: "var(--semi-color-text-2)" }} />
            </Tooltip>
          ),
        }}
        placeholder="Mã OTP có 6 kí tự"
        rules={[{ required: true }]}
      />

      <Button
        onClick={() => handleResendOTP(formState.values.username)}
        theme="solid"
        type="primary"
        block
        disabled={counter > 0}
      >
        Gửi lại OTP {`${counter > 0 ? `sau ${counter}` : ""}`}
      </Button>
      <Button
        block
        htmlType="submit"
        theme="solid"
        type="primary"
        disabled={formState.values.otpValue === undefined}
        className="submit-button"
      >
        Xác nhận
      </Button>
    </>
  );
};

export default OTPForm;
