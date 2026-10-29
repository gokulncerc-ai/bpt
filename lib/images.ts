import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ALLOWED = new Set(["jpeg", "png", "webp", "gif","jpg"]);
/**
 * Turns ANY uploaded photo (JPG / PNG / WebP / GIF, phone photos included)
 * into a small flat JPEG that the PDF library can embed.
 * Same idea as convertImageForPdf() in the PHP version.
 */
export async function toPdfJpeg(input: Buffer, maxW: number, maxH: number): Promise<Buffer> {
  const img = sharp(input, { failOn: "error" });
  const meta = await img.metadata();
  if (!meta.format || !ALLOWED.has(meta.format)) throw new Error("Unsupported image format");
  return img
    .rotate() // respect the phone's EXIF orientation
    .flatten({ background: "#ffffff" }) // transparent areas -> white
    .resize({ width: maxW, height: maxH, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 85 })
    .toBuffer();
}

let logoCache: Promise<Buffer | null> | null = null;

/** public/BPTLOGO3.png, shrunk once so every PDF stays small. */
export function getLogoPng(): Promise<Buffer | null> {
  if (!logoCache) {
    logoCache = (async () => {
      try {
        const buf = await fs.readFile(path.join(process.cwd(), "public", "BPTLOGO3.png"));
        return await sharp(buf)
          .resize({ width: 600, withoutEnlargement: true })
          .png({ compressionLevel: 9 })
          .toBuffer();
      } catch {
        return null; // no logo file: the PDF just starts with text
      }
    })();
  }
  return logoCache;
}