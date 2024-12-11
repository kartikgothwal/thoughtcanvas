import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/app/Provider";
import { ModeToggle } from "@/components/toogle-mode";
 
export const metadata: Metadata = {
  title: "ThoughtsCanvas",
  description: "Create your own thoughts in a Canvas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <body className={""}>
        <Provider>
          <ModeToggle />
          {children}
        </Provider>
      </body>
    </html>
  );
}
