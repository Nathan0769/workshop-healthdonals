"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Minus } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useUserStore } from "@/store/user-store";
import { DessertUpsell } from "@/components/dessert-upsell";

export default function CheckoutPage() {
  const userName = useUserStore((s) => s.userName);
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);

  useEffect(() => {
    if (!userName) router.push("/login");
  }, [userName, router]);

  const entries = Object.values(items);
  const totalPrice = entries.reduce(
    (acc, e) => acc + (e.item.price * e.quantity) / 100,
    0
  );

  return (
    <div className="flex flex-col gap-4 px-4 pb-32">
      <h1 className="text-xl font-bold">Mon panier</h1>

      {entries.length === 0 ? (
        <p className="text-center text-gray-400 mt-12">Votre panier est vide.</p>
      ) : (
        <>
          <div className="flex flex-col gap-3">
            {entries.map(({ item, quantity }) => (
              <div key={item.id} className="flex items-center gap-3 rounded-xl border p-3">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="size-16 object-contain"
                  unoptimized
                />
                <div className="flex flex-1 flex-col gap-0.5">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-sm text-gray-500">
                    ${(item.price / 100).toFixed(2)} × {quantity}
                  </span>
                  <span className="font-semibold">
                    ${((item.price * quantity) / 100).toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="flex size-9 items-center justify-center rounded-lg bg-red-100 text-red-500"
                >
                  {quantity === 1 ? <Trash2 size={16} /> : <Minus size={16} />}
                </button>
              </div>
            ))}
          </div>

          <DessertUpsell />

          <div className="rounded-xl border p-4 flex items-center justify-between">
            <span className="font-semibold text-gray-600">Total</span>
            <span className="text-xl font-bold">${totalPrice.toFixed(2)}</span>
          </div>

          <Link
            href="/confirmation"
            className="block w-full rounded-xl bg-green-500 py-4 text-center font-bold text-white text-lg"
          >
            Commander — ${totalPrice.toFixed(2)}
          </Link>
        </>
      )}
    </div>
  );
}
