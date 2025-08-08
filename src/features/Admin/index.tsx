import { Button, Layout } from "antd";
import NotFoundPage from "@/components/legacy/NotFoundPage";
import { Route, Routes, useLocation } from "react-router-dom";
import { AdminFooter } from "./components/AdminFooter";
import SiderBar from "./components/SiderBar";

import StickerPage from "./pages/StickerPage";
import StickerGroupPage from "./pages/StickerGroupPage";
import UserPage from "./pages/UserPage";
import "./style.css";

const { Header, Content } = Layout;

function Admin(props) {
    const { pathname } = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");

        window.location.reload();
    };
    return (
        <div>
            <Layout style={{ minHeight: "100vh" }}>
                <SiderBar />
                <Layout className="site-layout">
                    <div style={{ backgroundColor: "white", padding: "20px" }}>
                        <Button onClick={handleLogout}>Đăng xuất</Button>
                    </div>

                    <Content
                        style={{
                            margin: "10px 10px",
                            background: "white",
                        }}
                    >
                        <Routes>
                            <Route path={`${pathname}`} element={<UserPage />} />

                            <Route path={`${pathname}/stickers`} element={<StickerGroupPage />} />
                            <Route path={`${pathname}/stickers/:id`} element={<StickerPage />} />
                            <Route element={<NotFoundPage />} />
                        </Routes>
                    </Content>

                    <AdminFooter />
                </Layout>
            </Layout>
        </div>
    );
}

export default Admin;
