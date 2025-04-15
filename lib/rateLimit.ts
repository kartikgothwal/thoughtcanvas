import { IRateLimit } from "@/types";

export async function rateLimit({
  identifier,
  type,
  maxRequests,
  windowSeconds,
}: IRateLimit) {
  return true;
}
