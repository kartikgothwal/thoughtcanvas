import { About } from "@/components/layout/About";
import { Hero } from "@/components/layout/Hero";
import { Navbar } from "@/components/layout/Navbar";
import LoadingSpinner from "@/utils/LoadingUI";
const Page = () => {
  return (
    <div className="flex justify-center items-center">
      {/* <Navbar />
      <Hero />
      <About /> */}
      <LoadingSpinner />
    </div>
  );
};

export default Page;
