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
        <div className="pointer-events-none fixed bottom-0 left-1/2 w-full max-w-md -translate-x-1/2">
          <div className="pointer-events-auto absolute bottom-24 right-4">
            <Link
              href="/items/new"
              className="rounded-xl bg-black px-5 py-3 font-semibold text-white shadow-lg"
            >
              + New
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
