import ChatHeader from "@/app/Chat/components/ChatHeader";
import ChatInput from "@/app/Chat/components/ChatInput";
import ChatMessage from "@/app/Chat/components/ChatMessage";
import Welcome from "@/app/Chat/components/Welcome";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppSelector } from "@/redux/store";

const Chat = () => {
    const { currentConversation } = useAppSelector((state) => state.chat);
    return (
        <div>
            {currentConversation ? (
                <div className="flex flex-col h-screen">
                    <ChatHeader />
                    <ScrollArea className="flex-1 bg-chat-background">
                        <ChatMessage />
                    </ScrollArea>
                    <ChatInput />
                </div>
            ) : (
                <Welcome />
            )}
        </div>
    );
};

export default Chat;
