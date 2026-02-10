export interface BlogPost {
  id: string;
  title: string;
  date: string;
  body?: string;
  tag?: string;
  /** If set, clicking the entry opens this URL instead of the modal. */
  url?: string;
}

export interface RunLink {
  label: string;
  url: string;
  type?: "podcast" | "article" | "music" | "other";
}

export interface Run {
  id: string;
  location: string;
  date: string;
  /** Optional GPS coords for geographic node positioning. */
  coordinates?: [number, number][];
  photoUrl: string;
  thoughts: string;
  distance: string;
  color: string;
  /** Links to podcasts, articles, music, etc. from the run. */
  links?: RunLink[];
}

export interface ShelfItem {
  id: string;
  emoji: string;
  name: string;
  concept: string;
  description: string;
  /** Position as percentage of the canvas (0–100). x=left, y=top. */
  position: { x: number; y: number };
  /** Display size: "sm" ~60px, "md" ~90px, "lg" ~120px emoji */
  size: "sm" | "md" | "lg";
  /** Optional rotation in degrees (e.g. -8, 5). Defaults to 0. */
  rotation?: number;
  /** Optional image URL. If provided, shown instead of emoji. */
  imageUrl?: string;
}
