import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { BottomGradient } from "./Signup";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/config/firebase";

const ProviderAuth = () => {
  const handleGoogleSignup = async () => {
    const provider: GoogleAuthProvider = new GoogleAuthProvider();
    const response = await signInWithPopup(auth, provider);
    console.log("🚀 ~ handleGoogleSignup ~ response:", response);
  };
  const handleGithubSignup = async () => {
    const provider: GithubAuthProvider = new GithubAuthProvider();
    const response = await signInWithPopup(auth, provider);
    console.log("🚀 ~ handleGithubSignup ~ response:", response);
  };
  return (
    <div className="flex flex-col gap-4">
      <button
        className=" relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
        type="submit"
        onClick={handleGithubSignup}
      >
        <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
        <span className="text-neutral-700 dark:text-neutral-300 text-sm">
          GitHub &rarr;
        </span>
        <BottomGradient />
      </button>
      <button
        className=" relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
        type="submit"
        onClick={handleGoogleSignup}
      >
        <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
        <span className="text-neutral-700 dark:text-neutral-300 text-sm">
          Google &rarr;
        </span>
        <BottomGradient />
      </button>
    </div>
  );
};

export default ProviderAuth;
