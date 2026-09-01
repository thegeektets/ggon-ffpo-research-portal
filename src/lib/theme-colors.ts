export const accents = [
  { name: 'teal', bg: '#e8f4f6', text: '#1a6b7a', border: '#1a6b7a', solid: '#1a6b7a' },
  { name: 'amber', bg: '#fef3e8', text: '#a34b12', border: '#c45c26', solid: '#c45c26' },
  { name: 'sage', bg: '#e8f2ec', text: '#2d6a4f', border: '#2d6a4f', solid: '#2d6a4f' },
  { name: 'slate', bg: '#e8edf4', text: '#3d5a80', border: '#3d5a80', solid: '#3d5a80' },
  { name: 'plum', bg: '#f3e8ee', text: '#6b2d4a', border: '#7b2d3b', solid: '#7b2d3b' },
] as const;

export function accentAt(index: number) {
  return accents[index % accents.length];
}

const contentTypeAccent: Record<string, number> = {
  Report: 0,
  'Policy brief': 1,
  'Case study': 2,
  Database: 3,
  Explainer: 4,
};

export function contentTypeAccentIndex(type: string) {
  return contentTypeAccent[type] ?? 0;
}
