import { Outlet } from "react-router";
import "../style.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Select } from "@douyinfe/semi-ui";
import { IconLanguage } from "@douyinfe/semi-icons";

const AuthLayout = () => {
  return (
    <div id="auth-page">
      <div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="https://sf6-cdn-tos.douyinstatic.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/webcast_logo.svg"
            alt="logo"
          />
          <p>Meetdy</p>
        </div>
        <Select
          defaultValue="English"
          style={{ width: 150, marginRight: 10 }}
          insetLabel={<IconLanguage />}
        >
          <Select.Option value="vn-VI">Việt Nam</Select.Option>
          {/* <Select.Option value="en-EN">English</Select.Option> */}
        </Select>
      </div>
      <div style={{ margin: "auto" }}>
        <Outlet />
      </div>
      <div
        style={{
          width: "35%",
          backgroundColor: "#f8fafc",
          backgroundImage: "linear-gradient(160deg, #fff1eb, #ace0f9)",
        }}
      >
        <div style={{ height: "50%", marginTop: "30%" }}>
          <DotLottieReact
            src="https://lottie.host/11f340bc-6da9-4053-99d0-75e24373d98b/mnhsrIh68h.json"
            loop
            autoplay
          />
        </div>
        <div>
          <p style={{ fontWeight: "bold", fontSize: "24px" }}>
            Your one-stop work platform
          </p>
          <p
            style={{
              textAlign: "center",
              paddingLeft: "20%",
              paddingRight: "20%",
            }}
          >
            Manage information, workflows, and people, all in one place.
          </p>
        </div>
      </div>
    </div>
  );
};

export { AuthLayout };
