import { Client } from "@notionhq/client";
import type { BlogPost } from "@/types";

// ── Notion client (null when env vars not set) ──────────────
const notion = process.env.NOTION_API_KEY
  ? new Client({ auth: process.env.NOTION_API_KEY })
  : null;

// ── Helpers to extract Notion property values ───────────────
function text(page: any, prop: string): string {
  const p = page.properties[prop];
  if (!p) return "";
  if (p.type === "title") return p.title.map((t: any) => t.plain_text).join("");
  if (p.type === "rich_text")
    return p.rich_text.map((t: any) => t.plain_text).join("");
  if (p.type === "url") return p.url ?? "";
  if (p.type === "phone_number") return p.phone_number ?? "";
  if (p.type === "email") return p.email ?? "";
  return "";
}

function sel(page: any, prop: string): string {
  return page.properties[prop]?.select?.name ?? "";
}

function date(page: any, prop: string): string {
  const d = page.properties[prop]?.date?.start;
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ── Fetch blog posts ────────────────────────────────────────
export async function getBlogPosts(): Promise<BlogPost[]> {
  if (notion && process.env.NOTION_BLOG_DB) {
    try {
      const resp = await notion.databases.query({
        database_id: process.env.NOTION_BLOG_DB,
      });

      const posts = resp.results.map((page: any) => {
        const props = Object.keys(page.properties);
        const titleKey =
          props.find((p) => p.toLowerCase() === "title") ||
          props.find((p) => p.toLowerCase() === "name") ||
          props.find((p) => page.properties[p].type === "title") ||
          "";
        const title = titleKey ? text(page, titleKey) : "";

        const dateKey =
          props.find((p) => p.toLowerCase() === "date") || "";
        const bodyKey =
          props.find((p) => p.toLowerCase() === "body") ||
          props.find((p) => p.toLowerCase() === "content") ||
          "";
        const tagKey =
          props.find((p) => p.toLowerCase() === "tag") ||
          props.find((p) => p.toLowerCase() === "tags") ||
          "";
        const urlKey =
          props.find((p) => p.toLowerCase() === "url") ||
          props.find((p) => p.toLowerCase() === "link") ||
          "";

        return {
          id: page.id,
          title,
          date: dateKey ? date(page, dateKey) : "",
          body: bodyKey ? text(page, bodyKey) : undefined,
          tag:
            (tagKey
              ? sel(page, tagKey) || text(page, tagKey)
              : undefined) || undefined,
          url: urlKey ? text(page, urlKey) : undefined,
        };
      });

      return posts.filter((p) => p.title);
    } catch (e) {
      console.error("Notion blog fetch failed, using fallback:", e);
    }
  }

  const data = (await import("../../content/blog.json")).default;
  return data as BlogPost[];
}
