import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { BottomGradient } from "./Signup";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/config/firebase";
import { JSX } from "react";
import { Button } from "../ui/button";
import { USER_SIGN_UP } from "@/constant";
import { useMutationQueries } from "@/apiquery/useApiQuery";
import { ToastErrorHandler, ToasterSuccess } from "@/utils";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const ProviderAuth = ({ isPending }: { isPending: boolean }): JSX.Element => {
  const {
    mutate: signUpMutation,
    isSuccess: signUpSuccess,
    isPending: signUpPending,
  } = useMutationQueries(USER_SIGN_UP);

  const { theme } = useTheme();
  const router: AppRouterInstance = useRouter();
  const handleGoogleSignup = async () => {
    const provider: GoogleAuthProvider = new GoogleAuthProvider();
    const response = await signInWithPopup(auth, provider);
    const userData = {
      firstname: response.user.displayName?.split(" ")[0] || "",
      lastname: response.user.displayName?.split(" ")[1] || "",
      email: response.user.email || "",
      authProvider: "google",
      profilePicture: response.user.photoURL || "",
    };
    signUpMutation(userData, {
      onSuccess(response): void {
        ToasterSuccess(response.data.message, theme!);
        // useAuthContext?.setUserProfile(response.data.data);
        // reset();
        // setOpenSignInModal(false);
        router.push("/dashboard");
      },
      onError: (error: unknown): void => {
        ToastErrorHandler(error, theme);
      },
    });
  };
  const handleGithubSignup = async () => {
    const provider: GithubAuthProvider = new GithubAuthProvider();
    const response = await signInWithPopup(auth, provider);
    console.log("🚀 ~ handleGithubSignup ~ response:", response);
  };
  return (
    <div className="flex flex-col gap-4">
      <Button
        className=" relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
        type="submit"
        disabled={isPending}
        onClick={handleGithubSignup}
      >
        <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
        <span className="text-neutral-700 dark:text-neutral-300 text-sm">
          GitHub &rarr;
        </span>
        <BottomGradient />
      </Button>
      <Button
        className=" relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
        type="submit"
        disabled={isPending}
        onClick={handleGoogleSignup}
      >
        <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
        <span className="text-neutral-700 dark:text-neutral-300 text-sm">
          Google &rarr;
        </span>
        <BottomGradient />
      </Button>
    </div>
  );
};

export default ProviderAuth;
