import reactLogo from "@/assets/react.svg";
import viteLogo from "/vite.svg";

const AppTestUI = () => {
  return (
    <>
      <div>
        <a href="https://meetdy.com" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Meetdy.com</h1>
      <div className="card">
        <p>
          Edit thấy đã oke rồi, giờ chỉ cần code thôi, không cần phải quan tâm
        </p>
      </div>
      <p className="read-the-docs">
        Are you ready to start coding?{" "}
        <a href="https://vitejs.dev/guide/features.html" target="_blank">
          Read the documentation
        </a>
      </p>
    </>
  );
};

export default AppTestUI;
