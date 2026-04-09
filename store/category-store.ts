import { create } from "zustand";
import { CATEGORIES } from "@/lib/categories";

type CategoryStore = {
  currentCategoryId: string;
  setCurrentCategoryId: (id: string) => void;
};

export const useCategoryStore = create<CategoryStore>((set) => ({
  currentCategoryId: CATEGORIES[0].id,
  setCurrentCategoryId: (id) => set({ currentCategoryId: id }),
}));
