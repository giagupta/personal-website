# Gia — Personal Website

A vintage postcard-inspired personal website built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion, and Leaflet.

## Features

- **Home** — Animated hero with navigation cards
- **Runs** — Interactive Leaflet map with running routes. Click routes or cards to open postcard-style modals with photos and reflections
- **Shelf** — Freeform "scattered objects" canvas (inspired by editorial/catalogue design). Objects are placed at custom positions with varying sizes and rotations. Click any object for details
- **About** — Personal bio and contact links

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## How to Edit

All your personal content lives in two data files. You don't need to touch any component code.

### Editing the Shelf (`src/data/shelf.ts`)

Open the file — there's a detailed comment block at the top explaining every field. Here's the quick version:

```ts
{
  id: "apple",              // unique identifier
  emoji: "🍎",              // displayed on the canvas
  name: "Apple",            // shown on hover + in the modal
  concept: "Gravity",       // subtitle label
  description: "Newton...", // longer text for the modal
  position: { x: 5, y: 4 },// placement on canvas (% from left, % from top)
  size: "lg",               // "sm" | "md" | "lg"
  rotation: -3,             // tilt in degrees (optional, default 0)
  imageUrl: "/images/a.png" // optional — replaces emoji with a real image
}
```

**To add a new object:** copy any block in the array, give it a new `id`, and pick a `position` that doesn't overlap too much with others. Values for `x` should stay between 2–88, and `y` between 2–90.

**To use real images instead of emojis:**
1. Drop your image into `public/images/`
2. Set `imageUrl: "/images/your-file.png"` on the item
3. The emoji field is ignored when imageUrl is present

**Mobile:** On screens < 768px the freeform layout switches to a wrapped flex grid, so positions are only used on desktop.

### Editing Runs (`src/data/runs.ts`)

Each run has:

```ts
{
  id: "annecy",
  location: "Annecy, France",
  date: "June 2025",
  coordinates: [[45.899, 6.129], ...], // GPS points for the polyline
  photoUrl: "https://...",             // image shown in the postcard modal
  thoughts: "First time...",           // your reflection
  distance: "8.2 km",
  color: "#C19A6B"                     // route color on the map
}
```

**To add a run:** copy a block, change the `id`, and fill in your data. GPS coordinates can come from Strava GPX exports or any route-drawing tool.

### Editing the About page

Edit `src/app/about/page.tsx` directly — it's plain JSX with your bio text and contact links.

### Changing colors

Edit `tailwind.config.ts`:

| Token        | Used for                     |
|-------------|------------------------------|
| `cream`     | Page background              |
| `soft-blue` | Accent color                 |
| `charcoal`  | Primary text                 |
| `tan`       | Links, decorative elements   |
| `warm-gray` | Secondary/muted text         |

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with nav
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles + paper texture
│   ├── runs/page.tsx       # Runs page
│   ├── shelf/page.tsx      # Shelf page (freeform canvas)
│   └── about/page.tsx      # About page
├── components/
│   ├── Navigation.tsx      # Fixed top nav
│   ├── PageTransition.tsx  # Fade-in wrapper
│   ├── runs/
│   │   ├── RunMap.tsx      # Leaflet map
│   │   ├── RunCard.tsx     # Run preview card
│   │   └── PostcardModal.tsx
│   └── shelf/
│       ├── ShelfCard.tsx   # Freeform positioned object
│       └── ShelfModal.tsx  # Object detail modal
├── data/
│   ├── runs.ts             # ← EDIT THIS for your runs
│   └── shelf.ts            # ← EDIT THIS for your shelf
└── types/
    └── index.ts            # TypeScript interfaces
```

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** — Warm vintage palette
- **Framer Motion** — Animations
- **Leaflet** — Interactive map
- **Fonts** — Crimson Pro (serif) + Karla (sans-serif)
