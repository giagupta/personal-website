// This file exists for backward compatibility.
// Actual data lives in content/runs.json (or Notion).
// The Runs page fetches via src/lib/notion.ts instead.

import { Run } from "@/types";
import data from "../../content/runs.json";

export const runs: Run[] = data as Run[];
