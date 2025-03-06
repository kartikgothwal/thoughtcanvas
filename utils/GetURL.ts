import { USER_SIGN_IN } from "@/constant";

export const getURL: (queryKey: string) => string = (
  queryKey: string
): string => {
  switch (queryKey) {
    case USER_SIGN_IN:
      return "signin";
    default:
      return "";
  }
};
