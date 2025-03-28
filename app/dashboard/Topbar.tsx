import { JSX } from "react";
import { CreatePost } from "./CreatePost";
import { SearchInput } from "./SearchInput";

export const TopBar = ():JSX.Element => {
  return (
    <>
      <div className={`hidden md:flex justify-between items-center`}>
        <SearchInput />
        <CreatePost />
      </div>
    </>
  );
};
