import fs from "node:fs/promises";
import path from "node:path";
import { put } from "@vercel/blob";
import { AppError } from "./errors";
import { uploadDir } from "./uploads";

/**
 * Saves the finished PDF.
 * - On Vercel: Vercel Blob (the only place that survives between requests).
 * - On your PC: public/uploads (or UPLOAD_DIR), as before.
 * Returns where it was saved (a URL or a file path).
 */
export async function saveApplicationPdf(fileName: string, bytes: Uint8Array): Promise<string> {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const blob = await put(`applications/${fileName}`, Buffer.from(bytes), {
        access: "public", // the random part of the file name makes the URL hard to guess
        contentType: "application/pdf",
        addRandomSuffix: false,
      });
      return blob.url;
    } catch (cause) {
      throw new AppError(
        "Your application could not be stored on the server. Please try again in a few minutes.",
        502,
        { cause }
      );
    }
  }

  if (process.env.VERCEL) {
    throw new AppError(
      "The server is not fully set up yet (file storage missing). Please contact the college office.",
      500
    );
  }

  const dir = uploadDir();
  await fs.mkdir(dir, { recursive: true });
  const full = path.join(dir, fileName);
  await fs.writeFile(full, bytes, { flag: "wx" });
  return full;
}