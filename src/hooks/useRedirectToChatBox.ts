import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { setCurrentConversation } from "@/redux/slice/chat/chatSlice";

const useRedirectToChatBox = (idConver) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  navigate("/chat");
  dispatch(setCurrentConversation(idConver));
};

export default useRedirectToChatBox;
