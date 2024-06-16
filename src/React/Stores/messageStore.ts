import { create } from "zustand";

interface MessageState {
    type: string;
    client_msg_id?: string;
    username?: string;
    color?: string;
    text: string;
    is_deleted?: boolean;
}
interface MessageStore {
    messages: MessageState[];
    addMessage: (message: MessageState) => void;
    markMessagesAsDeleted: (idsToDelete: string[]) => void;
}

const useMessageStore = create<MessageStore>((set) => ({
    messages: [], // Initial state is an empty array
    addMessage: (message) =>
        set((state) => ({
            messages: [...state.messages, message],
        })),
    markMessagesAsDeleted: (idsToDelete: string[]) =>
        set((state) => ({
            messages: state.messages.map((item) => {
                return item.client_msg_id &&
                    idsToDelete.includes(item.client_msg_id)
                    ? { ...item, is_deleted: true }
                    : item;
            }),
        })),
}));

export { useMessageStore };
