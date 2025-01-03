import React from "react";
import { Carousel, Space, Typography } from "@douyinfe/semi-ui";

const Welcome = () => {
    const { Text, Paragraph } = Typography;
    return (
        <div style={{ textAlign: "center", background: "white" }}>
            <Paragraph style={{ fontSize: 20, fontWeight: 500, marginTop: "10%" }}>
                Chào mừng đến với{" "}
                <Text strong style={{ fontSize: 20 }}>
                    Meetdy
                </Text>
            </Paragraph>
            <Paragraph style={{ margin: "2rem 0" }}>
                Khám phá những tiện ích hỗ trợ làm việc và trò chuyện cùng người thân, bạn bè được
                tối ưu hoá cho máy tính của bạn.
            </Paragraph>
            <Carousel
                autoPlay={{ interval: 3000 }}
                speed={800}
                style={{ width: "100%", height: "calc(100vh - 370px)" }}
                showIndicator={false}
                showArrow={false}
            >
                <Space vertical align="center" style={{ marginTop: "20%" }}>
                    <Paragraph style={{ marginBottom: 4 }}>Meetdy Beta-1</Paragraph>
                    <Paragraph>Open beta - Release Candidate (rc-1)</Paragraph>
                </Space>
                <Space vertical align="center" style={{ marginTop: "20%" }}>
                    <Paragraph style={{ marginBottom: 4 }}>Alpha Release</Paragraph>
                    <Paragraph>Start Demo - Release Candidate (rc-1.0.0)</Paragraph>
                </Space>
            </Carousel>
        </div>
    );
};

export { Welcome };
