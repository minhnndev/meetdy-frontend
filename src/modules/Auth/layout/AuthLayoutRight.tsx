import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const AuthLayoutRight = () => {
  return (
    <div id="auth-right">
      <DotLottieReact
        src="https://lottie.host/11f340bc-6da9-4053-99d0-75e24373d98b/mnhsrIh68h.json"
        loop
        autoplay
        style={{ height: "50%" }}
      />
      <div>
        <p style={{ fontWeight: "bold", fontSize: "24px" }}>
          Nền tảng toàn diện cho bạn
        </p>
        <p style={{ paddingLeft: "20%", paddingRight: "20%" }}>
          Quản lý thông tin, quy trình làm việc và nhân sự trong một nơi.
        </p>
      </div>
    </div>
  );
};

export default AuthLayoutRight;
