"use client";

import useSWR from "swr";
import { getItems } from "@/lib/items";
import { ItemCard } from "./item-card";
import { useCategoryStore } from "@/store/category-store";

export function ItemsList() {
  const categoryId = useCategoryStore((s) => s.currentCategoryId);

  const { data, isLoading } = useSWR(`/items/${categoryId}`, async () => {
    return await getItems(categoryId);
  });

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <span className="text-gray-400">Chargement...</span>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <span className="text-gray-400">Aucun produit disponible.</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 px-4">
      {data.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
