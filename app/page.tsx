// "use client";
// import { auth } from "@/config/firebase";
// import {
//   AuthProvider,
//   GoogleAuthProvider,
//   signInWithPopup,
//   UserCredential,
// } from "firebase/auth";

import { ModeToggle } from "@/components/ui/mode-toggle";
import dbConnect from "@/config/dbConnect";

const Page = () => {
  dbConnect();
  return <><ModeToggle /></>
};

export default Page;
