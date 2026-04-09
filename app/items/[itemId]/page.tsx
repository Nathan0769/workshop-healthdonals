import { ItemForm } from "./item-form";

export function generateStaticParams() {
  return [{ itemId: "new" }];
}

export default async function ItemPage({
  params,
}: {
  params: Promise<{ itemId: string }>;
}) {
  const { itemId } = await params;
  return <ItemForm itemId={itemId} />;
}
