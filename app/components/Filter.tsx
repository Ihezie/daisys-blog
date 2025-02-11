import type { CATEGORY_NAMES_QUERYResult } from "@/sanity.types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function Filter({
  categories,
}: {
  categories: CATEGORY_NAMES_QUERYResult;
}) {
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
    <Select>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Filter" />
      </SelectTrigger>
      <SelectContent>
        {categories.map(({ _id, name }) => (
          <SelectItem key={_id} value={name || ""}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
