import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { setCurrentConversation } from "@/redux/slice/chat/chatSlice";

const useRedirectToChatBox = (idConver) => {
  const history = useHistory();
  const dispatch = useDispatch();
  history.push("/chat");
  dispatch(setCurrentConversation(idConver));
};

export default useRedirectToChatBox;
