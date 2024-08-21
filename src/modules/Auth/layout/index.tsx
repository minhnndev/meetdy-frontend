import "../style.css";
import AuthLayoutRight from "./AuthLayoutRight";
import AuthLayoutLeft from "./AuthLayoutLeft";

const AuthLayout = () => {
  return (
    <div id="auth-page">
      <AuthLayoutLeft />
      <AuthLayoutRight />
    </div>
  );
};

export { AuthLayout };
