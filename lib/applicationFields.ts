/**
 * Shared by the browser form, the API route and the PDF builder.
 * Everything specific to the 2026-27 BPT application lives here.
 */

/* ------------------------------------------------------------ constants */
export const APPLICATION_PREFIX = "PKDCP"; // application no. looks like  PKDCP - 001
export const ACADEMIC_YEAR = "2026-27";
export const AGE_AS_ON_LABEL = "31-12-2026";
export const AGE_AS_ON_YEAR = 2026;
export const COLLEGE_NAME = "P K DAS COLLEGE OF PHYSIOTHERAPY";
export const COLLEGE_ADDRESS =
  "Panayoor, Vaniyamkulam, Ottapalam, Palakkad District - 679522";
export const COURSE_NAME = "Bachelor of Physiotherapy (BPT)";
export const APPLICATION_FEE = 1000; // Rs. — shown in the welcome pop-up
export const MAX_IMAGE_BYTES = 2 * 1024 * 1024; // photo / signature: 2 MB each
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export const QUOTAS = ["Management", "NRI"] as const;
export const STREAMS = ["ICSE", "CBSE", "HSE"] as const;
export const GENDERS = ["Male", "Female", "Other"] as const;

export const SUBJECTS = [
  { key: "physics", label: "PHYSICS", required: true },
  { key: "chemistry", label: "CHEMISTRY", required: true },
  { key: "biology", label: "BIOLOGY", required: true },
  { key: "english", label: "ENGLISH", required: false },
] as const;
export type SubjectKey = (typeof SUBJECTS)[number]["key"];

export const MARK_COLUMNS = [
  { key: "max", label: "Maximum Marks" },
  { key: "secured", label: "Marks Secured" },
  { key: "plusTwo", label: "Marks Secured in +2" },
] as const;
export type MarkColumn = (typeof MARK_COLUMNS)[number]["key"];

export const markKey = (s: SubjectKey, c: MarkColumn) => `${s}_${c}`;

/* --------------------------------------------------------------- values */
const TEXT_KEYS = [
  "admissionQuota",
  "applicantName",
  "gender",
  "dateOfBirth",
  "fatherName",
  "motherName",
  "permanentAddress",
  "communicationAddress",
  "religion",
  "phoneNo",
  "mobileNo",
  "email",
  "income",
  "stream",
  "claim",
  "transactionId",
  "paymentDate",
  "bank",
] as const;

export const ALL_KEYS: string[] = [
  ...TEXT_KEYS,
  ...SUBJECTS.flatMap((s) => MARK_COLUMNS.map((c) => markKey(s.key, c.key))),
];

export type Values = Record<string, string>;

export const emptyValues = (): Values =>
  Object.fromEntries(ALL_KEYS.map((k) => [k, ""]));

/* -------------------------------------------------------------- helpers */
export const ucwords = (s: string) =>
  s.replace(/(^|\s)(\S)/g, (_m, a: string, b: string) => a + b.toUpperCase());

/** 2008-05-10 -> 10-05-2008 */
export function fmtDate(iso: string): string {
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})/);
  return m ? `${m[3]}-${m[2]}-${m[1]}` : iso;
}

/** Age as on 31-12-2026 (everyone born in a year is the same age on 31 Dec). */
export function ageOn(dob: string): number | null {
  const m = dob.match(/^(\d{4})-\d{2}-\d{2}$/);
  return m ? AGE_AS_ON_YEAR - Number(m[1]) : null;
}

const num = (s: string) => (s ? parseInt(s, 10) || 0 : 0);

export function computeTotals(v: Values): Record<MarkColumn, number> {
  const totals = { max: 0, secured: 0, plusTwo: 0 };
  for (const s of SUBJECTS)
    for (const c of MARK_COLUMNS) totals[c.key] += num(v[markKey(s.key, c.key)] ?? "");
  return totals;
}

export const declarationText = (name: string) =>
  `I, ${name || "..................................."} do hereby declare that the particulars given in the application are true to the best of my knowledge and belief. If any of the particulars given by me in this application is proved fraudulent at any later stage of admission, I shall be liable for disciplinary action and my admission shall become null and void. I shall produce the originals of the certificates at the time of interview. I carefully read the prospectus thoroughly and I am ready to abide the terms and conditions mentioned in the Prospectus.`;

/* ------------------------------------------------------------ validation */
export function validateImageFile(
  file: { size: number; type: string },
  what: string
): string | undefined {
  if (file.size === 0) return `The ${what} file is empty`;
  if (file.type && !ALLOWED_IMAGE_TYPES.includes(file.type))
    return `The ${what} must be a JPG, PNG or WebP image`;
  if (file.size > MAX_IMAGE_BYTES) return `The ${what} must be smaller than 2 MB`;
  return undefined;
}

const validDate = (s: string) =>
  /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s));
const notFuture = (s: string) => Date.parse(s) <= Date.now() + 36 * 3600 * 1000;

/** Returns { fieldName: message }. Empty object = valid. */
export function validate(v: Values): Record<string, string> {
  const e: Record<string, string> = {};
  const get = (k: string) => (v[k] ?? "").trim();
  const req = (k: string, msg = "This field is required") => {
    if (!get(k)) e[k] = msg;
    return !!get(k);
  };

  if (req("admissionQuota", "Select a quota") && !(QUOTAS as readonly string[]).includes(get("admissionQuota")))
    e.admissionQuota = "Select a quota";

  if (req("applicantName") && !/^[A-Za-z][A-Za-z .'-]{1,99}$/.test(get("applicantName")))
    e.applicantName = "Use English letters only (A-Z), e.g. ANU K S";

  if (req("gender", "Select one") && !(GENDERS as readonly string[]).includes(get("gender")))
    e.gender = "Select one";

  if (req("dateOfBirth")) {
    if (!validDate(get("dateOfBirth"))) e.dateOfBirth = "Enter a valid date";
    else if (!notFuture(get("dateOfBirth")) || Number(get("dateOfBirth").slice(0, 4)) < 1950)
      e.dateOfBirth = "Enter a valid date of birth";
  }

  if (req("fatherName") && get("fatherName").length > 100) e.fatherName = "Too long";
  if (req("motherName") && get("motherName").length > 100) e.motherName = "Too long";

  for (const k of ["permanentAddress", "communicationAddress"]) {
    if (req(k) && (get(k).length < 5 || get(k).length > 500))
      e[k] = "Enter the full address (5–500 characters)";
  }

  if (req("religion") && get("religion").length > 100) e.religion = "Too long";

  if (req("phoneNo") && !/^\d{6,12}$/.test(get("phoneNo")))
    e.phoneNo = "Enter 6–12 digits";
  if (req("mobileNo") && !/^\d{10,12}$/.test(get("mobileNo")))
    e.mobileNo = "Enter a 10-digit mobile number";

  if (req("email")) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(get("email"))) e.email = "Enter a valid email address";
    else if (get("email").length > 50) e.email = "Email must be 50 characters or less";
  }

  if (req("income") && !/^\d{1,10}$/.test(get("income"))) e.income = "Enter the amount in numbers only";

  if (req("stream", "Select a stream") && !(STREAMS as readonly string[]).includes(get("stream")))
    e.stream = "Select a stream";

  if (get("claim").length > 200) e.claim = "Please keep this under 200 characters";

  // Marks
  for (const s of SUBJECTS) {
    const max = get(markKey(s.key, "max"));
    const sec = get(markKey(s.key, "secured"));
    const p2 = get(markKey(s.key, "plusTwo"));
    for (const [col, val] of [["max", max], ["secured", sec], ["plusTwo", p2]] as const) {
      const key = markKey(s.key, col);
      if (val && !/^\d{1,4}$/.test(val)) e[key] = `${s.label}: use numbers only`;
    }
    if (s.required) {
      if (!max) e[markKey(s.key, "max")] = `${s.label}: enter the maximum marks`;
      if (!sec) e[markKey(s.key, "secured")] = `${s.label}: enter the marks secured`;
    }
    if (max && sec && !e[markKey(s.key, "max")] && !e[markKey(s.key, "secured")]) {
      if (num(max) === 0) e[markKey(s.key, "max")] = `${s.label}: maximum marks must be above 0`;
      else if (num(sec) > num(max)) e[markKey(s.key, "secured")] = `${s.label}: marks secured cannot exceed maximum marks`;
    }
  }
  if (req("transactionId") && !/^\d{12}$/.test(get("transactionId")))
    e.transactionId = "Enter the 12-digit transaction ID";

  if (req("paymentDate")) {
    if (!validDate(get("paymentDate"))) e.paymentDate = "Enter a valid date";
    else if (!notFuture(get("paymentDate"))) e.paymentDate = "Payment date cannot be in the future";
  }

  if (req("bank") && get("bank").length > 100) e.bank = "Too long";

  return e;
}