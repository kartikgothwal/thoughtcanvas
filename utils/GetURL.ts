import { FORGOT_USER_PASSWORD, USER_SIGN_IN, USER_SIGN_UP } from "@/constant";

export const getURL: (queryKey: string) => string = (
  queryKey: string
): string => {
  switch (queryKey) {
    case USER_SIGN_IN:
      return "signin";
    case USER_SIGN_UP:
      return "signup";
    case FORGOT_USER_PASSWORD:
      return "forgot-password";
    default:
      return "";
  }
};
