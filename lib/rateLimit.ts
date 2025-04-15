import { IRateLimit } from "@/types";

const WINDOW_SIZE_IN_SECONDS = 60;
const MAX_REQUESTS_PER_WINDOW = 10;

export async function rateLimit({
  identifier,
  type,
  maxRequests,
  windowSeconds,
}: IRateLimit) {
  return true;
}
