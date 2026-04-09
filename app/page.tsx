"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user-store";
import Link from "next/link";
import { ItemsList } from "@/components/items-list";
import { CartFooter } from "@/components/cart-footer";
import { CategoriesList } from "@/components/categories-list";

export default function Home() {
  const userName = useUserStore((s) => s.userName);
  const isAdmin = useUserStore((s) => s.isAdmin);
  const router = useRouter();

  useEffect(() => {
    if (!userName) {
      router.push("/login");
    }
  }, [userName, router]);

  return (
    <div className="relative flex gap-2 pb-40 pl-2 pr-4">
      <CategoriesList />
      <div className="flex-1">
        <ItemsList />
      </div>
      <CartFooter />
      {isAdmin && (
        <Link
          href="/items/new"
          className="fixed bottom-6 right-6 rounded-xl bg-black px-5 py-3 font-semibold text-white shadow-lg"
        >
          + New
        </Link>
      )}
    </div>
  );
}
