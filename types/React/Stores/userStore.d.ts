interface UserState {
    uid: string;
    username: string;
    color: string;
    status: string;
    type: string;
    updateUser: (userUpdate: Partial<Omit<UserState, "updateUser">>) => void;
}
declare const useUserStore: import("zustand").UseBoundStore<import("zustand").StoreApi<UserState>>;
export { useUserStore };
