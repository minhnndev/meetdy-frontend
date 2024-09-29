import { Carousel, Nav, Space, Typography } from "@douyinfe/semi-ui";
import { SearchBar, SearchResultTabs } from "../../components";
import { useState } from "react";
import ServiceConversation from "@/api/conversationApi";
import "./style.css";

const Chat = () => {
  const { Paragraph, Text } = Typography;
  const [searchValue, setSearchValue] = useState("");
  const [individualSearch, setIndividualSearch] = useState([]);
  const [groupSearch, setGroupSearch] = useState([]);

  const handleOnSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const handleOnSearch = async () => {
    try {
      const individuals = await ServiceConversation.getListConversations({
        name: searchValue,
        type: 1,
      });
      const groups = await ServiceConversation.getListConversations({
        name: searchValue,
        type: 2,
      });
      setIndividualSearch(individuals);
      setGroupSearch(groups);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ display: "flex", flex: 1 }}>
      <div id="chat-sidebar">
        <Nav style={{ width: 300 }}>
          <Nav.Header style={{ padding: "1rem" }}>
            <SearchBar
              onChange={handleOnSearchChange}
              onSearch={handleOnSearch}
            />
          </Nav.Header>
          <SearchResultTabs
            individuals={individualSearch}
            groups={groupSearch}
          />
        </Nav>
      </div>

      <div style={{ flex: 1, background: "white" }}>
        <div style={{ textAlign: "center" }}>
          <Paragraph
            style={{ fontSize: 20, fontWeight: 500, marginTop: "10%" }}
          >
            Chào mừng đến với{" "}
            <Text strong style={{ fontSize: 20 }}>
              Meetdy
            </Text>
          </Paragraph>
          <Paragraph style={{ margin: "2rem 0" }}>
            Khám phá những tiện ích hỗ trợ làm việc và trò chuyện cùng người
            thân, bạn bè được tối ưu hoá cho máy tính của bạn.
          </Paragraph>
          <Carousel
            autoPlay={{ interval: 3000 }}
            speed={800}
            style={{ width: "100%", height: "calc(100vh - 250px)" }}
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
      </div>
    </div>
  );
};

export { Chat };
