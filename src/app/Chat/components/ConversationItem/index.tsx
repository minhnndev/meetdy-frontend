import ConversationAvatar from "@/app/Chat/components/ConversationAvatar";
import ShortMessage from "@/app/Chat/components/ShortMessage";
import { checkAndFetchChannel } from "@/hooks/channel/useFetchChannel";
import { checkAndFetchLastViewOfMembers } from "@/hooks/conversation/useFetchLastViewOfMembers";
import { checkAndFetchMemberInConversation } from "@/hooks/conversation/useFetchMemberInConversation";
import { checkAndFetchListMessages } from "@/hooks/message/useFetchListMessages";
import { cn } from "@/lib/utils";
import { IClassify } from "@/models/classify.model";
import { IGroupConversation, IIndividualConversation } from "@/models/conversation.model";
import {
    setChannels,
    setCurrentChannel,
    setLastViewOfMember,
    setMemberInConversation,
    setMessages,
    setTypeOfConversation,
} from "@/redux/slice/chat/chatSlice";
import { useAppDispatch } from "@/redux/store";

interface ConversationItemProps {
    conversation: IGroupConversation | IIndividualConversation;
}
const ConversationItem = ({ conversation }: ConversationItemProps) => {
    const { _id, name, totalMembers, lastMessage, numberUnread } = conversation;
    const dispatch = useAppDispatch();

    const onClickConversation = async () => {
        dispatch(setCurrentChannel(""));
        const lastViewOfMembers = await checkAndFetchLastViewOfMembers(_id);
        dispatch(setLastViewOfMember(lastViewOfMembers));
        const messages = await checkAndFetchListMessages({
            conversationId: _id,
            size: 10,
        });
        dispatch(
            setMessages({
                conversationId: _id,
                messages: {
                    data: messages.data,
                    page: messages.page,
                    totalPages: messages.totalPages,
                },
            })
        );

        const members = await checkAndFetchMemberInConversation(_id);
        dispatch(setMemberInConversation(members));
        dispatch(setTypeOfConversation(_id));
        const channels = await checkAndFetchChannel(_id);
        dispatch(setChannels(channels));
    };

    return (
        <>
            {lastMessage && (
                <div
                    key={_id}
                    className={cn(
                        "flex items-center justify-between px-4 py-2 hover:bg-sidebar-accent cursor-pointer rounded-xl"
                    )}
                    onClick={onClickConversation}
                >
                    <div className="flex items-center space-x-3">
                        <ConversationAvatar
                            conversation={conversation}
                            totalMembers={totalMembers}
                        />
                        <div>
                            <p
                                className={cn(
                                    "font-medium text-sm truncate",
                                    numberUnread > 0 && "font-semibold text-primary"
                                )}
                                title={name}
                            >
                                {name}
                            </p>
                            <ShortMessage
                                message={lastMessage}
                                type={conversation.type}
                                numberUnread={numberUnread}
                                classify={{} as IClassify}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <p className="text-xs text-gray-500">{lastMessage?.createdAt}</p>
                        {numberUnread > 0 && (
                            <span className="text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                                {numberUnread}
                            </span>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default ConversationItem;
