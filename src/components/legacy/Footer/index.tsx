import { Divider, Typography } from "antd";

const { Text } = Typography;

function Footer() {
    return (
        <div style={{ textAlign: "center" }}>
            <Divider></Divider>
            <Text strong style={{ fontSize: "20px" }}>
                Footer
            </Text>
        </div>
    );
}

export default Footer;
