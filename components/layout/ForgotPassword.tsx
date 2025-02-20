import React, { JSX } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "../ui/dialog";
import { BottomGradient, LabelInputContainer } from "./Signup";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ButtonLoading } from "@/utils";
import { useMutationQueries } from "@/apiquery/useApiQuery";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ForgotPasswordSchema } from "@/zod";
import { zodResolver } from "@hookform/resolvers/zod";

type ForgotPasswordType = z.infer<typeof ForgotPasswordSchema>;

const ForgotPassword = ({
  forgotPasswordModel,
  setForgotPasswordModal,
}: {
  forgotPasswordModel: boolean;
  setForgotPasswordModal: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element => {
  const { mutate: forgotPasswordMutation, isPending } = useMutationQueries(
    "forgotPassword",
    "forgot-password"
  );
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<ForgotPasswordType>({
    resolver: zodResolver(ForgotPasswordSchema),
  });
  const onSubmit = (userEmail: { email: string }) => {
    forgotPasswordMutation(userEmail, {
      onSuccess: (response) => {
        console.log("🚀 ~ onSubmit ~ response:", response);
      },
      onError: (error) => {
        console.log("🚀 ~ onSubmit ~ error:", error);
      },
    });
  };
  return (
    <Dialog
      open={forgotPasswordModel}
      onOpenChange={(isOpen: boolean) => setForgotPasswordModal(isOpen)}
    >
      <DialogContent className="sm:max-w-[550px] px-0">
        <div className="w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
          <DialogTitle className="font-bold text-xl text-neutral-800 dark:text-neutral-200 mb-4">
            Reset Password
          </DialogTitle>
          <DialogDescription className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            A Link to reset password will be sent to your email
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
              <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPassword;
