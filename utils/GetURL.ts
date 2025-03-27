import { FORGOT_USER_PASSWORD, RESET_USER_PASSWORD, USER_SIGN_IN, USER_SIGN_UP } from "@/constant";

export const getURL: (queryKey: string) => string = (
  queryKey: string
): string => {
  switch (queryKey) {
    case USER_SIGN_IN:
      return "sign-in";
    case USER_SIGN_UP:
      return "sign-up";
    case FORGOT_USER_PASSWORD:
      return "forgot-password";
    case RESET_USER_PASSWORD:
      return "reset-password";
    default:
      return "";
  }
};
