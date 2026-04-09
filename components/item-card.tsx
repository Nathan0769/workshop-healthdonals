"use client";

import Image from "next/image";
import type { Item } from "@/lib/items";
import { useCartStore } from "@/store/cart-store";

type Props = {
  item: Item;
};

export function ItemCard({ item }: Props) {
  const price = (item.price / 100).toFixed(2);
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const entry = useCartStore((s) => s.items[item.id]);
  const quantity = entry?.quantity ?? 0;

  return (
    <div className="relative flex flex-col rounded-xl border bg-white p-3">
      <span className="absolute right-3 top-3 font-bold">${price}</span>
      <div className="flex items-center justify-center py-4">
        <Image
          src={item.image}
          alt={item.name}
          width={120}
          height={120}
          className="size-28 object-contain"
          unoptimized
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="truncate text-sm font-medium text-gray-600">
          {item.name}
        </span>
        {quantity === 0 ? (
          <button
            onClick={() => addItem(item)}
            className="rounded-lg bg-green-500 px-3 py-1 text-sm font-semibold text-white"
          >
            Add
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => removeItem(item.id)}
              className="flex size-6 items-center justify-center rounded-md bg-green-500 text-white font-bold"
            >
              -
            </button>
            <span className="text-sm font-semibold">{quantity}</span>
            <button
              onClick={() => addItem(item)}
              className="flex size-6 items-center justify-center rounded-md bg-green-500 text-white font-bold"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
