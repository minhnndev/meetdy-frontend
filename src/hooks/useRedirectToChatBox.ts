import { setCurrentConversation } from "@/features/Chat/slice/chatSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const useRedirectToChatBox = (id: string) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    navigate("/chat");
    dispatch(setCurrentConversation(id));
};

export default useRedirectToChatBox;
