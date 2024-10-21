import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function JoinFromLink() {
  const { conversationId } = useParams();
  const navigate = useNavigate();

  useEffect(() => navigate("/chat", { state: { conversationId } }));

  return <div>{conversationId}</div>;
}

export default JoinFromLink;
