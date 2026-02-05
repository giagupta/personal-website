import { getShelfItems } from "@/lib/notion";
import ShelfClient from "./ShelfClient";

export const revalidate = 60;

export default async function ShelfPage() {
  const items = await getShelfItems();
  return <ShelfClient items={items} />;
}
