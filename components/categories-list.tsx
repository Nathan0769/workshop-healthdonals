"use client";

import Image from "next/image";
import { CATEGORIES } from "@/lib/categories";
import { useCategoryStore } from "@/store/category-store";
import { cn } from "@/lib/utils";

export function CategoriesList() {
  const currentCategoryId = useCategoryStore((s) => s.currentCategoryId);
  const setCurrentCategoryId = useCategoryStore((s) => s.setCurrentCategoryId);

  return (
    <div className="flex flex-col gap-2">
      {CATEGORIES.map((cat) => {
        const isActive = cat.id === currentCategoryId;
        return (
          <button
            key={cat.id}
            onClick={() => setCurrentCategoryId(cat.id)}
            className={cn(
              "flex flex-col items-center gap-1 rounded-xl border p-2 transition-colors",
              isActive ? "border-green-500 bg-green-50" : "border-transparent"
            )}
          >
            <Image
              src={cat.logo}
              alt={cat.title}
              width={40}
              height={40}
              className="size-10 object-contain"
            />
            <span className={cn("text-xs font-medium", isActive ? "text-green-600" : "text-gray-500")}>
              {cat.title}
            </span>
          </button>
        );
      })}
    </div>
  );
}
