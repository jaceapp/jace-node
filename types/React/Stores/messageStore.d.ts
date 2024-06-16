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
declare const useMessageStore: import("zustand").UseBoundStore<import("zustand").StoreApi<MessageStore>>;
export { useMessageStore };
