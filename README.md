# Gia — Personal Website

A vintage postcard-inspired personal website built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion, and Leaflet.

## Features

- **Home** — Animated hero with navigation cards
- **Runs** — Interactive Leaflet map with running routes. Click routes or cards to open postcard-style modals with photos and reflections
- **Shelf** — Grid of "learning objects" with emoji, concept labels, and pastel backgrounds. Click to open detail modals
- **About** — Personal bio and contact links

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** — Warm vintage color palette (cream, soft blue, charcoal, tan)
- **Framer Motion** — Page transitions, hover effects, modal animations
- **Leaflet** — Interactive map with route polylines
- **Fonts** — Crimson Pro (serif headings) + Karla (sans-serif body)

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

## Customizing

### Runs

Edit `src/data/runs.ts` to add your own runs. Each run has:

```ts
{
  id: string;           // Unique identifier
  location: string;     // Display name (e.g., "Annecy, France")
  date: string;         // Display date
  coordinates: [number, number][]; // GPS points for the route polyline
  photoUrl: string;     // Image URL for the postcard
  thoughts: string;     // Your reflection/quote
  distance: string;     // Distance label
  color: string;        // Route color (hex)
}
```

### Shelf

Edit `src/data/shelf.ts` to add your own objects. Each item has:

```ts
{
  id: string;           // Unique identifier
  emoji: string;        // Display emoji
  name: string;         // Object name
  concept: string;      // Concept label
  description: string;  // Longer description for the modal
  bgColor: string;      // Pastel background color (hex)
}
```

### Colors

Edit `tailwind.config.ts` to change the color palette:

- `cream` — Background
- `soft-blue` — Accent
- `charcoal` — Text
- `tan` — Links and decorative elements
- `warm-gray` — Secondary text

### About

Edit `src/app/about/page.tsx` to update your bio and contact links.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with nav
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles + paper texture
│   ├── runs/page.tsx       # Runs page
│   ├── shelf/page.tsx      # Shelf page
│   └── about/page.tsx      # About page
├── components/
│   ├── Navigation.tsx      # Fixed top nav
│   ├── PageTransition.tsx  # Fade-in wrapper
│   ├── runs/
│   │   ├── RunMap.tsx      # Leaflet map
│   │   ├── RunCard.tsx     # Run preview card
│   │   └── PostcardModal.tsx # Postcard overlay
│   └── shelf/
│       ├── ShelfCard.tsx   # Shelf grid card
│       └── ShelfModal.tsx  # Shelf detail modal
├── data/
│   ├── runs.ts             # Sample run data
│   └── shelf.ts            # Sample shelf data
└── types/
    └── index.ts            # TypeScript interfaces
```
