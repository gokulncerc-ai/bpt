import crypto from "node:crypto";
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
import { AppError } from "@/lib/errors";
import { toPdfJpeg } from "@/lib/images";
import { sendApplicationEmails } from "@/lib/mailer";
import { saveApplicationPdf } from "@/lib/storage";

export const runtime = "nodejs"; // file system + image processing
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/* Tiny in-memory rate limit: 5 submissions / 10 minutes per IP (per server instance). */
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
  const ref = crypto.randomBytes(3).toString("hex"); // quote this to the college if something fails
  const fail = (message: string, status: number) =>
    NextResponse.json({ error: `${message} (Ref: ${ref})` }, { status });

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
  } catch (err) {
    console.error(`[application ${ref}] could not read form data:`, err);
    return fail("We could not read your form. Please check your photo and signature sizes and try again.", 400);
  }

  // Honeypot
  if (String(form.get("website") ?? "").trim() !== "") {
    return NextResponse.json({ ok: true, applicationNo: "RECEIVED" });
  }

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

  values.applicantName = values.applicantName.toUpperCase().replace(/\s+/g, " ");
  for (const k of ["fatherName", "motherName", "religion", "claim", "bank"]) {
    values[k] = ucwords(values[k]);
  }

  try {
    // 1) application number
    const number = await nextApplicationNumber();
    const padded = String(number).padStart(3, "0");
    const applicationNo = `${APPLICATION_PREFIX} - ${padded}`;

    const stamp = istStamp(new Date());
    const rand = crypto.randomBytes(3).toString("hex");
    const fileName = `${stamp.date}_${stamp.time}_${APPLICATION_PREFIX.toLowerCase()}-${padded}_${slugify(values.applicantName)}_${rand}.pdf`;

    // 2) build the PDF
    let pdfBytes: Uint8Array;
    try {
      pdfBytes = await buildApplicationPdf({
        values,
        applicationNo,
        submittedAt: stamp.pretty,
        photoJpeg,
        signatureJpeg,
      });
    } catch (cause) {
      throw new AppError("We could not create your application PDF. Please try again.", 500, { cause });
    }

    // 3) store it
    const savedTo = await saveApplicationPdf(fileName, pdfBytes);
    console.log(`[application ${ref}] ${applicationNo} saved: ${savedTo}`);

    // 4) email copies (never fails the request)
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
    console.error(`[application ${ref}] failed:`, err);
    if (err instanceof AppError) return fail(err.userMessage, err.status);
    return fail("We could not save your application. Please try again.", 500);
  }
}