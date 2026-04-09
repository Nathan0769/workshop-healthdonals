"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user-store";
import Image from "next/image";

export default function LoginPage() {
  const [name, setName] = useState("");
  const setUserName = useUserStore((s) => s.setUserName);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setUserName(name.trim());
    router.push("/");
  };

  return (
    <div className="flex flex-1 items-center justify-center px-2">
      <div className="grid w-full grid-cols-[70px_1fr_70px] items-center gap-2">
        <div className="flex flex-col items-center justify-between gap-8">
          <Image
            src="/healthburger/sweetpotato-burger-bg-removed.webp"
            alt="burger"
            width={65}
            height={65}
          />
          <Image
            src="/healthburger/carotte-fries-bg-removed.webp"
            alt="fries"
            width={65}
            height={65}
          />
        </div>

        <div className="flex flex-col items-center gap-3 text-center">
          <h1 className="text-xl font-bold">Welcome to Healthdonals !</h1>
          <p className="text-sm text-gray-500">
            Login first to access our application.
          </p>
          <form onSubmit={handleSubmit} className="flex w-full gap-2">
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="rounded-xl bg-green-500 px-5 py-3 font-semibold text-white"
            >
              Login
            </button>
          </form>
        </div>

        <div className="flex flex-col items-center justify-between gap-8">
          <Image
            src="/healthburger/tomato-nuggets-bg-removed.webp"
            alt="nuggets"
            width={65}
            height={65}
          />
          <Image
            src="/healthburger/courgette-icecream-bg-removed.webp"
            alt="icecream"
            width={65}
            height={65}
          />
        </div>
      </div>
    </div>
  );
}
