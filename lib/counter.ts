import fs from "node:fs/promises";
import path from "node:path";
import { Redis } from "@upstash/redis";
import { AppError } from "./errors";

/**
 * Sequential application number (001, 002, ...).
 * - On Vercel: Upstash Redis (atomic INCR, shared by every server instance).
 * - On your PC (no Redis variables): the old text file, so localhost keeps working.
 *
 * To start from another number on Vercel, set the key in the Upstash console, e.g.
 *   SET bpt:application-counter:2026-27 0      (next application becomes 001)
 */
const REDIS_KEY = "bpt:application-counter:2026-27";

function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return url && token ? new Redis({ url, token }) : null;
}

const counterFile = () =>
  process.env.COUNTER_FILE || path.join(process.cwd(), "data", "application-counter.txt");

let queue: Promise<unknown> = Promise.resolve();

function nextFromFile(): Promise<number> {
  const run = queue.then(async () => {
    const file = counterFile();
    await fs.mkdir(path.dirname(file), { recursive: true });
    let n = 0;
    try {
      n = parseInt((await fs.readFile(file, "utf8")).trim(), 10) || 0;
    } catch {
      /* first application: start at 0 */
    }
    n += 1;
    await fs.writeFile(file, String(n).padStart(3, "0"));
    return n;
  });
  queue = run.catch(() => undefined);
  return run;
}

export async function nextApplicationNumber(): Promise<number> {
  const redis = getRedis();
  if (redis) {
    try {
      return await redis.incr(REDIS_KEY);
    } catch (cause) {
      throw new AppError(
        "The application number service is not reachable right now. Please try again in a few minutes.",
        503,
        { cause }
      );
    }
  }
  if (process.env.VERCEL) {
    throw new AppError(
      "The server is not fully set up yet (application counter missing). Please contact the college office.",
      500
    );
  }
  return nextFromFile();
}