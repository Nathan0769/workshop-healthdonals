"use client";

import Image from "next/image";
import { ShoppingCart } from "lucide-react";

export function Header() {
  return (
    <header className="flex items-center justify-between px-4">
      <Image src="/healthburger/healthdonals.png" alt="HealthDonald" width={150} height={50} />
      <button>
        <ShoppingCart size={24} />
      </button>
    </header>
  );
}
