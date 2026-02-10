import { Client } from "@notionhq/client";
import type { BlogPost, Run, RunLink, ShelfItem } from "@/types";

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

function num(page: any, prop: string): number {
  return page.properties[prop]?.number ?? 0;
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

// ── Fetch runs ──────────────────────────────────────────────
export async function getRuns(): Promise<Run[]> {
  if (notion && process.env.NOTION_RUNS_DB) {
    try {
      const resp = await notion.databases.query({
        database_id: process.env.NOTION_RUNS_DB,
        sorts: [{ property: "Date", direction: "ascending" }],
      });
      return resp.results.map((page: any) => {
        // Parse links — try the "Links" property as JSON text
        let links: RunLink[] | undefined;
        const linksRaw = text(page, "Links");
        if (linksRaw) {
          try {
            const parsed = JSON.parse(linksRaw);
            links = Array.isArray(parsed) ? parsed : undefined;
          } catch {
            // If not valid JSON, try treating as comma-separated URLs
            links = undefined;
          }
        }

        // Also check for a "Link" (singular) URL property
        if (!links) {
          const singleLink = text(page, "Link");
          if (singleLink) {
            links = [{ label: singleLink, url: singleLink, type: "other" }];
          }
        }

        return {
          id: page.id,
          location: text(page, "Location"),
          date: date(page, "Date"),
          photoUrl: text(page, "Photo"),
          thoughts: text(page, "Thoughts"),
          distance: text(page, "Distance"),
          color: text(page, "Color") || "#7BA7BC",
          coordinates:
            num(page, "Lat") && num(page, "Lng")
              ? [[num(page, "Lat"), num(page, "Lng")]]
              : undefined,
          links,
        };
      });
    } catch (e) {
      console.error("Notion runs fetch failed, using fallback:", e);
    }
  }

  // Fallback to local JSON
  const data = (await import("../../content/runs.json")).default;
  return data as Run[];
}

// ── Fetch shelf items ───────────────────────────────────────
export async function getShelfItems(): Promise<ShelfItem[]> {
  if (notion && process.env.NOTION_SHELF_DB) {
    try {
      const resp = await notion.databases.query({
        database_id: process.env.NOTION_SHELF_DB,
      });
      return resp.results.map((page: any) => ({
        id: page.id,
        emoji: text(page, "Emoji"),
        name: text(page, "Name"),
        concept: text(page, "Concept"),
        description: text(page, "Description"),
        position: { x: num(page, "X"), y: num(page, "Y") },
        size: (sel(page, "Size") || "md") as "sm" | "md" | "lg",
        rotation: num(page, "Rotation"),
        imageUrl: text(page, "Image") || undefined,
      }));
    } catch (e) {
      console.error("Notion shelf fetch failed, using fallback:", e);
    }
  }

  const data = (await import("../../content/shelf.json")).default;
  return data as ShelfItem[];
}

// ── Fetch blog posts ────────────────────────────────────────
export async function getBlogPosts(): Promise<BlogPost[]> {
  if (notion && process.env.NOTION_BLOG_DB) {
    try {
      const resp = await notion.databases.query({
        database_id: process.env.NOTION_BLOG_DB,
      });

      // Sort by Date if the property exists, otherwise keep Notion order
      const posts = resp.results.map((page: any) => {
        const props = Object.keys(page.properties);
        // Find title — try common names
        const titleKey =
          props.find((p) => p.toLowerCase() === "title") ||
          props.find((p) => p.toLowerCase() === "name") ||
          props.find(
            (p) => page.properties[p].type === "title"
          ) ||
          "";
        const title = titleKey ? text(page, titleKey) : "";

        // Find date
        const dateKey =
          props.find((p) => p.toLowerCase() === "date") || "";

        // Find body/content
        const bodyKey =
          props.find((p) => p.toLowerCase() === "body") ||
          props.find((p) => p.toLowerCase() === "content") ||
          "";

        // Find tag
        const tagKey =
          props.find((p) => p.toLowerCase() === "tag") ||
          props.find((p) => p.toLowerCase() === "tags") ||
          "";

        // Find URL/Link
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
