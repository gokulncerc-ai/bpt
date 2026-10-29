import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { put } from "@vercel/blob";
import fs from "node:fs/promises";
import path from "node:path";
import { BLOB_ACCESS, blobToken } from "@/lib/storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const msg = (e: unknown) => (e instanceof Error ? e.message : String(e));

export async function GET(req: Request) {
  const key = process.env.HEALTH_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "HEALTH_KEY is not set in this deployment. Add it in Vercel, then Redeploy." },
      { status: 503 }
    );
  }
  if (new URL(req.url).searchParams.get("key") !== key) {
    return NextResponse.json({ error: "Wrong key" }, { status: 403 });
  }

  const out: Record<string, unknown> = {
    node: process.version,
    vercel: process.env.VERCEL ? "yes" : "no",
    // names only, never values
    storageEnvNamesSeen: Object.keys(process.env).filter((k) =>
      /BLOB|KV_|UPSTASH|REDIS|READ_WRITE/i.test(k)
    ),
    blobToken: blobToken() ? "found" : "MISSING",
    redisUrl: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL ? "found" : "MISSING",
    redisToken: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN ? "found" : "MISSING",
    blobAccessMode: BLOB_ACCESS,
  };

  try {
    const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
    if (!url || !token) throw new Error("Redis variables missing");
    out.redis = "ok: " + (await new Redis({ url, token }).ping());
  } catch (e) {
    out.redis = "FAILED: " + msg(e);
  }

  try {
    const b = await put(`health/check-${Date.now()}.txt`, "ok", {
      token: blobToken(),
      access: BLOB_ACCESS,
      contentType: "text/plain",
      addRandomSuffix: true,
    });
    out.blob = "ok: " + b.pathname;
  } catch (e) {
    out.blob = "FAILED: " + msg(e);
  }

  try {
    const sharp = (await import("sharp")).default;
    const buf = await sharp({ create: { width: 4, height: 4, channels: 3, background: "#fff" } })
      .jpeg()
      .toBuffer();
    out.sharp = "ok: " + buf.length + " bytes";
  } catch (e) {
    out.sharp = "FAILED: " + msg(e);
  }

  try {
    await fs.readFile(path.join(process.cwd(), "public", "BPTLOGO3.png"));
    out.logo = "ok";
  } catch (e) {
    out.logo = "not found (PDF will have no logo): " + msg(e);
  }

  return NextResponse.json(out);
}