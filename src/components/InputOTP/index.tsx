import { PinCode, Typography } from "@douyinfe/semi-ui";
import "./style.css";

const InputOTP = ({ setOtpValue }) => {
  return (
    <div style={{ marginTop: 12, marginBottom: 12 }}>
      <div style={{ textAlign: "left", marginBottom: 6 }}>
        <Typography.Text style={{ fontSize: 14, fontWeight: 600 }}>
          Xác nhận OTP
        </Typography.Text>
      </div>
      <PinCode
        style={{ display: "block" }}
        format="number"
        onComplete={(value) => setOtpValue(value)}
      />
    </div>
  );
};

export default InputOTP;
