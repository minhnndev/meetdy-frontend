import AvatarBase from "@/components/common/AvatarBase";
import { Button } from "@/components/ui/button";
import { IGroupConversation, IIndividualConversation } from "@/models/conversation.model";
import { useAppSelector } from "@/redux/store";
import { Info, Phone, Video } from "lucide-react";
import { memo, useEffect, useState } from "react";

const ChatHeader = () => {
    const [conversationDetail, setConversationDetail] = useState<
        IIndividualConversation | IGroupConversation
    >();
    const { currentConversation, conversations } = useAppSelector((state) => state.chat);

    useEffect(() => {
        if (currentConversation) {
            const conversation = conversations.find((conver) => conver._id === currentConversation);
            if (conversation) {
                setConversationDetail(conversation);
            }
        }
    }, [currentConversation, conversations]);

    return (
        <div className="flex items-center justify-between p-4 h-14 border-b sticky top-0 z-10">
            <div className="flex items-start space-x-4">
                <AvatarBase
                    src={
                        Array.isArray(conversationDetail?.avatar)
                            ? ""
                            : conversationDetail?.avatar || ""
                    }
                    placeholder={conversationDetail?.name || ""}
                    className="w-10 h-10"
                />
                <div className="flex flex-col ml-2">
                    <span className="font-semibold text-lg">
                        {conversationDetail?.name || "Chat"}
                    </span>
                </div>
            </div>
            <div className="flex items-center text-gray-500">
                <Button size="icon" variant="ghost">
                    <Phone />
                </Button>
                <Button size="icon" variant="ghost">
                    <Video />
                </Button>
                <Button size="icon" variant="ghost">
                    <Info />
                </Button>
            </div>
        </div>
    );
};
export default memo(ChatHeader);
