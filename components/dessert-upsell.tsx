"use client";

import Image from "next/image";
import useSWR from "swr";
import { getItems } from "@/lib/items";
import { useCartStore } from "@/store/cart-store";

export function DessertUpsell() {
  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);

  const hasDessert = Object.values(items).some(
    (e) => e.item.category === "dessert"
  );

  const { data: desserts } = useSWR("/items/dessert", () =>
    getItems("dessert")
  );

  if (hasDessert || !desserts || desserts.length === 0) return null;

  return (
    <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-4 flex flex-col gap-3">
      <p className="font-semibold text-yellow-800">
        Envie d'un dessert ? 🍨
      </p>
      <div className="flex gap-3 overflow-x-auto pb-1">
        {desserts.map((item) => (
          <div
            key={item.id}
            className="flex min-w-28 flex-col items-center gap-1 rounded-xl border bg-white p-2"
          >
            <Image
              src={item.image}
              alt={item.name}
              width={60}
              height={60}
              className="size-14 object-contain"
              unoptimized
            />
            <span className="text-center text-xs font-medium leading-tight">
              {item.name}
            </span>
            <span className="text-xs text-gray-500">
              ${(item.price / 100).toFixed(2)}
            </span>
            <button
              onClick={() => addItem(item)}
              className="mt-1 w-full rounded-lg bg-green-500 py-1 text-xs font-semibold text-white"
            >
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
