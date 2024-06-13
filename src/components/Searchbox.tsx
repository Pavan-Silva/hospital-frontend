import { useSearch } from "@/hooks/useSearch";
import { Input } from "./ui/input";
import { IoIosSearch } from "react-icons/io";

const Searchbox = () => {
  const { search } = useSearch();

  return (
    <div className="relative flex items-center max-w-sm">
      <IoIosSearch className="absolute left-5 size-5" />

      <Input
        placeholder="Search"
        onChange={(e) => search(e.target.value)}
        className="bg-transparent placeholder:text-white placeholder:text-opacity-80 text-white border-white border-opacity-40 mx-3 pl-8"
      />
    </div>
  );
};

export default Searchbox;
