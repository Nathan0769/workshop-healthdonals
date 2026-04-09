"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronUp, ChevronDown, Trash2, Minus } from "lucide-react";
import { useCartStore } from "@/store/cart-store";

export function CartFooter() {
  const [expanded, setExpanded] = useState(false);
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);

  const entries = Object.values(items);
  const totalCount = entries.reduce((acc, e) => acc + e.quantity, 0);
  const totalPrice = entries.reduce(
    (acc, e) => acc + (e.item.price * e.quantity) / 100,
    0
  );

  if (totalCount === 0) return null;

  return (
    <div className="fixed bottom-0 left-1/2 w-full max-w-md -translate-x-1/2 rounded-t-2xl border-t bg-white shadow-xl">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-3"
      >
        <span className="font-semibold">{totalCount} item{totalCount > 1 ? "s" : ""}</span>
        <div className="flex items-center gap-2">
          <span className="font-bold">${totalPrice.toFixed(2)}</span>
          {expanded ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
        </div>
      </button>

      {expanded && (
        <div className="flex flex-col gap-2 px-4 pb-2 max-h-64 overflow-y-auto">
          {entries.map(({ item, quantity }) => (
            <div key={item.id} className="flex items-center gap-3">
              <Image
                src={item.image}
                alt={item.name}
                width={48}
                height={48}
                className="size-12 object-contain"
                unoptimized
              />
              <div className="flex flex-1 flex-col">
                <span className="text-sm font-medium">{item.name}</span>
                <span className="text-xs text-gray-500">
                  ${((item.price * quantity) / 100).toFixed(2)}
                </span>
              </div>
              <span className="text-sm font-semibold">x{quantity}</span>
              <button
                onClick={() => removeItem(item.id)}
                className="flex size-8 items-center justify-center rounded-lg bg-red-100 text-red-500"
              >
                {quantity === 1 ? <Trash2 size={15} /> : <Minus size={15} />}
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="px-4 pb-4 pt-2">
        <Link href="/checkout" className="block w-full rounded-xl bg-green-500 py-3 text-center font-semibold text-white">
          Checkout — ${totalPrice.toFixed(2)}
        </Link>
      </div>
    </div>
  );
}
