import { redis } from "@/config";
import { IRateLimit } from "@/types";

export async function rateLimit({
  identifier,
  maxRequest = 10,
  windowSizeInSeconds = 60,
}: IRateLimit): Promise<boolean> {
  const requests: string | null = await redis.get(`${identifier}:requests`);
  if (!requests) {
    await redis.set(`${identifier}:requests`, 1, "EX", windowSizeInSeconds);
    return true;
  }
  const requestsCount: number = parseInt(requests, 10);
  if (requestsCount > maxRequest) {
    return false;
  }
  await redis.incr(`${identifier}:requests`);
  return true;
}
