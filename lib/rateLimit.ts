import { redis } from "@/config";
import { IRateLimit } from "@/types";

const WINDOW_SIZE_IN_SECONDS = 60;
const MAX_REQUESTS_PER_WINDOW = 10;

export async function rateLimit({ identifier, type }: IRateLimit):Promise<boolean> {
  const requests: string | null = await redis.get(`${identifier}:requests`);
  if (!requests) {
    await redis.set(`${identifier}:requests`, 1, "EX", WINDOW_SIZE_IN_SECONDS);
    return true;
  }
  const requestsCount:number = parseInt(requests, 10);
  if(requestsCount > MAX_REQUESTS_PER_WINDOW) {
    return false;
  }
  await redis.incr(`${identifier}:requests`);
  return true;
}
