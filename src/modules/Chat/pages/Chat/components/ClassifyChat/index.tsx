import React from "react";
import { TClassify } from "@/models/classify.model";
import { ClassifyModal } from "@/modules/Chat/components";
import { useAppSelector } from "@/redux/store";
import { IconCustomize, IconDescend2 } from "@douyinfe/semi-icons";
import {
  Button,
  Divider,
  Radio,
  RadioGroup,
  Typography,
} from "@douyinfe/semi-ui";
import { useState } from "react";
import ConversationItem from "../ConversationItem";
import "./style.css";

const ClassifyChat = () => {
  const { Text } = Typography;
  const [showClassifyModal, setShowClassifyModal] = useState(false);
  const { conversations, classifies } = useAppSelector((state) => state.chat);
  const [classifyValue, setClassifyValue] = useState("0");

  const openClassifyModal = () => setShowClassifyModal(true);

  const checkConversationInClassify = (id) => {
    const classify = classifies.find((ele) => ele._id === classifyValue) || 0;
    if (classify === 0) return true;
    const index = classify.conversationIds.findIndex((ele) => ele === id);
    return index > -1;
  };

  const filteredConversations = conversations?.filter((conversation) =>
    checkConversationInClassify(conversation._id)
  );

  return (
    <div style={{}}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 1rem 0.5rem 1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconDescend2 style={{ marginRight: 8 }} />
          <Text strong>Phân loại</Text>
        </div>
        <Button
          theme="borderless"
          type="tertiary"
          icon={<IconCustomize />}
          onClick={openClassifyModal}
        />
      </div>
      <div
        className="hide-scroll"
        style={{ height: "56px", overflow: "scroll", padding: "0 1rem" }}
      >
        <RadioGroup
          value={classifyValue}
          onChange={(event) => setClassifyValue(event.target.value)}
        >
          <Radio value={"0"}>Tất cả</Radio>
          {classifies?.map((classify: TClassify) => (
            <Radio key={classify._id} value={classify._id}>
              {classify.name}
            </Radio>
          ))}
        </RadioGroup>
      </div>
      <Divider />
      <div
        className="hide-scroll"
        style={{ height: "calc(100vh - 163px)", overflow: "scroll" }}
      >
        {filteredConversations?.map((conversation) => (
          <ConversationItem
            key={conversation._id}
            conversation={conversation}
          />
        ))}
      </div>

      <ClassifyModal
        visible={showClassifyModal}
        onCancel={() => setShowClassifyModal(false)}
        onOpen={openClassifyModal}
      />
    </div>
  );
};

export { ClassifyChat };
