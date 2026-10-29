import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFImage } from "pdf-lib";
import {
  ACADEMIC_YEAR,
  AGE_AS_ON_LABEL,
  COLLEGE_ADDRESS,
  COLLEGE_NAME,
  COURSE_NAME,
  MARK_COLUMNS,
  SUBJECTS,
  ageOn,
  computeTotals,
  declarationText,
  fmtDate,
  markKey,
  type Values,
} from "./applicationFields";
import { getLogoPng } from "./images";

/* ------------------------------------------------------------------ helpers */

const hex = (h: string) =>
  rgb(
    parseInt(h.slice(1, 3), 16) / 255,
    parseInt(h.slice(3, 5), 16) / 255,
    parseInt(h.slice(5, 7), 16) / 255
  );

const NAVY = hex("#1e3c76");
const SKY = hex("#29aad8");
const GREEN = hex("#43ab5e");
const INK = hex("#12244a");
const MUTED = hex("#4b5d7a");
const TINT = hex("#e8f4fb");
const LINE = hex("#dce6f2");
const GRID = hex("#b9c7da");
const WHITE = hex("#ffffff");

/** Date / time in Indian Standard Time, used for file names and the PDF. */
export function istStamp(d: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "00";
  return {
    date: `${get("year")}-${get("month")}-${get("day")}`, // 2026-10-28
    time: `${get("hour")}-${get("minute")}-${get("second")}`, // 14-35-02
    pretty:
      new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "medium",
        timeStyle: "medium",
      }).format(d) + " IST",
  };
}

export function slugify(s: string): string {
  return (
    s
      .normalize("NFKD")
      .replace(/[^\w\s-]/g, "")
      .trim()
      .toLowerCase()
      .replace(/[\s_]+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 40) || "applicant"
  );
}

/** The built-in PDF fonts only cover Latin text; anything else becomes "?". */
function safe(s: string, font: PDFFont): string {
  return Array.from(s.replace(/\r/g, "").replace(/\t/g, " "))
    .map((ch) => {
      if (ch === "\n") return ch;
      try {
        font.widthOfTextAtSize(ch, 10);
        return ch;
      } catch {
        return "?";
      }
    })
    .join("");
}

function wrap(text: string, font: PDFFont, size: number, maxW: number): string[] {
  const out: string[] = [];
  for (const para of text.split("\n")) {
    const words = para.split(/\s+/).filter(Boolean);
    if (!words.length) {
      out.push("");
      continue;
    }
    let line = "";
    for (let word of words) {
      while (font.widthOfTextAtSize(word, size) > maxW) {
        let i = word.length;
        while (i > 1 && font.widthOfTextAtSize(word.slice(0, i), size) > maxW) i--;
        if (line) {
          out.push(line);
          line = "";
        }
        out.push(word.slice(0, i));
        word = word.slice(i);
      }
      const test = line ? `${line} ${word}` : word;
      if (font.widthOfTextAtSize(test, size) <= maxW) line = test;
      else {
        out.push(line);
        line = word;
      }
    }
    if (line) out.push(line);
  }
  return out;
}

/** Shrinks the font size until the text fits in maxW. */
function fit(text: string, font: PDFFont, size: number, maxW: number, min = 6.5): number {
  let s = size;
  while (s > min && font.widthOfTextAtSize(text, s) > maxW) s -= 0.25;
  return s;
}

/** Scales an image to fit inside a box, keeping its proportions. */
function contain(img: PDFImage, boxW: number, boxH: number) {
  const k = Math.min(boxW / img.width, boxH / img.height);
  return { w: img.width * k, h: img.height * k };
}

/* ---------------------------------------------------------------- the PDF */

const W = 595.28; // A4
const H = 841.89;
const M = 40;

export interface PdfInput {
  values: Values; // already cleaned (names upper-cased etc.)
  applicationNo: string; // "PKDCP - 001"
  submittedAt: string; // pretty IST string
  photoJpeg: Uint8Array;
  signatureJpeg: Uint8Array;
}

export async function buildApplicationPdf(input: PdfInput): Promise<Uint8Array> {
  const { values: v, applicationNo, submittedAt } = input;

  const pdf = await PDFDocument.create();
  pdf.setTitle(`Application ${applicationNo} - ${v.applicantName}`);
  pdf.setAuthor("P K Das College of Physiotherapy");
  pdf.setSubject(`${COURSE_NAME} admission application ${ACADEMIC_YEAR}`);

  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

  let page = pdf.addPage([W, H]);

  /* ------------------------------------------------------- header band */
  const bandH = 112;
  page.drawRectangle({ x: 0, y: H - bandH, width: W, height: bandH, color: NAVY });
  page.drawRectangle({ x: 0, y: H - bandH, width: W, height: 4, color: SKY });

  // passport photo, top right
  const photo = await pdf.embedJpg(input.photoJpeg);
  const pBox = contain(photo, 62, 80);
  const px = W - M - pBox.w;
  const py = H - bandH + (bandH - pBox.h) / 2;
  page.drawRectangle({ x: px - 3, y: py - 3, width: pBox.w + 6, height: pBox.h + 6, color: WHITE });
  page.drawImage(photo, { x: px, y: py, width: pBox.w, height: pBox.h });

  // logo, top left, on a white tile (the logo has navy text)
  let textX = M;
  const logoBytes = await getLogoPng();
  if (logoBytes) {
    const logo = await pdf.embedPng(logoBytes);
    const lBox = contain(logo, 120, 74);
    page.drawRectangle({
      x: M,
      y: H - bandH + 14,
      width: lBox.w + 14,
      height: bandH - 28,
      color: WHITE,
    });
    page.drawImage(logo, {
      x: M + 7,
      y: H - bandH + 14 + (bandH - 28 - lBox.h) / 2,
      width: lBox.w,
      height: lBox.h,
    });
    textX = M + lBox.w + 14 + 18;
  }

  const textMaxW = px - 16 - textX;
  const headLines: [string, PDFFont, number, ReturnType<typeof hex>][] = [
    [`Application for Admission ${ACADEMIC_YEAR}`, bold, 16, WHITE],
    [COURSE_NAME, regular, 11, WHITE],
    ["P K Das College of Physiotherapy", regular, 9.5, hex("#cfe3f5")],
    [COLLEGE_ADDRESS, regular, 8, hex("#cfe3f5")],
  ];
  let hy = H - 38;
  for (const [t, f, s, c] of headLines) {
    const txt = safe(t, f);
    page.drawText(txt, { x: textX, y: hy, size: fit(txt, f, s, textMaxW), font: f, color: c });
    hy -= s + 7;
  }

  let y = H - bandH - 26;

  const contentW = W - M * 2;
  const labelW = 170;
  const valueW = contentW - labelW - 12;

  const ensure = (space: number) => {
    if (y - space < M + 24) {
      page = pdf.addPage([W, H]);
      page.drawText(safe(`Application ${applicationNo} (continued)`, regular), {
        x: M,
        y: H - M,
        size: 9,
        font: regular,
        color: MUTED,
      });
      y = H - M - 24;
    }
  };

  const heading = (title: string, needBelow = 12) => {
    ensure(36 + needBelow); // keep the heading on the same page as what follows it
    page.drawRectangle({ x: M, y: y - 22, width: contentW, height: 24, color: TINT });
    page.drawRectangle({ x: M, y: y - 22, width: 4, height: 24, color: GREEN });
    page.drawText(title, { x: M + 14, y: y - 15, size: 11, font: bold, color: NAVY });
    y -= 36;
  };

  const row = (label: string, value: string) => {
    const lines = wrap(safe(value || "-", regular), regular, 10.5, valueW);
    const labelLines = wrap(safe(label, bold), bold, 9.5, labelW);
    const rowH = Math.max(lines.length * 14, labelLines.length * 13) + 8;
    ensure(rowH);
    labelLines.forEach((l, i) =>
      page.drawText(l, { x: M + 6, y: y - 11 - i * 13, size: 9.5, font: bold, color: MUTED })
    );
    lines.forEach((l, i) =>
      page.drawText(l, { x: M + labelW + 12, y: y - 11 - i * 14, size: 10.5, font: regular, color: INK })
    );
    page.drawLine({
      start: { x: M, y: y - rowH + 2 },
      end: { x: M + contentW, y: y - rowH + 2 },
      thickness: 0.5,
      color: LINE,
    });
    y -= rowH;
  };

  const table = (headers: string[], rows: string[][], widths: number[], boldRows: number[] = []) => {
    const rowH = 22;
    ensure(rowH * (rows.length + 1) + 12);
    const all = [headers, ...rows];
    all.forEach((cells, r) => {
      let x = M;
      const top = y - r * rowH;
      cells.forEach((cell, c) => {
        page.drawRectangle({
          x,
          y: top - rowH,
          width: widths[c],
          height: rowH,
          borderColor: GRID,
          borderWidth: 0.7,
          color: r === 0 ? TINT : undefined,
        });
        const font = r === 0 || c === 0 || boldRows.includes(r) ? bold : regular;
        const txt = safe(cell, font);
        page.drawText(txt, {
          x: x + 8,
          y: top - rowH + 7.5,
          size: fit(txt, font, 9.5, widths[c] - 14),
          font,
          color: r === 0 ? NAVY : INK,
        });
        x += widths[c];
      });
    });
    y -= rowH * all.length + 14;
  };

  /* ------------------------------------------------------------ sections */
  heading("Application Details");
  row("Application Number", applicationNo);
  row("Date and Time", submittedAt);
  row("Course Applied", COURSE_NAME);
  row("Admission Category / Quota", v.admissionQuota);
  row("Name of the College", COLLEGE_NAME);
  y -= 10;

  heading("Applicant Details");
  row("Name in Block Letters", v.applicantName);
  row("Sex", v.gender);
  row("Date of Birth", fmtDate(v.dateOfBirth));
  row(`Age as on ${AGE_AS_ON_LABEL}`, String(ageOn(v.dateOfBirth) ?? ""));
  row("Name of Father", v.fatherName);
  row("Name of Mother", v.motherName);
  row("Religion & Community", v.religion);
  row("Permanent Address", v.permanentAddress);
  row("Address for Communication", v.communicationAddress);
  row("Phone Number", v.phoneNo);
  row("Mobile No", v.mobileNo);
  row("Email Address", v.email);
  row("Family Annual Income", v.income);
  row("Stream", v.stream);
  row("Reservation / other benefits claimed", v.claim);
  y -= 10;

  heading("Marks Obtained - Higher Secondary", 22 * (SUBJECTS.length + 2) + 14);
  const totals = computeTotals(v);
  const cw = [150, (contentW - 150) / 3, (contentW - 150) / 3, (contentW - 150) / 3];
  table(
    ["Subject", ...MARK_COLUMNS.map((c) => c.label)],
    [
      ...SUBJECTS.map((s) => [
        s.label,
        ...MARK_COLUMNS.map((c) => v[markKey(s.key, c.key)] || "-"),
      ]),
      ["Total", String(totals.max), String(totals.secured), String(totals.plusTwo)],
    ],
    cw,
    [SUBJECTS.length + 1]
  );

  heading("Online Payment Details", 3 * 26);
  row("Transaction ID", v.transactionId);
  row("Date", fmtDate(v.paymentDate));
  row("Bank / UPI", v.bank);
  y -= 10;

  const decl = wrap(safe(declarationText(v.applicantName), regular), regular, 10, contentW - 12);
  heading("Declaration", decl.length * 13.5 + 24 + 90);
  decl.forEach((l, i) =>
    page.drawText(l, { x: M + 6, y: y - 11 - i * 13.5, size: 10, font: regular, color: INK })
  );
  y -= decl.length * 13.5 + 24;

  // signature, bottom right
  const sig = await pdf.embedJpg(input.signatureJpeg);
  const sBox = contain(sig, 150, 48);
  const sx = W - M - 150 + (150 - sBox.w) / 2;
  page.drawImage(sig, { x: sx, y: y - sBox.h, width: sBox.w, height: sBox.h });
  page.drawLine({
    start: { x: W - M - 160, y: y - 54 },
    end: { x: W - M, y: y - 54 },
    thickness: 0.7,
    color: GRID,
  });
  const sigLabel = "Signature of the Candidate";
  page.drawText(sigLabel, {
    x: W - M - 80 - bold.widthOfTextAtSize(sigLabel, 9) / 2,
    y: y - 67,
    size: 9,
    font: bold,
    color: MUTED,
  });
  page.drawText(safe(`Submitted online on ${submittedAt}`, regular), {
    x: M + 6,
    y: y - 20,
    size: 9,
    font: regular,
    color: MUTED,
  });
  y -= 80;

  /* ------------------------------------------- footer + page numbers */
  const pages = pdf.getPages();
  pages.forEach((p, i) => {
    p.drawLine({ start: { x: M, y: M }, end: { x: W - M, y: M }, thickness: 0.5, color: LINE });
    p.drawText(safe(`${applicationNo}  |  P K Das College of Physiotherapy`, regular), {
      x: M,
      y: M - 14,
      size: 8,
      font: regular,
      color: MUTED,
    });
    const label = `Page ${i + 1} of ${pages.length}`;
    p.drawText(label, {
      x: W - M - regular.widthOfTextAtSize(label, 8),
      y: M - 14,
      size: 8,
      font: regular,
      color: MUTED,
    });
  });
  return pdf.save();
}