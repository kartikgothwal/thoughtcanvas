"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ResetPasswordSchema } from "@/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { JSX, useState } from "react";
import useResetPassword from "@/apiquery/hooks/useResetPassword";
import { RESET_USER_PASSWORD } from "@/constant";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ButtonLoading, ToastErrorHandler, ToasterSuccess } from "@/utils";

export default function Page(): JSX.Element {
  const { theme } = useTheme();
  const router: AppRouterInstance = useRouter();
  const token: string = usePathname().split("/forgot-password/")[1];
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const { mutate, isPending } = useResetPassword(RESET_USER_PASSWORD, token);

  async function onSubmit(
    newPassword: z.infer<typeof ResetPasswordSchema>
  ): Promise<void> {
    mutate(newPassword, {
      onSuccess: (response) => {
        ToasterSuccess(response.data.message, theme);
        router.push("/");
        form.reset();
      },
      onError: (error: Error) => {
        console.log("Error resetting password", error);
        ToastErrorHandler(error, theme);
      },
    });
  }

  return (
    <div className="h-[35rem] w-full items-center justify-center px-4 mt-[5rem]">
      <Card className="mx-auto max-w-[32rem]">
        <CardHeader className="">
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>
            Enter your new password to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="password">New Password</FormLabel>
                      <FormControl>
                        <Input
                          id="password"
                          type={`${showPassword ? "text" : "password"}`}
                          placeholder="******"
                          autoComplete="new-password"
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="confirmPassword">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="confirmPassword"
                          type={`${showPassword ? "text" : "password"}`}
                          placeholder="******"
                          autoComplete="new-password"
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center space-x-2 my-2">
                  <Checkbox
                    id="showpassword"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                  <label
                    htmlFor="showpassword"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Show Password
                  </label>
                </div>
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? (
                    <>
                      <span className="mx-2">Resetting...</span>{" "}
                      <ButtonLoading />
                    </>
                  ) : (
                    <>Reset Password &rarr;</>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
