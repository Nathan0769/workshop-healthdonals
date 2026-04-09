"use client";

import Image from "next/image";
import { ShoppingCart, User } from "lucide-react";
import { useUserStore } from "@/store/user-store";
import { useRouter } from "next/navigation";

export function Header() {
  const userName = useUserStore((s) => s.userName);
  const logout = useUserStore((s) => s.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <Image
          src="/healthburger/healthdonals.png"
          alt="HealthDonald"
          width={40}
          height={40}
        />
        <span className="text-lg font-semibold">Healthdonals</span>
      </div>
      <div className="flex items-center gap-3">
        {userName && (
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-sm font-medium"
          >
            <User size={16} />
            {userName}
          </button>
        )}
        <button className="flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium">
          <span>0</span>
          <ShoppingCart size={18} />
        </button>
      </div>
    </header>
  );
}
