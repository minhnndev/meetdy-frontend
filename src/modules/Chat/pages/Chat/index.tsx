import { Nav } from "@douyinfe/semi-ui";
import { SearchBar, SearchResultTabs } from "../../components";
import { useState } from "react";
import ServiceConversation from "@/api/conversationApi";
import "./style.css";
import { ClassifyChat, Welcome } from "./components";

const Chat = () => {
  const [searchValue, setSearchValue] = useState("");
  const [individualSearch, setIndividualSearch] = useState([]);
  const [groupSearch, setGroupSearch] = useState([]);
  const [showSearchFilter, setShowSearchFilter] = useState(false);

  const handleOnSearchChange = (value: string) => {
    setSearchValue(value);
    setShowSearchFilter(value.trim().length > 0);
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
        <Nav style={{ width: 310 }}>
          <Nav.Header style={{ padding: "1rem 0 1rem 1rem" }}>
            <SearchBar
              onChange={handleOnSearchChange}
              onSearch={handleOnSearch}
            />
          </Nav.Header>
          {showSearchFilter ? (
            <SearchResultTabs
              individuals={individualSearch}
              groups={groupSearch}
            />
          ) : (
            <ClassifyChat />
          )}
        </Nav>
      </div>

      <div style={{ flex: 1, background: "white" }}>
        <Welcome />
      </div>
    </div>
  );
};

export { Chat };
