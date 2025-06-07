import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { JSX, useState } from "react";
import { BottomGradient, LabelInputContainer } from "./Signup";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { ISignInSignUpModalProps } from "@/types";
import { z } from "zod";
import { SignInFormSchema } from "@/zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "next-themes";
import { useMutationQueries } from "@/apiquery/useApiQuery";
import { ToasterSuccess, ToastErrorHandler } from "@/utils";
import { ButtonLoading } from "@/utils/ui/LoadingUI";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { useRouter } from "next/navigation";
import ProviderAuth from "./ProviderAuth";
import { Button } from "../ui/button";
import { useAuthContext } from "@/contexts/AuthProvider";
import { USER_SIGN_IN } from "@/constant";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { AuthContextType } from "@/contexts/types";

export type SignInSchema = z.infer<typeof SignInFormSchema>;

export default function SignIn({
  openSignInModel,
  openSignUpModel,
  setOpenSignInModal,
  setOpenSignupModal,
  forgotPasswordModel,
  setForgotPasswordModal,
}: ISignInSignUpModalProps & {
  forgotPasswordModel: boolean;
  setForgotPasswordModal: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const [visibiltyToggle, setVisibilityToggle] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignInSchema>({
    resolver: zodResolver(SignInFormSchema),
  });
  const { theme } = useTheme();

  const authContext: AuthContextType | undefined = useAuthContext();

  const router: AppRouterInstance = useRouter();
  const { mutate: signInMutation, isPending } =
    useMutationQueries(USER_SIGN_IN);
  const onSubmit = (userData: z.infer<typeof SignInFormSchema>) => {
    signInMutation(userData, {
      onSuccess(response): void {
        ToasterSuccess(response.data.message, theme!);
        authContext?.setUserProfile(response.data.data);
        reset();
        setOpenSignInModal(false);
        router.push("/dashboard");
      },
      onError: (error: unknown): void => {
        ToastErrorHandler(error, theme);
      },
    });
  };
  const handleVisibilityToggle = (): void => {
    setVisibilityToggle(!visibiltyToggle);
  };
  return (
    <>
      <Dialog
        open={openSignInModel}
        onOpenChange={(isOpen: boolean) => setOpenSignInModal(isOpen)}
      >
        <DialogContent className="sm:max-w-[550px] px-0">
          <div className="w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
            <DialogTitle className="font-bold text-xl text-neutral-800 dark:text-neutral-200 mb-4">
              Welcome back
            </DialogTitle>
            <DialogDescription className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
              Enter your email below to login to your account
            </DialogDescription>

            <form className="mt-4 mb-8" onSubmit={handleSubmit(onSubmit)}>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  placeholder="projectmayhem@fc.com"
                  type="email"
                  {...register("email")}
                  disabled={isPending}
                />
                {errors.email?.message && (
                  <p className="text-red-700 mb-4 text-[12px]">
                    {errors.email.message}
                  </p>
                )}
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <p
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline cursor-pointer"
                      onClick={() => {
                        setForgotPasswordModal(!forgotPasswordModel);
                        setTimeout(() => {
                          setOpenSignInModal(!openSignInModel);
                        }, 0);
                      }}
                    >
                      Forgot your password?
                    </p>
                  </div>
                </div>
                <div className="relative w-full">
                  <Input
                    id="password"
                    placeholder="••••••••"
                    type={visibiltyToggle ? "text" : "password"}
                    {...register("password")}
                    disabled={isPending}
                  />
                  {visibiltyToggle ? (
                    <FaRegEye
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4 cursor-pointer"
                      onClick={handleVisibilityToggle}
                    />
                  ) : (
                    <FaEyeSlash
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4 cursor-pointer"
                      onClick={handleVisibilityToggle}
                    />
                  )}
                </div>
                {errors.password?.message && (
                  <p className="text-red-700 mb-4 text-[12px]">
                    {errors.password.message}
                  </p>
                )}
              </LabelInputContainer>
              <DialogFooter style={{ flexDirection: "column" }}>
                <Button
                  className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600  dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] flex justify-center items-center"
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <span className="mx-2">Submitting...</span>{" "}
                      <ButtonLoading />
                    </>
                  ) : (
                    <>Sign in &rarr;</>
                  )}
                  <BottomGradient />
                </Button>
                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <span
                    className="underline underline-offset-4 cursor-pointer"
                    onClick={() => {
                      setOpenSignupModal(!openSignUpModel);
                      setOpenSignInModal(!openSignInModel);
                    }}
                  >
                    Sign up
                  </span>
                </div>
                <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

                <ProviderAuth isPending={isPending} />
              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
