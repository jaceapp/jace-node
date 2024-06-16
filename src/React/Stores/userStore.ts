import { create } from "zustand";

interface UserState {
    uid: string;
    username: string;
    color: string;
    status: string;
    type: string;
    updateUser: (userUpdate: Partial<Omit<UserState, "updateUser">>) => void;
}

const useUserStore = create<UserState>((set) => ({
    uid: "",
    username: "",
    color: "",
    status: "",
    type: "",
    updateUser: (userUpdate) =>
        set((state) => ({
            ...state,
            ...userUpdate,
        })),
}));

export { useUserStore };
