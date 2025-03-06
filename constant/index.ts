import { RouteProps, statsProps } from "@/types";

export const USER_SIGN_IN = "USER SIGN IN";
export const USER_SIGN_UP = "USER SIGN UP";
export const FORGOT_USER_PASSWORD = "FORGOT USER PASSWORD";
export const RESET_USER_PASSWORD = "RESET USER PASSWORD";
export const CHECK_AUTH_TOKEN = "CHECK AUTH TOKEN";

export const stats: statsProps[] = [
  {
    quantity: "2.7K+",
    description: "Users",
  },
  {
    quantity: "1.8K+",
    description: "Subscribers",
  },
  {
    quantity: "112",
    description: "Downloads",
  },
  {
    quantity: "4",
    description: "Products",
  },
];

export const NavbarRouteList: RouteProps[] = [
  {
    href: "#features",
    label: "Features",
  },
  {
    href: "#testimonials",
    label: "Testimonials",
  },
  {
    href: "#pricing",
    label: "Pricing",
  },
  {
    href: "#faq",
    label: "FAQ",
  },
];

export const ERROR_400 = 400; // Bad Request
export const ERROR_401 = 401; // Unauthorized
export const ERROR_403 = 403; // Forbidden
export const ERROR_404 = 404; // Not Found
export const ERROR_500 = 500; // Internal Server Error
export const ERROR_501 = 501; // Not Implemented
export const ERROR_502 = 502; // Bad Gateway

export const STATUS_CODE_200 = 200; // OK
export const STATUS_CODE_201 = 201; // Created
export const STATUS_CODE_202 = 202; // Accepted
