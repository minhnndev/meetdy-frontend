import { Typography } from "@douyinfe/semi-ui";
import OtpInput from "react-otp-input";

const InputOTP = ({ otpValue, setOtpValue }) => {
  const { Text } = Typography;
  return (
    <div style={{ marginTop: 12, marginBottom: 12 }}>
      <div style={{ textAlign: "left", marginBottom: 6 }}>
        <Text style={{ fontSize: 14, fontWeight: 600 }}>Xác nhận OTP</Text>
      </div>
      <OtpInput
        value={otpValue}
        onChange={setOtpValue}
        numInputs={6}
        renderInput={(props) => <input {...props} />}
        inputStyle={{
          width: 48,
          height: 48,
          margin: "0 6px",
          fontSize: 30,
          borderRadius: 4,
          border: "1px solid rgba(0,0,0,0.3)",
        }}
      />
    </div>
  );
};

export default InputOTP;
