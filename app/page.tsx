import { About } from "@/components/layout/About";
import { Hero } from "@/components/layout/Hero";
import { Navbar } from "@/components/layout/Navbar";
const Page = () => {
  // const { data, isLoading, error } = useGetQueries("sproducts", "sproducts");
  // console.log("🚀 ~ Page ~ data:", data);
  // console.log("🚀 ~ Page ~ error:", error);
  // console.log("🚀 ~ Page ~ isLoading:", isLoading);
  return (
    <>
      <Navbar />
      <Hero />
      <About />
    </>
  );
};

export default Page;
