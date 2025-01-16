// "use client";
// import { auth } from "@/config/firebase";
// import {
//   AuthProvider,
//   GoogleAuthProvider,
//   signInWithPopup,
//   UserCredential,
// } from "firebase/auth";

import { Hero } from "@/components/layout/Hero";
import { Navbar } from "@/components/layout/Navbar";
import { ModeToggle } from "@/components/ui/mode-toggle";
import dbConnect from "@/config/dbConnect";

const Page = () => {
  dbConnect();
  return (
    <>
      <Navbar />
      <Hero />
    </>
  );
};

export default Page;
