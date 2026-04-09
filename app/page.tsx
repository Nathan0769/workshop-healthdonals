"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user-store";

export default function Home() {
  const userName = useUserStore((s) => s.userName);
  const router = useRouter();

  useEffect(() => {
    if (!userName) {
      router.push("/login");
    }
  }, [userName, router]);

  return <div></div>;
}
