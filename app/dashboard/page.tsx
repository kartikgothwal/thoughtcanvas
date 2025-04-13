"use client";
import React, { JSX, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { deleteCookies } from "@/utils/Cookies";
import { ToasterError, ToasterSuccess } from "@/utils/Toast";
import { useTheme, UseThemeProps } from "next-themes";
import { useRouter } from "next/navigation";
import { Logo, LogoIcon } from "@/app/dashboard/Logo";
import { TopBar } from "./Topbar";
export default function SidebarDemo(): JSX.Element {
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "/profile",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "/settings",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "/",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      onClick: () => handleLogOut(),
    },
  ];
  const [open, setOpen] = useState(false);
  const theme: UseThemeProps = useTheme();
  const router = useRouter();
  const handleLogOut = () => {
    try {
      deleteCookies("all");
      ToasterSuccess("You have been logged out", theme.theme!);
      router.push("/");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
      ToasterError("Failed to logout", theme.theme!);
    }
  };
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 flex-1  max-w-full mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Kartik Gothwal",
                href: "#",
                icon: (
                  <Image
                    src="/"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}

const Dashboard = () => {
  return (
    <div className="flex flex-1 ">
      <div className="p-2 md:p-5 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-4 flex-1 w-full h-full">
        <TopBar />

        <div className="flex gap-2 flex-1 flex-col">
          <div className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 p-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque,
            minus?
          </div>
        </div>
      </div>
    </div>
  );
};
