
import React from "react";
import InputOTP from "@/components/InputOTP";
import { Button } from "@douyinfe/semi-ui";
import { useState } from "react";

const OTPForm = ({ counter, handleConfirm, handleResendOTP }) => {
  const [otpValue, setOtpValue] = useState<string>("");
  return (
    <>
      <InputOTP setOtpValue={setOtpValue} />
      <Button
        onClick={handleResendOTP}
        theme="solid"
        type="primary"
        block
        disabled={counter > 0}
        className="submit-button"
      >
        Gửi lại OTP {`${counter > 0 ? `sau ${counter}` : ""}`}
      </Button>
      <Button
        block
        htmlType="submit"
        theme="solid"
        type="primary"
        disabled={otpValue.length !== 6}
        onClick={() => handleConfirm(otpValue)}
        style={{ marginBottom: 12 }}
      >
        Xác nhận
      </Button>
    </>
  );
};

export default OTPForm;
