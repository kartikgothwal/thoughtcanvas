import { About } from "@/components/layout/About";
import { Hero } from "@/components/layout/Hero";
import { Navbar } from "@/components/layout/Navbar";
import { NavbarRouteList } from "@/constant";
const Page = () => {
  return (
    <>
      <Navbar routeList={NavbarRouteList} />
      <Hero />
      <About />
    </>
  );
};

export default Page;
