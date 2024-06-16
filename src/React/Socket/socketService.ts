import { io, Socket } from "socket.io-client";

class SocketService {
    private socket: Socket | null = null;
    private onConnectCallback: (() => void) | null = null;

    connect() {
        this.socket = io(`${window.location.hostname}:3000`);

        this.socket.on("connect", () => {
            if (this.onConnectCallback) {
                this.onConnectCallback();
            }
        });
    }

    setOnConnectCallback(callback: () => void) {
        this.onConnectCallback = callback;
        // if (this.socket.connected) {
        //     callback();
        // }
    }

    onSendMessage(onMessage: (data: any) => void) {
        this.socket?.on("SendMessageEvent", onMessage);
    }

    onDeleteMessages(onDelete: (data: any) => void) {
        this.socket?.on("DeleteMessagesEvent", onDelete);
    }

    onBanUserRequest(onDelete: (data: any) => void) {
        this.socket?.on("BanUserEvent", onDelete);
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }
}

export const socketService = new SocketService();
