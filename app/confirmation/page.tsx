"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { useUserStore } from "@/store/user-store";

export default function ConfirmationPage() {
  const userName = useUserStore((s) => s.userName);
  const clearCart = useCartStore((s) => s.clearCart);
  const router = useRouter();

  useEffect(() => {
    if (!userName) {
      router.push("/login");
      return;
    }
    clearCart();
  }, []);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
      <div className="text-6xl">🎉</div>
      <h1 className="text-2xl font-bold">Commande confirmée !</h1>
      <p className="text-gray-500">
        Merci {userName}, ta commande a bien été prise en compte.
      </p>
      <Link
        href="/"
        className="rounded-xl bg-green-500 px-8 py-3 font-semibold text-white"
      >
        Retour au menu
      </Link>
    </div>
  );
}
