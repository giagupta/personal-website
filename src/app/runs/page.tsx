import { getRuns } from "@/lib/notion";
import RunsClient from "./RunsClient";

export const revalidate = 60;

export default async function RunsPage() {
  const runs = await getRuns();
  return <RunsClient runs={runs} />;
}
