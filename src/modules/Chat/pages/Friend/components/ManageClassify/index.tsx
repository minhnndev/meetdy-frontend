import ServiceClassify from "@/api/classifyApi";
import { TClassify } from "@/models/classify.model";
import { fetchListClassify } from "@/redux/slice/chat/chatSlice";
import { useAppDispatch } from "@/redux/store";
import { IconPriceTag } from "@douyinfe/semi-icons";
import { Button, Divider } from "@douyinfe/semi-ui";

const ManageClassify = ({
  classifies,
  conversationId,
  setShowClassifyModal,
}: {
  classifies: Array<TClassify>;
  conversationId: string;
  setShowClassifyModal: (value: boolean) => void;
}) => {
  const dispatch = useAppDispatch();

  const onClickTag = async (event, id: string) => {
    event.stopPropagation();
    event.preventDefault();
    await ServiceClassify.addClassifyForConversation(id, conversationId);
    dispatch(fetchListClassify());
  };

  return (
    <div style={{ padding: "4px 0", display: "flex", flexDirection: "column" }}>
      {classifies.map((classify) => (
        <Button
          key={classify._id}
          theme="borderless"
          type="tertiary"
          icon={<IconPriceTag style={{ color: classify.color.code }} />}
          onClick={(event) => onClickTag(event, classify._id)}
          style={{ alignItems: "start", justifyContent: "start" }}
        >
          {classify.name}
        </Button>
      ))}
      {classifies.length > 0 && <Divider />}
      <Button
        theme="borderless"
        type="tertiary"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setShowClassifyModal(true);
        }}
      >
        Quản lý thẻ phân loại
      </Button>
    </div>
  );
};

export default ManageClassify;
