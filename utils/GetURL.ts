import {
  FORGOT_USER_PASSWORD,
  SEND_SIGNUP_OTP,
  RESET_USER_PASSWORD,
  USER_SIGN_IN,
  USER_SIGN_UP,
  VERIFY_SIGNUP_OTP,
} from "@/constant";

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
    case SEND_SIGNUP_OTP:
      return "send-signup-otp";
    case VERIFY_SIGNUP_OTP:
      return "verify-signup-otp";
    default:
      return "";
  }
};
