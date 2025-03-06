"use client";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "@/contexts/AuthProvider";
import React, {JSX} from "react";
const queryClient: QueryClient = new QueryClient();
const Provider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>):JSX.Element => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
};

export default Provider;
