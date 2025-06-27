import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { POSTS_QUERYResult } from "@/sanity.types";
import { DateTime } from "ts-luxon";

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
export const timestamp = (date: string | null) => {
  if (date) {
    if (date === "posting...") {
      return date;
    }
    const posted = DateTime.fromISO(date);
    const current = DateTime.now();
    const diff = current.diff(posted, [
      "seconds",
      "minutes",
      "hours",
      "days",
      "weeks",
      "months",
      "years",
    ]);
    const maxUnit = diff.getMaxUnit(false);
    const maxUnitStr =
      diff[maxUnit] === 1 ? maxUnit.replace(/s$/, "") : (maxUnit as string);
    let timeSince = diff[maxUnit] as number;
    timeSince = Math.round(timeSince);
    return `${timeSince} ${maxUnitStr} ago`;
  }
};
