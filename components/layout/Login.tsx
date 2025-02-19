import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { JSX } from "react";
import { BottomGradient, LabelInputContainer } from "./Signup";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { ILoginModalProps } from "@/types"

export default function Login({
  loginModal,
  openSignUpModel,
  setOpenLoginModal,
  setOpenSignupModal,
}: ILoginModalProps): JSX.Element {
  return (
    // <Dialog
    //   open={loginModal}
    //   onOpenChange={(isOpen: boolean) => setOpenLoginModal(isOpen)}
    // >
    //   <DialogTitle className="text-2xl">Login</DialogTitle>
    //   <DialogDescription>
    //     Enter your email below to login to your account
    //   </DialogDescription>

    //   <form>
    //     <div className="flex flex-col gap-6">
    //       <div className="grid gap-2">
    //         <LabelInputContainer className="mb-4">
    //           <Label htmlFor="email">Email Address</Label>
    //           <Input
    //             id="email"
    //             placeholder="projectmayhem@fc.com"
    //             type="email"
    //           />
    //         </LabelInputContainer>
    //       </div>
    //       <div className="grid gap-2">
    //         <div className="flex items-center">
    //           <Label htmlFor="password">Password</Label>
    //           <Link
    //             href="#"
    //             className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
    //           >
    //             Forgot your password?
    //           </Link>
    //         </div>
    //         <Input id="password" placeholder="••••••••" type="password" />{" "}
    //       </div>
    //       <Button type="submit" className="w-full">
    //         Login
    //       </Button>
    //       <div className="flex flex-col gap-4">
    //         <button
    //           className=" relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
    //           type="submit"
    //           onClick={() => {}}
    //         >
    //           <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
    //           <span className="text-neutral-700 dark:text-neutral-300 text-sm">
    //             GitHub &rarr;
    //           </span>
    //           <BottomGradient />
    //         </button>
    //         <button
    //           className=" relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
    //           type="submit"
    //           onClick={() => {}}
    //         >
    //           <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
    //           <span className="text-neutral-700 dark:text-neutral-300 text-sm">
    //             Google &rarr;
    //           </span>
    //           <BottomGradient />
    //         </button>
    //       </div>
    //     </div>
    //     <div className="mt-4 text-center text-sm">
    //       Don&apos;t have an account?{" "}
    //       <Link
    //         href="#"
    //         className="underline underline-offset-4"
    //         onClick={() => {
    //           setOpenSignupModal(!openSignUpModel);
    //           setOpenLoginModal(!loginModal);
    //         }}
    //       >
    //         Sign up
    //       </Link>
    //     </div>
    //   </form>
    // </Dialog>
    <Dialog
      open={loginModal}
      onOpenChange={(isOpen: boolean) => setOpenLoginModal(isOpen)}
    >
      <DialogContent className="sm:max-w-[550px] px-0">
        <div className="w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
          <DialogTitle className="font-bold text-xl text-neutral-800 dark:text-neutral-200 mb-4">
            Login
          </DialogTitle>
          <DialogDescription className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            Enter your email below to login to your account
          </DialogDescription>

          <form className="mt-4 mb-8" onSubmit={(e) => e.preventDefault()}>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                placeholder="projectmayhem@fc.com"
                type="email"
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
               <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <Input id="password" placeholder="••••••••" type="password" />
            </LabelInputContainer>
            <DialogFooter style={{ flexDirection: "column" }}>
              <button
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600  dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] flex justify-center items-center"
                type="submit"
              >
                <>Sign in &rarr;</>

                <BottomGradient />
              </button>
              <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
                <span
                  className="underline underline-offset-4 cursor-pointer"
                  onClick={() => {
                    setOpenSignupModal(!openSignUpModel);
                    setOpenLoginModal(!loginModal);
                  }}
                >
                  Sign out
                </span>
              </div>
              <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

              <div className="flex flex-col gap-4">
                <button
                  className=" relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                  type="submit"
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
                >
                  <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                  <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                    Google &rarr;
                  </span>
                  <BottomGradient />
                </button>
              </div>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
