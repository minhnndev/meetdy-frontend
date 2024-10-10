import { Nav } from "@douyinfe/semi-ui";
import { SearchBar, SearchResultTabs } from "../../components";
import { useState } from "react";
import ServiceConversation from "@/api/conversationApi";
import "./style.css";
import { ClassifyChat, Welcome } from "./components";

const Chat = () => {
  const [individualSearch, setIndividualSearch] = useState([]);
  const [groupSearch, setGroupSearch] = useState([]);
  const [showSearchFilter, setShowSearchFilter] = useState(false);

  const handleOnSearch = async (value: string) => {
    try {
      const individuals = await ServiceConversation.getListConversations({
        name: value,
        type: 1,
      });
      const groups = await ServiceConversation.getListConversations({
        name: value,
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
              onSearch={handleOnSearch}
              setShowFilter={setShowSearchFilter}
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
