"use client";

import type { CATEGORY_NAMES_QUERYResult } from "@/sanity.types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function Filter({
  categories,
}: {
  categories: CATEGORY_NAMES_QUERYResult;
}) {
  const pathname = usePathname();
  const searchParams = new URLSearchParams(useSearchParams());
  const { replace } = useRouter();
  const handleFilter = (value: string) => {
    if (value !== "all" && value) {
      searchParams.set("filter", value);
    } else {
      searchParams.delete("filter");
    }
    replace(`${pathname}?${searchParams.toString()}`);
  };

  if (categories.length === 0) {
    return (
      <Select>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="none" />
        </SelectTrigger>
      </Select>
    );
  }
  return (
    <Select
      onValueChange={(value) => {
        handleFilter(value);
      }}
      defaultValue={searchParams.get("filter") || "all"}
    >
      <SelectTrigger className={`w-[170px] hover:text-secondary font-bold`}>
        <SelectValue placeholder="all categories" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Categories</SelectItem>
        {categories.map(({ _id, name }) => (
          <SelectItem key={_id} value={name || ""}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
