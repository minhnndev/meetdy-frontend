import { Result } from "antd";
import "./style.css";

function NotFoundPage() {
    return (
        <div id="not-found-page">
            <div className="main">
                <Result status="404" title="404" subTitle="Trang không khả dụng" />
            </div>
        </div>
    );
}

export default NotFoundPage;
