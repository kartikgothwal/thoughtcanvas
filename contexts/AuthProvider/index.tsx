import { IUserProfile } from "@/types";
import React, {
  Context,
  createContext,
  JSX,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthContextType } from "../types";
import { deleteCookies } from "@/utils/Cookies";
import { ToasterError, ToasterSuccess } from "@/utils";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

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
  const router = useRouter();

  const { theme } = useTheme();

  useEffect(() => {
    if (userProfile) {
      localStorage.setItem("userProfile", JSON.stringify(userProfile));
    }
  }, [userProfile]);

  const signOut = (): void => {
    try {
      deleteCookies("all");
      localStorage.removeItem("userProfile");
      ToasterSuccess("You have been logged out", theme!);
      router.push("/");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
      ToasterError("Failed to logout", theme!);
    }
  };
  return (
    <AuthContext.Provider value={{ userProfile, setUserProfile, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuthContext = () => useContext(AuthContext);
export default AuthProvider;
