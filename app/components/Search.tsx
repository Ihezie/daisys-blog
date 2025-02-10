"use client";
import { Search } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const SearchBar = () => {
  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("term", value);
    } else {
      params.delete("term");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  return (
    <div className="pl-5 pr-2 py-[6px] grid grid-cols-[auto_45px] border-2 border-gray-300 text-lg rounded-full items-center has-[:focus]:border-secondary-700 custom-transition sm:w-1/2">
      <input
        id="search"
        placeholder="Search..."
        type="text"
        className="w-full bg-background outline-none text-xl peer"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <label
        htmlFor="search"
        className="size-[38px] flex custom-transition items-center justify-center rounded-full hover:bg-secondary-800 cursor-pointer"
      >
        <span className="absolute top-[-9999px]">search</span>
        <Search size={22} />
      </label>
    </div>
  );
};
export default SearchBar;
