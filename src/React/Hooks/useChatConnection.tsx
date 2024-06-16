
import { useEffect } from 'react';
import { socketService } from "@Socket/socketService";
import { MessageTypeEnum } from "@Enums/MessageTypeEnum";
import { useUserStore } from "@Stores/userStore";
import { useMessageStore } from "@Stores/messageStore";

interface UseChatConnectionProps {
  uid: string;
}

export const useChatConnection = ({ uid }: UseChatConnectionProps) => {
    const updateUser = useUserStore((state) => state.updateUser);
    const addMessage = useMessageStore((state) => state.addMessage);
    const markMessagesAsDeleted = useMessageStore(
        (state) => state.markMessagesAsDeleted,
    );

    useEffect(() => {
        if (uid === "") return;

        try {
            socketService.connect();

            const handleNewMessage = (data: any) => {
                addMessage({
                    type: data.type,
                    client_msg_id: data.client_msg_id,
                    username: data.username,
                    color: data.color,
                    text: data.text,
                });
            };

            const onDelete = (data: any) => {
                markMessagesAsDeleted(data.messages);
            };

            const onBan = (data: { uid: string; ban_type: string }) => {
                if (uid === data.uid) {
                    updateUser({ status: data.ban_type });
                }
            };
            // Set the onConnect callback
            socketService.setOnConnectCallback(() => {
                addMessage({
                    type: MessageTypeEnum.INFORMATION,
                    text: "Welcome to the Chat.",
                });
            });
            socketService.onSendMessage(handleNewMessage);
            socketService.onDeleteMessages(onDelete);
            socketService.onBanUserRequest(onBan);
        } catch (error) {
            console.log(error);
        }
        return () => {
            socketService.disconnect();
        };
    }, [uid]);
};
