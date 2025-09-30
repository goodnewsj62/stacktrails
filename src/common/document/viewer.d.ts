type Tool = "select" | "highlight" | "comment" | "copy";

interface Quad {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Highlight {
  id: string;
  page: number;
  quads: Quad[];
  comment?: string;
}
