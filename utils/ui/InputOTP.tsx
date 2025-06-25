"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useTheme } from "next-themes";
import { AxiosResponse } from "axios";
import { UseMutateFunction } from "@tanstack/react-query";
import ToastErrorHandler from "../ToastErrorHandler";
import { verifySignupOTP } from "@/zod";

export default function InputOTPDemo({
  verifySignupOTPMutation,
}: {
  verifySignupOTPMutation: UseMutateFunction<
    AxiosResponse<unknown, unknown>,
    Error,
    unknown,
    unknown
  >;
}) {
  const { theme } = useTheme();

  const form = useForm<z.infer<typeof verifySignupOTP>>({
    resolver: zodResolver(verifySignupOTP),
    defaultValues: {
      pin: "",
    },
  });

  function onSubmit(data: z.infer<typeof verifySignupOTP>) {
    verifySignupOTPMutation(data, {
      onError: (error: unknown) => {
        ToastErrorHandler(error, theme);
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 space-y-6 flex flex-col gap-5 text-sm"
        style={{ padding: "1.5rem 0" }}
      >
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-4">
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time password sent to your mail.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
