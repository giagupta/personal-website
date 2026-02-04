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
  bgColor: string;
}
