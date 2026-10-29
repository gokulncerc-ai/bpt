import fs from "node:fs/promises";
import path from "node:path";
import { put } from "@vercel/blob";
import { AppError } from "./errors";
import { uploadDir } from "./uploads";

/** Finds the Blob token, even if a custom prefix was used when connecting the store. */
export function blobToken(): string | undefined {
  if (process.env.BLOB_READ_WRITE_TOKEN) return process.env.BLOB_READ_WRITE_TOKEN;
  const name = Object.keys(process.env).find((k) => k.endsWith("_READ_WRITE_TOKEN"));
  return name ? process.env[name] : undefined;
}

export const BLOB_ACCESS: "public" | "private" =
  process.env.BLOB_ACCESS === "public" ? "public" : "private";

/** Call this BEFORE using up an application number. */
export function assertStorageReady(): void {
  if (process.env.VERCEL && !blobToken()) {
    console.error(
      "Storage not configured: no *_READ_WRITE_TOKEN env var. Connect the Blob store to this project and redeploy."
    );
    throw new AppError(
      "The server is not fully set up yet (file storage missing). Please contact the college office.",
      500
    );
  }
}

export async function saveApplicationPdf(fileName: string, bytes: Uint8Array): Promise<string> {
  const token = blobToken();

  if (token) {
    try {
    const blob = await put(`applications/${fileName}`, Buffer.from(bytes), {
        token,
        access: BLOB_ACCESS,
        contentType: "application/pdf",
        addRandomSuffix: false,
      });
      return blob.pathname;
    } catch (cause) {
    console.error(
            "Storage not configured. Env names seen:",
            Object.keys(process.env).filter((k) => /BLOB|READ_WRITE/i.test(k))
          );
      throw new AppError(
        "Your application could not be stored on the server. Please try again in a few minutes.",
        502,
        { cause }
      );
    }
  }

  // Local computer only
  const dir = uploadDir();
  await fs.mkdir(dir, { recursive: true });
  const full = path.join(dir, fileName);
  await fs.writeFile(full, bytes, { flag: "wx" });
  return full;
}