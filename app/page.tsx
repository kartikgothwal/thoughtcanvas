import { About } from "@/components/layout/About";
import { Hero } from "@/components/layout/Hero";
import { Navbar } from "@/components/layout/Navbar";
 
const Page = () => {
  console.log("home page")
  return (
    <>
      <Navbar />
      <Hero />
      <About />
    </>
  );
};

export default Page;
