// "use client";
// import { auth } from "@/config/firebase";
// import {
//   AuthProvider,
//   GoogleAuthProvider,
//   signInWithPopup,
//   UserCredential,
// } from "firebase/auth";

import { About } from "@/components/layout/About";
import { Hero } from "@/components/layout/Hero";
import { Navbar } from "@/components/layout/Navbar";
import dbConnect from "@/config/dbConnect";

const Page = () => {
  dbConnect();
  return (
    <>
      <Navbar />
      <Hero />
      <About />
    </>
  );
};

export default Page;
