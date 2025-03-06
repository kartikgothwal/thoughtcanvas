import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { IoMdAddCircleOutline } from "react-icons/io";

export const CreatePost = () => {
  return (
    <>
      <div className="w-1/4 flex justify-end items-center gap-2">
        <Button className="p-2" variant={"secondary"}>
          <IoMdAddCircleOutline style={{ height: "1.3em", width: "1.3em" }} />
          Create Post
        </Button>
        <ModeToggle />
      </div>
    </>
  );
};
