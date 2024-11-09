"use client";
import {SessionProvider} from "next-auth/react";
import {ThemeProvider} from "@/components/theme-provider";

const Provider =({children}: {children: React.ReactNode}):JSX.Element => {
    return (<>
        <SessionProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >{children}
            </ThemeProvider>
        </SessionProvider>
    </>)
}
export default Provider;