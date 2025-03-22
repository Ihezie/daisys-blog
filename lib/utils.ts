import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { POSTS_QUERYResult } from "@/sanity.types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const formatDate = (date: string): string =>
  new Date(date).toLocaleDateString("en-uk", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
export const formatPreview = (
  body: POSTS_QUERYResult[0]["body"],
  length?: number
) => {
  if (body) {
    return body[0]?.children?.[0]?.text?.slice(0, length || 100)?.trim() || "";
  }
  return "";
};

export const formatTitle = (title: string | null, length?: number) => {
  if (title) {
    if (title.length > 58) {
      return title.slice(0, length || 57).trim() + "...";
    }
    return title;
  }
};
