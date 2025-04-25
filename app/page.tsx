import { About } from "@/components/layout/About";
import { Hero } from "@/components/layout/Hero";
import { Navbar } from "@/components/layout/Navbar";
import { NavbarRouteList } from "@/constant";
import { JSX } from "react";
const Page = ():JSX.Element => {
  return (
    <>
      <Navbar routeList={NavbarRouteList} />
      <Hero />
      <About />
    </>
  );
};

export default Page;
