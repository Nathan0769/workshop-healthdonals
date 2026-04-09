import { create } from "zustand";

type AdminModeStore = {
  isAdminMode: boolean;
  toggleAdminMode: () => void;
};

export const useAdminModeStore = create<AdminModeStore>((set) => ({
  isAdminMode: false,
  toggleAdminMode: () => set((s) => ({ isAdminMode: !s.isAdminMode })),
}));
