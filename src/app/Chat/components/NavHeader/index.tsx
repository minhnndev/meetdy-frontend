import ConversationItem from "@/app/Chat/components/ConversationItem";
import NavAction from "@/components/layout/NavAction";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppSelector } from "@/redux/store";
import { memo } from "react";

const NavHeader = () => {
    const { conversations } = useAppSelector((state) => state.chat);

    return (
        <div className="flex flex-col divide-y divide-border h-full">
            <NavAction />
            <div className="flex flex-col flex-grow min-h-0">
                <ScrollArea className="h-full p-2">
                    <div className="space-y-2">
                        {conversations?.map((conversation) => (
                            <ConversationItem key={conversation._id} conversation={conversation} />
                        ))}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
};

export default memo(NavHeader);
