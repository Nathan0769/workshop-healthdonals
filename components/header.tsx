"use client";

import Image from "next/image";
import { ShoppingCart, User, Settings } from "lucide-react";
import { useUserStore } from "@/store/user-store";
import { useCartStore } from "@/store/cart-store";
import { useAdminModeStore } from "@/store/admin-mode-store";
import { Toggle } from "@/components/ui/toggle";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function Header() {
  const userName = useUserStore((s) => s.userName);
  const isAdmin = useUserStore((s) => s.isAdmin);
  const logout = useUserStore((s) => s.logout);
  const totalCount = useCartStore((s) =>
    Object.values(s.items).reduce((acc, e) => acc + e.quantity, 0)
  );
  const isAdminMode = useAdminModeStore((s) => s.isAdminMode);
  const toggleAdminMode = useAdminModeStore((s) => s.toggleAdminMode);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    toast.success("À bientôt !");
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
      <div className="flex items-center gap-2">
        {isAdmin && (
          <Toggle
            pressed={isAdminMode}
            onPressedChange={toggleAdminMode}
            size="sm"
            aria-label="Admin mode"
          >
            <Settings size={16} />
          </Toggle>
        )}
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
          <span>{totalCount}</span>
          <ShoppingCart size={18} />
        </button>
      </div>
    </header>
  );
}
