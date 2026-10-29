import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import {
  ALL_KEYS,
  APPLICATION_PREFIX,
  emptyValues,
  ucwords,
  validate,
  validateImageFile,
} from "@/lib/applicationFields";
import { buildApplicationPdf, istStamp, slugify } from "@/lib/applicationPdf";
import { nextApplicationNumber } from "@/lib/counter";
import { toPdfJpeg } from "@/lib/images";
import { sendApplicationEmails } from "@/lib/mailer";
import { uploadDir } from "@/lib/uploads";

export const runtime = "nodejs"; // file system + image processing
export const dynamic = "force-dynamic";

/* Tiny in-memory rate limit: 5 submissions / 10 minutes per IP. */
const hits = new Map<string, number[]>();
function tooMany(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const asFile = (v: FormDataEntryValue | null): File | null =>
  v && typeof v !== "string" ? v : null;

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (tooMany(ip)) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real people never fill this hidden field, bots do.
  if (String(form.get("website") ?? "").trim() !== "") {
    return NextResponse.json({ ok: true, applicationNo: "RECEIVED" });
  }

  // Only the known fields, as trimmed strings.
  const values = emptyValues();
  for (const k of ALL_KEYS) {
    const raw = form.get(k);
    values[k] = typeof raw === "string" ? raw.trim() : "";
  }

  const errors = validate(values);
  if (form.get("declaration") !== "true") errors.declaration = "Please accept the declaration";

  const photo = asFile(form.get("photo"));
  const signature = asFile(form.get("signature"));
  if (!photo) errors.photo = "Please upload your passport size photo";
  else {
    const e = validateImageFile(photo, "photo");
    if (e) errors.photo = e;
  }
  if (!signature) errors.signature = "Please upload your signature";
  else {
    const e = validateImageFile(signature, "signature");
    if (e) errors.signature = e;
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  // Convert both images to a PDF-safe JPEG (handles WebP / phone photos).
  let photoJpeg: Buffer;
  let signatureJpeg: Buffer;
  try {
    photoJpeg = await toPdfJpeg(Buffer.from(await photo!.arrayBuffer()), 420, 540);
  } catch {
    return NextResponse.json(
      { errors: { photo: "We could not read this photo. Please upload a JPG or PNG image." } },
      { status: 400 }
    );
  }
  try {
    signatureJpeg = await toPdfJpeg(Buffer.from(await signature!.arrayBuffer()), 600, 240);
  } catch {
    return NextResponse.json(
      { errors: { signature: "We could not read this signature. Please upload a JPG or PNG image." } },
      { status: 400 }
    );
  }

  // Tidy the text the same way the PHP version did (strtoupper / ucwords).
  values.applicantName = values.applicantName.toUpperCase().replace(/\s+/g, " ");
  for (const k of ["fatherName", "motherName", "religion", "claim", "bank"]) {
    values[k] = ucwords(values[k]);
  }

  try {
    const number = await nextApplicationNumber();
    const padded = String(number).padStart(3, "0");
    const applicationNo = `${APPLICATION_PREFIX} - ${padded}`;

    const stamp = istStamp(new Date());
    const rand = crypto.randomBytes(3).toString("hex"); // makes the file name hard to guess

    // 2026-10-28_14-35-02_pkdcp-001_anu-k-s_a1b2c3.pdf  -> sorts by date and time
    const fileName = `${stamp.date}_${stamp.time}_${APPLICATION_PREFIX.toLowerCase()}-${padded}_${slugify(values.applicantName)}_${rand}.pdf`;

    const pdfBytes = await buildApplicationPdf({
      values,
      applicationNo,
      submittedAt: stamp.pretty,
      photoJpeg,
      signatureJpeg,
    });

    const dir = uploadDir();
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path.join(dir, fileName), pdfBytes, { flag: "wx" });

    // Email a copy to the college and the applicant (only if SMTP is configured).
    const downloadName = `${APPLICATION_PREFIX}-${padded}_${slugify(values.applicantName)}.pdf`;
    const mail = await sendApplicationEmails({
      applicantEmail: values.email,
      applicantName: values.applicantName,
      applicationNo,
      fileName: downloadName,
      pdf: pdfBytes,
    });

    return NextResponse.json({
      ok: true,
      applicationNo,
      emailed: mail.applicant,
      downloadName,
      pdfBase64: Buffer.from(pdfBytes).toString("base64"),
    });
  } catch (err) {
    console.error("Failed to save application PDF:", err);
    return NextResponse.json(
      { error: "We could not save your application. Please try again." },
      { status: 500 }
    );
  }
}