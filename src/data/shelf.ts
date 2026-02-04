import { ShelfItem } from "@/types";

/**
 * ============================================================
 *  SHELF ITEMS — edit this array to customize your shelf page
 * ============================================================
 *
 *  Each item is an object scattered on a freeform canvas.
 *
 *  Fields:
 *    id          — unique string (used as React key)
 *    emoji       — emoji shown on the canvas (ignored if imageUrl is set)
 *    name        — object name shown on hover and in the modal
 *    concept     — short label (e.g. "Gravity") shown below the name
 *    description — longer text shown inside the modal
 *    position    — { x, y } as percentages (0–100) of the canvas
 *                  x = distance from left edge, y = distance from top
 *    size        — "sm" | "md" | "lg" — controls emoji/image size
 *    rotation    — optional tilt in degrees (negative = counter-clockwise)
 *    imageUrl    — optional URL to a real image (replaces the emoji)
 *
 *  Tips:
 *    - To add a new item: copy any block below, change the id, and adjust position
 *    - Positions are responsive — the canvas scales to fit the viewport
 *    - Keep x values between 2–88 and y values between 2–90 to stay in bounds
 *    - On mobile, items reflow into a wrapped layout (positions are ignored)
 *    - To use real images: add files to /public/images/ and set
 *      imageUrl to "/images/your-file.png"
 */

export const shelfItems: ShelfItem[] = [
  {
    id: "apple",
    emoji: "🍎",
    name: "Apple",
    concept: "Gravity",
    description:
      "Newton's falling apple reminds us that the most profound discoveries come from observing the everyday. Gravity isn't just a force — it's the invisible thread connecting everything in the universe.",
    position: { x: 5, y: 4 },
    size: "lg",
    rotation: -3,
  },
  {
    id: "compass",
    emoji: "🧭",
    name: "Compass",
    concept: "Navigation",
    description:
      "Before GPS, before maps, there was a magnetized needle pointing north. The compass teaches us that even when we're lost, there's always a direction to follow if we know how to look.",
    position: { x: 28, y: 8 },
    size: "md",
    rotation: 5,
  },
  {
    id: "lightbulb",
    emoji: "💡",
    name: "Lightbulb",
    concept: "Innovation",
    description:
      "Edison's 10,000 experiments weren't failures — they were steps. The lightbulb is a monument to persistence, reminding us that every breakthrough is preceded by countless attempts.",
    position: { x: 52, y: 2 },
    size: "lg",
    rotation: -2,
  },
  {
    id: "hourglass",
    emoji: "⏳",
    name: "Hourglass",
    concept: "Time",
    description:
      "Sand flows one grain at a time, never rushing, never pausing. The hourglass teaches patience and reminds us that every moment counts, but only the present one is truly ours.",
    position: { x: 78, y: 6 },
    size: "md",
    rotation: 8,
  },
  {
    id: "telescope",
    emoji: "🔭",
    name: "Telescope",
    concept: "Perspective",
    description:
      "Galileo pointed his telescope at the sky and changed our place in the universe forever. Sometimes the most important thing we can do is look at something familiar from a new distance.",
    position: { x: 12, y: 28 },
    size: "md",
    rotation: -6,
  },
  {
    id: "book",
    emoji: "📖",
    name: "Open Book",
    concept: "Knowledge",
    description:
      "Every book is a conversation across time. The open book represents the endless human desire to understand, to share, and to connect through stories and ideas.",
    position: { x: 40, y: 25 },
    size: "lg",
    rotation: 3,
  },
  {
    id: "seed",
    emoji: "🌱",
    name: "Seedling",
    concept: "Growth",
    description:
      "A tiny seed holds an entire forest within it. Growth is never linear — it requires patience, the right conditions, and the courage to push through darkness toward the light.",
    position: { x: 68, y: 30 },
    size: "sm",
    rotation: -4,
  },
  {
    id: "puzzle",
    emoji: "🧩",
    name: "Puzzle Piece",
    concept: "Connection",
    description:
      "A single puzzle piece is meaningless alone. But placed in context, it becomes essential. We are all pieces seeking our place in the larger picture.",
    position: { x: 88, y: 28 },
    size: "md",
    rotation: 12,
  },
  {
    id: "wave",
    emoji: "🌊",
    name: "Wave",
    concept: "Resilience",
    description:
      "The ocean never stops. Waves crash, recede, and return — endlessly. Resilience isn't about never falling; it's about the quiet certainty of rising again.",
    position: { x: 5, y: 52 },
    size: "lg",
    rotation: 2,
  },
  {
    id: "key",
    emoji: "🗝️",
    name: "Vintage Key",
    concept: "Curiosity",
    description:
      "Every locked door is an invitation. The key represents the human drive to explore the unknown, to ask 'what if?' and to discover what lies beyond.",
    position: { x: 32, y: 50 },
    size: "md",
    rotation: -10,
  },
  {
    id: "prism",
    emoji: "🔮",
    name: "Crystal Ball",
    concept: "Complexity",
    description:
      "White light enters, a rainbow emerges. The prism teaches us that simplicity and complexity coexist — what appears uniform often contains multitudes waiting to be revealed.",
    position: { x: 55, y: 55 },
    size: "lg",
    rotation: 5,
  },
  {
    id: "feather",
    emoji: "🪶",
    name: "Feather",
    concept: "Lightness",
    description:
      "A feather is engineering perfection — strong enough for flight, light enough to float. It reminds us that the best solutions are often the most elegant and effortless ones.",
    position: { x: 78, y: 52 },
    size: "sm",
    rotation: -15,
  },
  {
    id: "clock",
    emoji: "⏰",
    name: "Alarm Clock",
    concept: "Urgency",
    description:
      "The alarm clock doesn't negotiate. It rings whether you're ready or not. It teaches us that time doesn't wait — and sometimes the best moment to start is simply now.",
    position: { x: 18, y: 75 },
    size: "lg",
    rotation: 6,
  },
  {
    id: "camera",
    emoji: "📷",
    name: "Camera",
    concept: "Memory",
    description:
      "A camera freezes a moment that would otherwise dissolve. Photography teaches us to pay attention — because the extraordinary hides in the ordinary, waiting to be noticed.",
    position: { x: 45, y: 78 },
    size: "md",
    rotation: -5,
  },
  {
    id: "dice",
    emoji: "🎲",
    name: "Dice",
    concept: "Chance",
    description:
      "Every roll is unpredictable, yet the probabilities are exact. Dice remind us that randomness and structure coexist — and that sometimes you just have to roll and see what happens.",
    position: { x: 70, y: 76 },
    size: "md",
    rotation: 8,
  },
  {
    id: "globe",
    emoji: "🌍",
    name: "Globe",
    concept: "Exploration",
    description:
      "Spin it, point, and go. The globe holds every story ever told and every one still waiting. It reminds us how vast the world is — and how small our corner of it.",
    position: { x: 88, y: 72 },
    size: "sm",
    rotation: -3,
  },
];
