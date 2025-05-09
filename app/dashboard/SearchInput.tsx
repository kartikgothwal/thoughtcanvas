import { Input } from "@/components/ui/input";
import { JSX } from "react";
import { IoMdSearch } from "react-icons/io";

export const SearchInput = ():JSX.Element => {
  return (
    <div className="relative w-1/4">
      <IoMdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
      <Input
        type="text"
        placeholder="Search Blogs and Peoples"
        className="pl-10"
      />
    </div>
  );
};