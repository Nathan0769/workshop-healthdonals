"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useSWR, { useSWRConfig } from "swr";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FirebaseImageUpload } from "@/components/firebase-image-upload";
import { useUserStore } from "@/store/user-store";
import { CATEGORIES } from "@/lib/categories";
import { getItem, setItem, updateItem } from "@/lib/items";
import { toast } from "sonner";

const formSchema = z.object({
  id: z.string().min(2).max(50),
  name: z.string().min(2).max(50),
  category: z.string().min(2).max(50),
  price: z.coerce.number().min(0).max(1000),
  image: z.any(),
});

type FormValues = z.infer<typeof formSchema>;

function toSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/\s+(\d)/g, "$1")
    .replace(/\s+/g, "-");
}

export function ItemForm({ itemId }: { itemId: string }) {
  const isNew = itemId === "new";
  const isAdmin = useUserStore((s) => s.isAdmin);
  const router = useRouter();
  const { mutate } = useSWRConfig();

  useEffect(() => {
    if (!isAdmin) router.push("/");
  }, [isAdmin, router]);

  const { data: existingItem } = useSWR(
    isNew ? null : `/items/${itemId}`,
    () => getItem(itemId)
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { id: "", name: "", category: "", price: 0, image: undefined },
  });

  useEffect(() => {
    if (existingItem) {
      form.reset({
        id: existingItem.id,
        name: existingItem.name,
        category: existingItem.category,
        price: existingItem.price / 100,
        image: existingItem.image,
      });
    }
  }, [existingItem, form]);

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue("name", e.target.value);
    if (isNew) form.setValue("id", toSlug(e.target.value));
  };

  const onSubmit = async (values: FormValues) => {
    try {
      if (isNew) {
        await setItem(values.id, {
          name: values.name,
          category: values.category,
          price: Math.round(values.price * 100),
          image: values.image,
        });
      } else {
        await updateItem(itemId, {
          name: values.name,
          category: values.category,
          price: Math.round(values.price * 100),
          image: values.image,
          imagePath: existingItem?.imagePath,
        });
        mutate(`/items/${existingItem?.category}`);
      }
      toast.success(isNew ? "Produit créé !" : "Produit modifié !");
      router.push("/");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur";
      toast.error(message);
      form.setError("id", { message });
    }
  };

  if (!isAdmin) return null;
  if (!isNew && !existingItem) {
    return <div className="px-4 text-gray-400">Chargement...</div>;
  }

  return (
    <div className="flex flex-col gap-6 px-4">
      <h1 className="text-xl font-bold">
        {isNew ? "Add a new item" : `Modifier ${existingItem?.name}`}
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="salad burger 123" {...field} onChange={onNameChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID</FormLabel>
                <FormControl>
                  <Input placeholder="salad-burger-123" {...field} disabled={!isNew} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" placeholder="Enter item price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <FirebaseImageUpload image={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="rounded-xl bg-green-500 py-3 font-semibold text-white disabled:opacity-60"
          >
            {form.formState.isSubmitting ? "Loading..." : "Submit"}
          </button>
        </form>
      </Form>
    </div>
  );
}
