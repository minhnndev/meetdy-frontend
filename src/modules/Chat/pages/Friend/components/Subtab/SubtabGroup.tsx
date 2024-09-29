import { FRIEND_FILTER_TITLE } from "@/constants/friend.constant";
import { TGroupConversation } from "@/models/conversation.model";
import { IconFilter, IconTreeTriangleDown } from "@douyinfe/semi-icons";
import { CardGroup, Select, Typography } from "@douyinfe/semi-ui";
import { useEffect, useRef, useState } from "react";
import GroupCard from "../GroupCard";
import { sortGroup } from "@/utils/groupUtils";
import { useAppSelector } from "@/redux/store";

const SubtabGroup = ({ groups }: { groups: Array<TGroupConversation> }) => {
  const [filterLeft, setFilterLeft] = useState("1");
  const [filterRight, setFilterRight] = useState("1");
  const [currentGroups, setCurrentGroups] = useState([]);
  const refFilter = useRef<Array<TGroupConversation>>();
  const { user } = useAppSelector((state) => state.global);
  const { Text } = Typography;

  useEffect(() => {
    if (groups.length > 0) {
      const temp = sortGroup(groups, 1);
      setCurrentGroups(temp);
      refFilter.current = temp;
    }
  }, [groups]);

  const onChangeFilterLeft = (value) => {
    if (groups.length > 0) {
      setFilterLeft(value.toString());
      if (value == "2") {
        const newGroups = currentGroups.filter(
          (ele) => ele.leaderId === user._id
        );
        setCurrentGroups(newGroups);
      }
      if (value == "1") {
        setCurrentGroups(sortGroup(refFilter.current, parseInt(filterRight)));
      }
    }
  };

  const onChangeFilterRight = (value) => {
    if (groups.length > 0) {
      setFilterRight(value.toString());
      let newGroups = [];
      if (value == "0") {
        newGroups = sortGroup(currentGroups, 0);
      }
      if (value === "1") {
        newGroups = sortGroup(currentGroups, 1);
      }
      setCurrentGroups(newGroups);
    }
  };

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
              <Text>
                <IconTreeTriangleDown />
              </Text>
              <p style={{ marginLeft: 8, fontSize: 14 }}>
                <Text>
                  {FRIEND_FILTER_TITLE["L"][filterLeft]} ({currentGroups.length}
                  )
                </Text>
              </p>
            </span>
          )}
          onChange={onChangeFilterLeft}
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
              <Text>
                <IconFilter />
              </Text>
              <p style={{ marginLeft: 8, fontSize: 14 }}>
                <Text>{FRIEND_FILTER_TITLE["R"][filterRight]}</Text>
              </p>
            </span>
          )}
          onChange={onChangeFilterRight}
        >
          <Select.Option value="1">Theo tên nhóm (A-Z)</Select.Option>
          <Select.Option value="0">Theo tên nhóm (Z-A)</Select.Option>
        </Select>
      </div>

      <CardGroup style={{ marginBottom: "1rem" }}>
        {currentGroups?.map((group: TGroupConversation) => (
          <GroupCard key={group._id} group={group} />
        ))}
      </CardGroup>
    </div>
  );
};

export default SubtabGroup;
