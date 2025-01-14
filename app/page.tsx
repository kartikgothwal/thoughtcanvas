// "use client";
// import { auth } from "@/config/firebase";
// import {
//   AuthProvider,
//   GoogleAuthProvider,
//   signInWithPopup,
//   UserCredential,
// } from "firebase/auth";

import dbConnect from "@/config/dbConnect";

const Page = () => {
  dbConnect();
  return <>hellow world</>
};

export default Page;
