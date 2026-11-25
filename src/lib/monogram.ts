import { pickByHash } from "@/lib/utils";

export const MONOGRAM_TINTS: [string, string][] = [
  ["#fbe9d0", "#7a4a05"],
  ["#3d1104", "#ffd9c2"],
  ["#ffe8db", "#c2410c"],
  ["#efebfc", "#6d4fd1"],
  ["#e6f6ed", "#12733f"],
  ["#e6f2fc", "#1b64a6"],
];

export const monogram = (name: string) =>
  name
    .replace(/[^A-Za-z ]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase() || name.slice(0, 2).toUpperCase();

export const monogramTint = (key: string) => {
  const [background, color] = pickByHash(key, MONOGRAM_TINTS);
  return { background, color };
};
