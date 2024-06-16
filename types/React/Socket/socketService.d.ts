declare class SocketService {
    private socket;
    private onConnectCallback;
    connect(): void;
    setOnConnectCallback(callback: () => void): void;
    onSendMessage(onMessage: (data: any) => void): void;
    onDeleteMessages(onDelete: (data: any) => void): void;
    onBanUserRequest(onDelete: (data: any) => void): void;
    disconnect(): void;
}
export declare const socketService: SocketService;
export {};
