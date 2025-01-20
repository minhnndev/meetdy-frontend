import { fetchConversationByIdKey } from "@/hooks/conversation/useFetchConversationById";
import { TGetConversation } from "@/models/conversation.model";
import {
    addMessage,
    addMessageInChannel,
    updateAvatarWhenUpdateMember,
} from "@/redux/slice/chat/chatSlice";
import { setAmountNotify, setNewFriend, setNewRequestFriend } from "@/redux/slice/friendSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { closeSocket, getSocket, initSocket } from "@/utils/socketClient";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

interface UseSocketReturn {
    socket: ReturnType<typeof getSocket>;
    idNewMessage: string;
}

// TODO: might not use this hook
export function useSocket(): UseSocketReturn {
    const queryClient = useQueryClient();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.global);
    const { conversations } = useAppSelector((state) => state.chat);
    const { amountNotify } = useAppSelector((state) => state.friend);
    const socket = getSocket();

    const [idNewMessage, setIdNewMessage] = useState<string>("");
    const codeRevokeRef = useRef<string>();

    useEffect(() => {
        if (user?._id) socket.emit("join", user._id);
        return () => {
            closeSocket();
        };
    }, [socket, user]);

    useEffect(() => {
        if (conversations.length) {
            const conversationIds = conversations.map((c) => c._id);
            socket.emit("join-conversations", conversationIds);
        }
    }, [conversations, socket]);

    useEffect(() => {
        socket.on("new-message", (_: string, newMessage: any) => {
            dispatch(addMessage(newMessage));
            setIdNewMessage(newMessage._id);
        });

        socket.on(
            "new-message-of-channel",
            (conversationId: string, channelId: string, message: any) => {
                dispatch(addMessageInChannel({ conversationId, channelId, message }));
                setIdNewMessage(message._id);
            }
        );

        socket.on("update-member", async (conversationId: string) => {
            await queryClient.invalidateQueries({
                queryKey: fetchConversationByIdKey(conversationId),
            });

            const updatedConversation = queryClient.getQueryData<TGetConversation>(
                fetchConversationByIdKey(conversationId)
            );

            if (updatedConversation) {
                dispatch(
                    updateAvatarWhenUpdateMember({
                        conversationId,
                        avatar: updatedConversation.avatar,
                        totalMembers: updatedConversation.totalMembers,
                    })
                );
            }
        });

        socket.on("accept-friend", (value: any) => {
            dispatch(setNewFriend(value));
            dispatch(setAmountNotify(amountNotify + 1));
        });

        socket.on("send-friend-invite", (value: any) => {
            dispatch(setNewRequestFriend(value));
        });

        socket.on("revoke-token", ({ key }: { key: string }) => {
            if (codeRevokeRef.current !== key) {
                localStorage.removeItem("token");
                localStorage.removeItem("refreshToken");
                window.location.reload();
            }
        });

        return () => {
            socket.off();
        };
    }, [dispatch, amountNotify, socket, queryClient]);

    return { socket, idNewMessage };
}
