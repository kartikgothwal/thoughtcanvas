import { About } from "@/components/layout/About";
import { Hero } from "@/components/layout/Hero";
import { Navbar } from "@/components/layout/Navbar";
import LoadingSpinner from "@/utils/LoadingUI";
const Page = () => {
  return (
    <>
      {!false && <LoadingSpinner />}

      <Navbar />
      <Hero />
      <About />
    </>
  );
};

export default Page;
