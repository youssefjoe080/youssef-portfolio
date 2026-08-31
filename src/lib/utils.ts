import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function parseVideoUrls(videoUrls: string | null | undefined): string[] {
  if (!videoUrls) return [];
  try {
    const parsed = JSON.parse(videoUrls);
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export function stringifyVideoUrls(urls: string[]): string {
  return JSON.stringify(urls.filter(Boolean));
}
