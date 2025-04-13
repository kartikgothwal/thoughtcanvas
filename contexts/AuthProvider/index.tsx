import { IUserProfile } from "@/types";
import React, { Context, createContext, JSX, useEffect, useState } from "react";
import { AuthContextType } from "../types";

export const AuthContext: Context<AuthContextType | undefined> = createContext<
  AuthContextType | undefined
>(undefined);

const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [userProfile, setUserProfile] = useState<IUserProfile | undefined>(
    undefined
  );
  useEffect(() => {
    if (userProfile) {
      console.log("🚀 ~ useEffect ~ userProfile:", userProfile);
    }
  }, [userProfile]);
  return (
    <AuthContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
