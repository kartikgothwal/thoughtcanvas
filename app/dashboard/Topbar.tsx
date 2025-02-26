import { CreatePost } from "./CreatePost";
import { SearchInput } from "./SearchInput";

export const TopBar = () => {
  return (
    <>
      <div className={`hidden md:flex justify-between items-center`}>
        <SearchInput />
        <CreatePost />
      </div>
    </>
  );
};
