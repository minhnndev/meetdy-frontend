import { FRIEND_FILTER_TITLE } from "@/constants/friend.constant";
import { TGroupConversation } from "@/models/conversation.model";
import { IconFilter, IconTreeTriangleDown } from "@douyinfe/semi-icons";
import { CardGroup, Select } from "@douyinfe/semi-ui";
import { useState } from "react";
import GroupCard from "../GroupCard";

const SubtabGroup = ({ groups }) => {
  const [filterLeft, setFilterLeft] = useState("1");
  const [filterRight, setFilterRight] = useState("1");
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Select
          defaultValue="1"
          style={{ width: 150, backgroundColor: "#F9F7F8" }}
          triggerRender={() => (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                width: 200,
              }}
            >
              <IconTreeTriangleDown />
              <p style={{ marginLeft: 8, fontSize: 14 }}>
                {FRIEND_FILTER_TITLE["L"][filterLeft]} (0)
              </p>
            </span>
          )}
          onChange={(value) => setFilterLeft(value.toString())}
        >
          <Select.Option value="1">Tất cả</Select.Option>
          <Select.Option value="2">Nhóm tôi quản lý</Select.Option>
        </Select>
        <Select
          defaultValue="1"
          style={{ width: 150, backgroundColor: "#F9F7F8" }}
          triggerRender={() => (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                width: 200,
              }}
            >
              <IconFilter />
              <p style={{ marginLeft: 8, fontSize: 14 }}>
                {FRIEND_FILTER_TITLE["R"][filterRight]}
              </p>
            </span>
          )}
          onChange={(value) => setFilterRight(value.toString())}
        >
          <Select.Option value="1">Theo tên nhóm (A-Z)</Select.Option>
          <Select.Option value="2">Theo tên nhóm (Z-A)</Select.Option>
        </Select>
      </div>

      <CardGroup>
        {groups?.map((group: TGroupConversation) => (
          <GroupCard key={group._id} group={group} />
        ))}
      </CardGroup>
    </div>
  );
};

export default SubtabGroup;
