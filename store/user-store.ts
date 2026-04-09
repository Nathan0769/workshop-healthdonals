import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserStore = {
  userName: string | null;
  isAdmin: boolean;
  setUserName: (name: string) => void;
  logout: () => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userName: null,
      isAdmin: false,
      setUserName: (name) =>
        set({ userName: name, isAdmin: name === "admin" }),
      logout: () => set({ userName: null, isAdmin: false }),
    }),
    {
      name: "user-storage",
    }
  )
);
