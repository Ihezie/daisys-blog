import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <form className="sm:w-1/2">
      <div className="pl-5 pr-2 py-[6px] grid grid-cols-[auto_45px] border-2 border-gray-300 text-lg rounded-full items-center has-[:focus]:border-secondary-700">
        <label htmlFor="search" className="absolute top-[-9999px]">
          search
        </label>
        <input
          id="search"
          placeholder="Search..."
          type="text"
          className="w-full bg-background outline-none text-xl peer"
        />
        <button
          type="submit"
          className="size-[38px] flex items-center justify-center rounded-full hover:bg-secondary-800"
        >
          <Search size={22} />
        </button>
      </div>
    </form>
  );
};
export default SearchBar;
