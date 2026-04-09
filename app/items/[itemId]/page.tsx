import { ItemForm } from "./item-form";

export function generateStaticParams() {
  return [{ itemId: "new" }];
}

export default function ItemPage() {
  return <ItemForm />;
}
