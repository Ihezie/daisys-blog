import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <form className="mb-10 px-5">
      <div className="grid grid-cols-[auto_45px] border-b-2 border-black/60 text-lg pb-1 items-center has-[:focus]:border-secondary">
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
          className="size-[45px] flex items-center justify-center rounded-full hover:bg-secondary-800"
        >
          <Search size={25} />
        </button>
      </div>
    </form>
  );
};
export default SearchBar;
