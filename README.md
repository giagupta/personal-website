# Gia Gupta — Personal Website

A minimal personal website with an about page and a writing/blog page backed by Notion.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

- **About** (`/about`) — Bio, interests, contact email, two photos
- **Writing** (`/blog`) — Numbered index of posts. Supports inline body text (opens modal) or external URLs (opens in new tab). Backed by Notion or `content/blog.json` fallback.

## Adding / Changing Photos

Drop images into `public/images/`:

| File | Where it appears |
|---|---|
| `public/images/about-1.jpg` | Left photo on About page |
| `public/images/about-2.jpg` | Right photo on About page |

## Editing Content

### About page

Edit `src/app/about/AboutClient.tsx` directly — bio text, bullet list, email.

### Writing page (Notion)

1. Create a Notion integration at [notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Create a Notion database with columns: **Title**, **Date**, **Body** (text), **Tag** (select), **URL** (url)
3. Share the database with your integration
4. Set environment variables:
   ```
   NOTION_API_KEY=ntn_xxxxxxxxxxxxx
   NOTION_BLOG_DB=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
5. Restart dev server or redeploy on Vercel

When Notion isn't configured, the site falls back to `content/blog.json`.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS (Crimson Pro + Karla fonts)
- Framer Motion
- Notion API (optional CMS for Writing page)

## Project Structure

```
public/images/          ← about page photos
content/blog.json       ← fallback blog data
src/
├── app/
│   ├── layout.tsx      # Root layout + nav
│   ├── page.tsx        # Redirects to /about
│   ├── about/
│   │   ├── page.tsx
│   │   └── AboutClient.tsx
│   └── blog/
│       ├── page.tsx
│       └── BlogClient.tsx
├── components/
│   ├── Navigation.tsx  # Centered nav (Gia Gupta + links)
│   └── PageTransition.tsx
├── lib/
│   └── notion.ts       # Notion API + JSON fallback
└── types/
    └── index.ts
```
