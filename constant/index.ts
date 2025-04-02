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

export enum HttpStatus {
  CONTINUE = 100,
  SWITCHING_PROTOCOLS = 101,
  PROCESSING = 102,
  EARLYHINTS = 103,
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NON_AUTHORITATIVE_INFORMATION = 203,
  NO_CONTENT = 204,
  RESET_CONTENT = 205,
  PARTIAL_CONTENT = 206,
  AMBIGUOUS = 300,
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  SEE_OTHER = 303,
  NOT_MODIFIED = 304,
  TEMPORARY_REDIRECT = 307,
  PERMANENT_REDIRECT = 308,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  PROXY_AUTHENTICATION_REQUIRED = 407,
  REQUEST_TIMEOUT = 408,
  CONFLICT = 409,
  GONE = 410,
  LENGTH_REQUIRED = 411,
  PRECONDITION_FAILED = 412,
  PAYLOAD_TOO_LARGE = 413,
  URI_TOO_LONG = 414,
  UNSUPPORTED_MEDIA_TYPE = 415,
  REQUESTED_RANGE_NOT_SATISFIABLE = 416,
  EXPECTATION_FAILED = 417,
  I_AM_A_TEAPOT = 418,
  MISDIRECTED = 421,
  UNPROCESSABLE_ENTITY = 422,
  FAILED_DEPENDENCY = 424,
  PRECONDITION_REQUIRED = 428,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
  HTTP_VERSION_NOT_SUPPORTED = 505,
}

export enum ResponseMessages {
  USER_NOT_FOUND = "User with this email doesn't exits",
  USER_ALREADY_EXISTS = "User with this email already exists",
  INTERNAL_SERVER_ERROR = "Internal Server Error",
  PASSWORD_DOESNT_MATCH = "Password doesn't Match",
  SIGN_UP_SUCCESS = "Successfully Signed Up",
  SIGN_IN_SUCCESS = "Successfully Signed In",
  INVALID_TOKEN = "Invalid JWT token",
  AUTHORIZATION_TOKEN_MISSING = "Authorization token missing",
  UNKNOWN_ERROR_OCCURRED = "Unknown error occurred",
  UNEXPECTED_ERROR = "An unexpected error occurred.",
}
