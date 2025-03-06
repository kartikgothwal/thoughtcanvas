import { IUserProfile } from "@/types";
import React, { Context, createContext, JSX, useState } from "react";
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
  return (
    <AuthContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
