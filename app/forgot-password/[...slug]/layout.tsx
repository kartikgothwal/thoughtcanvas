import { Navbar } from "@/components/layout/Navbar";
import { Geist, Geist_Mono } from "next/font/google";
import React, {JSX} from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>):Promise<JSX.Element> {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar routeList={[]}/>
        {children}
      </body>
    </html>
  );
}
export default RootLayout;
