/** Seeded placeholder images — same seed, same picture, every load. */
export const img = (seed: string, width: number, height: number) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`;

export const FIGMA_FILE =
  "https://www.figma.com/design/zMcbm8ujSMldgS1VB70IMP/Kobber-Komponentbibliotek";
export const figmaNode = (nodeId: string) => `${FIGMA_FILE}?node-id=${nodeId.replace(":", "-")}`;

export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  category: "Grunnskole" | "Videregående" | "Skjønnlitteratur";
}

export const books: Book[] = [
  { id: "matte-5", title: "Matematikk 5", author: "Berit Ås", price: 549, category: "Grunnskole" },
  {
    id: "norsk-8",
    title: "Norsk 8–10",
    author: "Jon Fosse mfl.",
    price: 629,
    category: "Grunnskole",
  },
  {
    id: "naturfag-vg1",
    title: "Naturfag VG1",
    author: "Kari Bakken",
    price: 719,
    category: "Videregående",
  },
  {
    id: "historie-vg2",
    title: "Historie VG2",
    author: "Odd Lund",
    price: 689,
    category: "Videregående",
  },
  {
    id: "kristin",
    title: "Kristin Lavransdatter",
    author: "Sigrid Undset",
    price: 399,
    category: "Skjønnlitteratur",
  },
  { id: "sult", title: "Sult", author: "Knut Hamsun", price: 349, category: "Skjønnlitteratur" },
  { id: "engelsk-6", title: "Engelsk 6", author: "Mary Smith", price: 519, category: "Grunnskole" },
  {
    id: "kjemi-vg3",
    title: "Kjemi VG3",
    author: "Anna Holt",
    price: 749,
    category: "Videregående",
  },
];

export interface Student {
  id: string;
  name: string;
  group: string;
  progress: number;
  status: "Aktiv" | "Fullført" | "Ikke startet";
}

export const students: Student[] = [
  { id: "s1", name: "Emma Hansen", group: "8A", progress: 82, status: "Aktiv" },
  { id: "s2", name: "Noah Johansen", group: "8A", progress: 100, status: "Fullført" },
  { id: "s3", name: "Olivia Olsen", group: "8B", progress: 45, status: "Aktiv" },
  { id: "s4", name: "William Larsen", group: "8B", progress: 0, status: "Ikke startet" },
  { id: "s5", name: "Ella Andersen", group: "8A", progress: 91, status: "Aktiv" },
  { id: "s6", name: "Oskar Pedersen", group: "8C", progress: 100, status: "Fullført" },
  { id: "s7", name: "Maja Nilsen", group: "8C", progress: 63, status: "Aktiv" },
  { id: "s8", name: "Elias Kristiansen", group: "8B", progress: 12, status: "Aktiv" },
];

export const studentStatusColor = {
  Aktiv: "brand",
  Fullført: "neutral",
  "Ikke startet": "neutral",
} as const;
