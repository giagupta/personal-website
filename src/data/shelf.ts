// This file exists for backward compatibility.
// Actual data lives in content/shelf.json (or Notion).
// The Shelf page fetches via src/lib/notion.ts instead.

import { ShelfItem } from "@/types";
import data from "../../content/shelf.json";

export const shelfItems: ShelfItem[] = data as ShelfItem[];
