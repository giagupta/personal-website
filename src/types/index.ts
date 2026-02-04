export interface Run {
  id: string;
  location: string;
  date: string;
  coordinates: [number, number][];
  photoUrl: string;
  thoughts: string;
  distance: string;
  color: string;
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
