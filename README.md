# Gia — Personal Website

A vintage-inspired personal website with a connected-nodes Runs page, freeform Shelf page, and optional Notion CMS.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## How to Edit Your Content

You have **two options** — pick whichever is easier for you.

### Option A: Edit JSON files (no setup needed)

All content lives in the `content/` folder at the project root:

| File | What it controls |
|---|---|
| `content/runs.json` | Your runs (photos, notes, locations) |
| `content/shelf.json` | Your shelf objects (emojis, concepts) |

These are plain JSON — no code syntax to worry about. Just open the file, change the values, and save.

### Option B: Connect to Notion (recommended)

Use Notion as your CMS. Edit content in Notion's UI and the site updates automatically.

#### Setup steps:

1. **Create a Notion integration** at [notion.so/my-integrations](https://www.notion.so/my-integrations). Copy the API key.

2. **Create two Notion databases** with these properties:

   **Runs database:**
   | Property | Type |
   |---|---|
   | Location | Title |
   | Date | Date |
   | Photo | URL |
   | Thoughts | Text |
   | Distance | Text |
   | Color | Text (hex, e.g. `#7BA7BC`) |
   | Lat | Number (optional) |
   | Lng | Number (optional) |

   **Shelf database:**
   | Property | Type |
   |---|---|
   | Name | Title |
   | Emoji | Text |
   | Concept | Text |
   | Description | Text |
   | Image | URL (optional) |
   | X | Number (0–88) |
   | Y | Number (0–90) |
   | Size | Select (`sm` / `md` / `lg`) |
   | Rotation | Number |

3. **Share both databases** with your integration (click "..." → Connections → your integration).

4. **Copy the database IDs** from the database URL:
   `https://notion.so/YOUR_WORKSPACE/<DATABASE_ID>?v=...`

5. **Create a `.env.local` file** in the project root:
   ```
   NOTION_API_KEY=ntn_xxxxxxxxxxxxx
   NOTION_RUNS_DB=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   NOTION_SHELF_DB=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

6. Restart `npm run dev`. The site now reads from Notion.

> When Notion isn't configured, the site falls back to `content/*.json` automatically.

---

## Pages

- **Home** — Animated hero
- **Runs** — Connected-nodes graph. Nodes are photos, connected chronologically by dashed lines. Loosely positioned geographically. Click a node → postcard modal with photo + notes
- **Shelf** — Freeform scattered objects canvas. Emojis (or images) at custom positions with tilt. Click → detail modal
- **About** — Bio and contact links

## Tech Stack

- Next.js 14 (App Router, server + client components)
- TypeScript
- Tailwind CSS
- Framer Motion
- Notion API (optional CMS)
- Leaflet (available but not used by default)

## Project Structure

```
content/
├── runs.json              ← edit here (or use Notion)
└── shelf.json             ← edit here (or use Notion)
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx           # Home
│   ├── runs/
│   │   ├── page.tsx       # Server: fetches data
│   │   └── RunsClient.tsx # Client: renders graph
│   ├── shelf/
│   │   ├── page.tsx       # Server: fetches data
│   │   └── ShelfClient.tsx
│   └── about/page.tsx
├── components/
│   ├── runs/
│   │   ├── RunGraph.tsx   # Connected nodes SVG
│   │   ├── PostcardModal.tsx
│   │   └── RunMap.tsx     # Leaflet map (optional)
│   └── shelf/
│       ├── ShelfCard.tsx
│       └── ShelfModal.tsx
├── lib/
│   └── notion.ts          # Notion API + JSON fallback
└── types/
    └── index.ts
```
