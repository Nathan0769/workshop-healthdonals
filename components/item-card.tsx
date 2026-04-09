"use client";

import Image from "next/image";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { useSWRConfig } from "swr";
import type { Item } from "@/lib/items";
import { deleteItem } from "@/lib/items";
import { useCartStore } from "@/store/cart-store";
import { useAdminModeStore } from "@/store/admin-mode-store";
import { useCategoryStore } from "@/store/category-store";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Props = {
  item: Item;
};

export function ItemCard({ item }: Props) {
  const price = (item.price / 100).toFixed(2);
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const entry = useCartStore((s) => s.items[item.id]);
  const quantity = entry?.quantity ?? 0;
  const isAdminMode = useAdminModeStore((s) => s.isAdminMode);
  const categoryId = useCategoryStore((s) => s.currentCategoryId);
  const { mutate } = useSWRConfig();

  const handleDelete = async () => {
    await deleteItem(item.id);
    mutate(`/items/${categoryId}`);
    toast.success(`${item.name} supprimé !`);
  };

  return (
    <div className="relative flex flex-col rounded-xl border bg-white p-3">
      {isAdminMode && (
        <div className="absolute inset-0 z-10 flex items-center justify-center gap-3 rounded-xl bg-black/50">
          <Link
            href={`/items/${item.id}`}
            className="flex size-10 items-center justify-center rounded-xl bg-white text-blue-500"
          >
            <Pencil size={18} />
          </Link>
          <AlertDialog>
            <AlertDialogTrigger className="flex size-10 items-center justify-center rounded-xl bg-white text-red-500">
              <Trash2 size={18} />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Supprimer {item.name} ?</AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action est irréversible. Le produit et son image seront définitivement supprimés.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Supprimer
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
      <span className="absolute right-3 top-3 font-bold">${price}</span>
      <div className="flex items-center justify-center py-4">
        <Image
          src={item.image}
          alt={item.name}
          width={120}
          height={120}
          className="size-28 object-contain"
          unoptimized
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="truncate text-sm font-medium text-gray-600">
          {item.name}
        </span>
        {quantity === 0 ? (
          <button
            onClick={() => addItem(item)}
            className="rounded-lg bg-green-500 px-3 py-1 text-sm font-semibold text-white"
          >
            Add
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => removeItem(item.id)}
              className="flex size-6 items-center justify-center rounded-md bg-green-500 text-white font-bold"
            >
              -
            </button>
            <span className="text-sm font-semibold">{quantity}</span>
            <button
              onClick={() => addItem(item)}
              className="flex size-6 items-center justify-center rounded-md bg-green-500 text-white font-bold"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
