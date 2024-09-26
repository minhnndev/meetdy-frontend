import { Nav } from "@douyinfe/semi-ui";
import { SearchBar, SearchResultTabs } from "../../components";
import { useState } from "react";
import ServiceConversation from "@/api/conversationApi";

const Chat = () => {
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
      <div id="friend-sidebar">
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
    </div>
  );
};

export { Chat };
