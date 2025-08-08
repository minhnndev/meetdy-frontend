import { Spin } from "antd";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import "./style.css";

function Home() {
    const { infoApp, isLoading, infoWebApps } = useSelector((state) => state.home);

    return (
        <Spin size="large" spinning={isLoading}>
            <div className="home_page">
                <Header data={infoApp} />
                <Footer data={infoWebApps} />
            </div>
        </Spin>
    );
}

export default Home;
