// import { SidebarDemo } from "@/app/dashboard/page";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <SidebarDemo /> */}
      <main>{children}</main>
    </>
  );
}
