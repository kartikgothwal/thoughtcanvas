"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { SignUpFormSchema } from "@/zod";
import { useTheme } from "next-themes";
import { ToasterSuccess, ToastErrorHandler, InputOTPDemo } from "@/utils";
import { useRouter } from "next/navigation";
import { useMutationQueries } from "@/apiquery/useApiQuery";
import { JSX, useEffect, useState } from "react";
import { ButtonLoading } from "@/utils/ui/LoadingUI";
import { ISignInSignUpModalProps } from "@/types";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import ProviderAuth from "@/components/layout/ProviderAuth";
import { Button } from "@/components/ui/button";
import { SEND_SIGNUP_OTP, USER_SIGN_UP, VERIFY_SIGNUP_OTP } from "@/constant";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useAuthContext } from "@/contexts/AuthProvider";
import { AuthContextType } from "@/contexts/types";

export type SignUpFormSchemaType = z.infer<typeof SignUpFormSchema>;

export function SignUpForm({
  openSignUpModel,
  openSignInModel,
  setOpenSignupModal,
  setOpenSignInModal,
}: ISignInSignUpModalProps): JSX.Element {
  const authContext: AuthContextType | undefined = useAuthContext();
  const [visibiltyToggle, setVisibilityToggle] = useState<boolean>(false);
  const [isOTPModalOpen, setIsOTPModalOpen] = useState<boolean>(false);
  const [pendingUserData, setPendingUserData] = useState<z.infer<
    typeof SignUpFormSchema
  > | null>(null);

  const {
    mutate: signUpMutation,
    isSuccess: signUpSuccess,
    isPending: signUpPending,
  } = useMutationQueries(USER_SIGN_UP);
  
  const {
    mutate: sendSignupOtpMutation,
    isSuccess: sendSignUpOtpMutationSuccess,
    isPending: sendSignOtpMutationPending,
  } = useMutationQueries(SEND_SIGNUP_OTP);

  const {
    mutate: verifySignupOTPMutation,
    isSuccess,
    isPending,
  } = useMutationQueries(VERIFY_SIGNUP_OTP);

  const router: AppRouterInstance = useRouter();
  const { theme } = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpFormSchemaType>({
    resolver: zodResolver(SignUpFormSchema),
  });
  const onSubmit = async (userData: z.infer<typeof SignUpFormSchema>) => {
    setPendingUserData(userData);
    sendSignupOtpMutation(userData, {
      onSuccess: (response) => {
        ToasterSuccess(response.data.message, theme!);
        setIsOTPModalOpen(true);
      },
      onError: (error: unknown) => {
        ToastErrorHandler(error, theme);
      },
    });
    // signUpMutation(userData, {
    //   onSuccess: (response) => {
    //     ToasterSuccess(response.data.message, theme!);
    //     authContext?.setUserProfile(response.data.data);
    //     reset();
    //     setIsOTPModalOpen(!isOTPModalOpen);
    //     setOpenSignupModal(false);
    //     router.push("/dashboard");
    //   },
    //   onError: (error: unknown) => {
    //     ToastErrorHandler(error, theme);
    //   },
    // });
  };
  useEffect(() => {
    router.push("/dashboard");
  }, [signUpSuccess, router]);

  const handleVisibilityToggle = () => {
    setVisibilityToggle(!visibiltyToggle);
  };
  // useEffect(() => {
  //   if (sendSignUpOtpMutationSuccess) {
  //     setIsOTPModalOpen(true);
  //   }
  // }, [sendSignUpOtpMutationSuccess]);

  return (
    <>
      <Dialog
        open={openSignUpModel}
        onOpenChange={(isOpen: boolean) =>
          !signUpPending && setOpenSignupModal(isOpen)
        }
      >
        <DialogContent className="sm:max-w-[550px] px-0">
          <div className="w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
            <DialogTitle className="font-bold text-xl text-neutral-800 dark:text-neutral-200 mb-4">
              Welcome to ThoughtCanvas!
            </DialogTitle>

            {isOTPModalOpen ? (
              <InputOTPDemo verifySignupOTPMutation={(data: any) => verifySignupOTPMutation(data)} />
            ) : (
              <form className="mt-4 mb-8" onSubmit={handleSubmit(onSubmit)}>
                <DialogDescription className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                  Please Register Yourself!!
                </DialogDescription>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                  <LabelInputContainer>
                    <Label htmlFor="firstname">First name</Label>
                    <Input
                      id="firstname"
                      placeholder="Tyler"
                      type="text"
                      {...register("firstname")}
                      disabled={sendSignOtpMutationPending}
                    />
                    {errors?.firstname?.message && (
                      <p className="text-red-700 mb-4 text-[12px]">
                        {errors.firstname.message}
                      </p>
                    )}
                  </LabelInputContainer>
                  <LabelInputContainer>
                    <Label htmlFor="lastname">Last name</Label>
                    <Input
                      id="lastname"
                      placeholder="Durden"
                      type="text"
                      {...register("lastname")}
                      disabled={sendSignOtpMutationPending}
                    />
                    {errors?.lastname?.message && (
                      <p className="text-red-700 mb-4 text-[12px]">
                        {errors.lastname.message}
                      </p>
                    )}
                  </LabelInputContainer>
                </div>
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    placeholder="projectmayhem@fc.com"
                    type="email"
                    {...register("email")}
                    disabled={sendSignOtpMutationPending}
                  />
                  {errors?.email?.message && (
                    <p className="text-red-700 mb-4 text-[12px]">
                      {errors.email.message}
                    </p>
                  )}
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative w-full">
                    <Input
                      id="password"
                      placeholder="••••••••"
                      type={visibiltyToggle ? "text" : "password"}
                      {...register("password")}
                      disabled={sendSignOtpMutationPending}
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
                  {errors?.password?.message && (
                    <p className="text-red-700 mb-4 text-[12px]">
                      {errors.password.message}
                    </p>
                  )}
                </LabelInputContainer>
                <DialogFooter style={{ flexDirection: "column" }}>
                  <Button
                    className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600  dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] flex justify-center items-center"
                    type="submit"
                    disabled={sendSignOtpMutationPending}
                  >
                    {sendSignOtpMutationPending ? (
                      <>
                        <span className="mx-2">Submitting...</span>{" "}
                        <ButtonLoading />
                      </>
                    ) : (
                      <>Sign up &rarr;</>
                    )}
                    <BottomGradient />
                  </Button>
                  <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <span
                      className="underline underline-offset-4 cursor-pointer"
                      onClick={() => {
                        setOpenSignupModal(!openSignUpModel);
                        setOpenSignInModal(!openSignInModel);
                      }}
                    >
                      Sign in
                    </span>
                  </div>
                  <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
                  <ProviderAuth isPending={sendSignOtpMutationPending} />
                </DialogFooter>
              </form>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

export const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
