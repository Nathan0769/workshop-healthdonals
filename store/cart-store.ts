import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Item } from "@/lib/items";

type CartEntry = {
  quantity: number;
  item: Item;
};

type CartStore = {
  items: Record<string, CartEntry>;
  addItem: (item: Item) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getTotalCount: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: {},
      addItem: (item) =>
        set((state) => {
          const existing = state.items[item.id];
          return {
            items: {
              ...state.items,
              [item.id]: {
                quantity: existing ? existing.quantity + 1 : 1,
                item,
              },
            },
          };
        }),
      removeItem: (id) =>
        set((state) => {
          const existing = state.items[id];
          if (!existing) return state;
          if (existing.quantity <= 1) {
            const { [id]: _, ...rest } = state.items;
            return { items: rest };
          }
          return {
            items: {
              ...state.items,
              [id]: { ...existing, quantity: existing.quantity - 1 },
            },
          };
        }),
      clearCart: () => set({ items: {} }),
      getTotalCount: () =>
        Object.values(get().items).reduce((acc, e) => acc + e.quantity, 0),
    }),
    { name: "cart-storage" }
  )
);
