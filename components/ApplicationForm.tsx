"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { contact } from "@/lib/content";
import {
  ACADEMIC_YEAR,
  AGE_AS_ON_LABEL,
  APPLICATION_FEE,
  COLLEGE_ADDRESS,
  COLLEGE_NAME,
  COURSE_NAME,
  GENDERS,
  MARK_COLUMNS,
  QUOTAS,
  STREAMS,
  SUBJECTS,
  ageOn,
  computeTotals,
  declarationText,
  emptyValues,
  markKey,
  validate,
  validateImageFile,
  type Values,
} from "@/lib/applicationFields";

/* ------------------------------------------------------------------ styles */
const base =
  "w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-ink placeholder:text-primary/40 transition focus:outline-none focus:ring-2";
const okCls = "border-primary/30 focus:border-secondary focus:ring-secondary/30";
const badCls = "border-red-500 focus:border-red-500 focus:ring-red-200";
const cls = (err?: string) => `${base} ${err ? badCls : okCls}`;
const readonlyCls =
  "w-full rounded-xl border border-mist bg-paper px-4 py-3 text-[15px] font-semibold text-primary";

const DIGIT_FIELDS = new Set(["phoneNo", "mobileNo", "income", "transactionId"]);
const MARK_KEYS = new Set(
  SUBJECTS.flatMap((s) => MARK_COLUMNS.map((c) => markKey(s.key, c.key)))
);

/* ----------------------------------------------------------- small pieces */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-mist bg-white p-6 md:p-9 shadow-sm">
      <h2 className="text-[19px] md:text-[21px] font-bold text-primary flex items-center gap-3">
        <span className="h-6 w-1.5 rounded-full bg-gradient-to-b from-secondary to-green" />
        {title}
      </h2>
      <div className="mt-6 grid gap-5 md:grid-cols-2">{children}</div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  required,
  error,
  wide,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  wide?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={wide ? "md:col-span-2" : ""}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-[13.5px] font-semibold text-primary">
        {label}
        {required && <span className="text-red-600"> *</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-[12.5px] text-primary/55">{hint}</p>}
      {error && (
        <p id={`${htmlFor}-err`} className="mt-1.5 text-[13px] font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

function downloadPdf(base64: string, name: string) {
  const bin = atob(base64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  const url = URL.createObjectURL(new Blob([bytes], { type: "application/pdf" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

/* ---------------------------------------------------------------- the form */
export default function ApplicationForm() {
  const [values, setValues] = useState<Values>(emptyValues);
  const [sameAddress, setSameAddress] = useState(false);
  const [declaration, setDeclaration] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot
  const [photo, setPhoto] = useState<File | null>(null);
  const [signature, setSignature] = useState<File | null>(null);
  const [photoUrl, setPhotoUrl] = useState("");
  const [signatureUrl, setSignatureUrl] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [serverError, setServerError] = useState("");
  const [result, setResult] = useState<{
    applicationNo: string;
    emailed: boolean;
    pdfBase64?: string;
    downloadName?: string;
  } | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [now, setNow] = useState("");
  const [formKey, setFormKey] = useState(0); // changing it clears the file inputs
  const continueRef = useRef<HTMLButtonElement>(null);

  // live date & time (India time), shown read-only like the nursing form
  useEffect(() => {
    setNow(
      new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      })
        .format(new Date())
        .replace(",", "")
    );
  }, []);

  // welcome pop-up: focus the button, close with Escape
  useEffect(() => {
    if (!showWelcome) return;
    continueRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setShowWelcome(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showWelcome]);

  // "same as permanent address" keeps the two boxes in sync
  useEffect(() => {
    if (sameAddress) setValues((v) => ({ ...v, communicationAddress: v.permanentAddress }));
  }, [sameAddress, values.permanentAddress]);

  useEffect(
    () => () => {
      if (photoUrl) URL.revokeObjectURL(photoUrl);
      if (signatureUrl) URL.revokeObjectURL(signatureUrl);
    },
    [photoUrl, signatureUrl]
  );

  const totals = useMemo(() => computeTotals(values), [values]);
  const age = ageOn(values.dateOfBirth);

  const clearError = (name: string) =>
    setErrors((e) => (e[name] ? { ...e, [name]: "" } : e));

  function setField(name: string, raw: string) {
    let value = raw;
    if (name === "applicantName") value = raw.toUpperCase();
    else if (DIGIT_FIELDS.has(name) || MARK_KEYS.has(name)) value = raw.replace(/\D/g, "");
    setValues((v) => ({ ...v, [name]: value }));
    clearError(name);
    if (MARK_KEYS.has(name)) clearError(name);
  }

  function pickImage(kind: "photo" | "signature", file: File | null) {
    const setFile = kind === "photo" ? setPhoto : setSignature;
    const setUrl = kind === "photo" ? setPhotoUrl : setSignatureUrl;
    if (!file) {
      setFile(null);
      setUrl("");
      return;
    }
    const err = validateImageFile(file, kind);
    if (err) {
      setErrors((e) => ({ ...e, [kind]: err }));
      setFile(null);
      setUrl("");
      return;
    }
    clearError(kind);
    setFile(file);
    setUrl(URL.createObjectURL(file));
  }

  function handleReset() {
    setValues(emptyValues());
    setSameAddress(false);
    setDeclaration(false);
    setPhoto(null);
    setSignature(null);
    setPhotoUrl("");
    setSignatureUrl("");
    setErrors({});
    setServerError("");
    setFormKey((k) => k + 1);
  }

  const focusFirstError = () =>
    setTimeout(() => {
      const el = document.querySelector<HTMLElement>('[aria-invalid="true"]');
      el?.scrollIntoView({ block: "center", behavior: "smooth" });
      el?.focus({ preventScroll: true });
    }, 0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");

    const errs = validate(values);
    if (!photo) errs.photo = "Please upload your passport size photo";
    if (!signature) errs.signature = "Please upload your signature";
    if (!declaration) errs.declaration = "Please accept the declaration";
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      focusFirstError();
      return;
    }

    setStatus("submitting");
    try {
      const fd = new FormData();
      Object.entries(values).forEach(([k, v]) => fd.append(k, v));
      fd.append("declaration", "true");
      fd.append("website", website);
      fd.append("photo", photo as File);
      fd.append("signature", signature as File);

      const res = await fetch("/api/application-form-2026/", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setResult(data);
        setStatus("done");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      if (data.errors) {
        setErrors(data.errors);
        focusFirstError();
      } else {
        setServerError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setServerError("Network error. Please check your connection and try again.");
    }
    setStatus("idle");
  }

  /* ---- shared input renderers (plain functions, so typing never loses focus) */
  const aria = (name: string) => ({
    "aria-invalid": !!errors[name],
    "aria-describedby": errors[name] ? `f-${name}-err` : undefined,
  });

  const input = (name: string, extra: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <input
      id={`f-${name}`}
      name={name}
      value={values[name]}
      onChange={(e) => setField(name, e.target.value)}
      className={cls(errors[name])}
      {...aria(name)}
      {...extra}
    />
  );

  const select = (name: string, options: readonly string[], placeholder: string) => (
    <select
      id={`f-${name}`}
      name={name}
      value={values[name]}
      onChange={(e) => setField(name, e.target.value)}
      className={cls(errors[name])}
      {...aria(name)}
    >
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );

  /* ================================================================ SUCCESS */
  if (status === "done" && result) {
    return (
      <main className="min-h-screen bg-paper">
        <div className="max-w-2xl mx-auto px-5 py-16 md:py-24">
          <div className="rounded-3xl border-2 border-green/60 bg-white p-8 md:p-12 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green/15 text-green-dark">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h1 className="mt-6 text-[24px] md:text-[30px] font-bold text-primary">
              Application Form Submitted Successfully!
            </h1>
            <p className="mt-3 text-primary/70 leading-relaxed">
              {result.emailed
                ? "A copy of your application has been sent to your email. Please check your inbox."
                : "Please download your application using the button below and keep it safe."}
            </p>
            <div className="mt-6 inline-block rounded-xl border border-secondary/40 bg-secondary/10 px-6 py-3">
              <div className="text-[12px] font-semibold text-secondary-dark">Application number</div>
              <div className="text-[20px] font-bold text-primary tracking-wide">{result.applicationNo}</div>
            </div>
            <p className="mt-6 text-[14px] text-primary/70 leading-relaxed text-left rounded-xl bg-paper border border-mist p-4">
              Please bring a <strong>print of this application form</strong>, the{" "}
              <strong>receipt of the application fee</strong> and copies of the{" "}
              <strong>SSLC and Plus Two certificates</strong>, and submit them at the college before the last
              date of application.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {result.pdfBase64 && (
                <button
                  type="button"
                  onClick={() => downloadPdf(result.pdfBase64!, result.downloadName || "application.pdf")}
                  className="rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-[15px] px-8 py-3.5 shadow-md transition"
                >
                  Download PDF
                </button>
              )}
              <Link
                href="/"
                className="rounded-full border border-primary/30 text-primary hover:bg-primary hover:text-white font-bold text-[15px] px-8 py-3.5 transition"
              >
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* ================================================================== FORM */
  const marksErrors = Object.entries(errors).filter(([k, m]) => MARK_KEYS.has(k) && m);

  return (
    <main className="min-h-screen bg-paper">
      {/* ------------------------------------------------ welcome pop-up */}
      {showWelcome && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-primary-dark/75 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="welcome-title"
        >
          <div className="w-full max-w-lg rounded-3xl bg-white p-7 md:p-9 shadow-2xl">
            <h2 id="welcome-title" className="text-center text-[20px] md:text-[22px] font-bold text-primary">
              Welcome to P K Das College of Physiotherapy
            </h2>
            <p className="mt-4 text-center font-semibold text-primary">
              For the admission process kindly bring the following documents:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[14.5px] leading-relaxed text-primary/80">
              <li>
                Application fee Rs. {APPLICATION_FEE}/- to be paid online, and the transaction details to be
                filled in the application form.
              </li>
              <li>
                Print of the application form, receipt of the application fee and copy of SSLC and Plus Two to
                be submitted at the college before the last date of application.
              </li>
            </ul>
            <div className="mt-7 text-center">
              <button
                ref={continueRef}
                type="button"
                onClick={() => setShowWelcome(false)}
                className="rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-[15px] px-10 py-3 transition"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------- saving overlay */}
      {status === "submitting" && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-5 bg-primary-dark/80 p-6 text-center text-white">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/30 border-t-white" />
          <p className="text-[16px] font-semibold">Please wait while your application is being saved…</p>
          <p className="text-[13px] text-white/75">Do not close or refresh this page.</p>
        </div>
      )}

      {/* ------------------------------------------------------ header */}
      <header className="bg-white border-b border-mist">
        <div className="max-w-5xl mx-auto px-5 md:px-8 py-6 text-center">
          <Image
            src="/BPTLOGO3.png"
            alt="P K Das College of Physiotherapy"
            width={320}
            height={220}
            priority
            className="mx-auto h-24 md:h-28 w-auto object-contain"
          />
          <p className="mt-3 text-[14px] md:text-[16px] font-medium text-primary/80">{COLLEGE_ADDRESS}</p>
        </div>
      </header>

      <section className="brand-gradient text-white">
        <div className="max-w-5xl mx-auto px-5 md:px-8 py-10 md:py-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-block rounded-full bg-white/15 border border-white/25 px-4 py-1.5 text-[13px] font-semibold tracking-wide">
              Admissions {ACADEMIC_YEAR}
            </span>
            <h1 className="mt-3 text-[28px] md:text-[40px] font-bold leading-tight">Online Application Form</h1>
            <p className="mt-2 text-white/85">
              {COURSE_NAME}. Fields marked with <span className="font-bold">*</span> are required.
            </p>
          </div>
          <Link
            href="/"
            className="rounded-full border border-white/60 px-5 py-2 text-[14px] font-semibold hover:bg-white hover:text-primary transition"
          >
            Back to website
          </Link>
        </div>
      </section>

      {/* ------------------------------------------------------- form */}
      <form
        key={formKey}
        onSubmit={handleSubmit}
        noValidate
        className="max-w-5xl mx-auto px-5 md:px-8 py-10 md:py-14 space-y-8"
      >
        <Section title="Application Details">
          <Field label="Application No" htmlFor="f-appno">
            <input id="f-appno" readOnly value="Assigned when you submit" className={readonlyCls} />
          </Field>
          <Field label="Date and Time" htmlFor="f-now">
            <input id="f-now" readOnly value={now} className={readonlyCls} />
          </Field>
          <Field label="Course applied for" htmlFor="f-course" required>
            <input id="f-course" readOnly value={COURSE_NAME} className={readonlyCls} />
          </Field>
          <Field label="Admission Category / Quota" htmlFor="f-admissionQuota" required error={errors.admissionQuota}>
            {select("admissionQuota", QUOTAS, "Select quota")}
          </Field>
          <Field label="Name of the College" htmlFor="f-college" wide>
            <input id="f-college" readOnly value={COLLEGE_NAME} className={readonlyCls} />
          </Field>

          <Field
            label="Upload your passport size photo"
            htmlFor="f-photo"
            required
            error={errors.photo}
            hint="JPG / PNG / WebP, up to 2 MB"
            wide
          >
            <div className="flex flex-wrap items-center gap-5">
              <input
                id="f-photo"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={(e) => pickImage("photo", e.target.files?.[0] ?? null)}
                aria-invalid={!!errors.photo}
                aria-describedby={errors.photo ? "f-photo-err" : undefined}
                className="block min-w-0 flex-1 text-[14px] text-primary/80 file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-primary file:px-5 file:py-2.5 file:text-[14px] file:font-semibold file:text-white hover:file:bg-primary-dark"
              />
              {photoUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photoUrl} alt="Photo preview" className="h-24 w-20 rounded-lg border border-mist object-cover" />
              )}
            </div>
          </Field>
        </Section>

        <Section title="Applicant Details">
          <Field label="Name in Block Letters" htmlFor="f-applicantName" required error={errors.applicantName} wide>
            {input("applicantName", { autoComplete: "name", maxLength: 100, placeholder: "e.g. ANU K S" })}
          </Field>

          <Field label="Sex" htmlFor="f-gender" required error={errors.gender}>
            <div
              id="f-gender"
              role="radiogroup"
              aria-invalid={!!errors.gender}
              tabIndex={-1}
              className={`flex flex-wrap gap-3 rounded-xl border px-3 py-2.5 ${errors.gender ? "border-red-500" : "border-primary/30"} bg-white`}
            >
              {GENDERS.map((g) => (
                <label key={g} className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 text-[15px] text-primary hover:bg-paper">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={values.gender === g}
                    onChange={() => setField("gender", g)}
                    className="h-4 w-4 accent-[#1e3c76]"
                  />
                  {g}
                </label>
              ))}
            </div>
          </Field>

          <div />

          <Field label="Date of Birth" htmlFor="f-dateOfBirth" required error={errors.dateOfBirth}>
            {input("dateOfBirth", { type: "date", autoComplete: "bday" })}
          </Field>
          <Field label={`Age as on ${AGE_AS_ON_LABEL}`} htmlFor="f-age" required>
            <input id="f-age" readOnly value={age === null ? "" : String(age)} className={readonlyCls} />
          </Field>

          <Field label="Name of Father" htmlFor="f-fatherName" required error={errors.fatherName}>
            {input("fatherName", { maxLength: 100 })}
          </Field>
          <Field label="Name of Mother" htmlFor="f-motherName" required error={errors.motherName}>
            {input("motherName", { maxLength: 100 })}
          </Field>

          <Field label="Permanent Address" htmlFor="f-permanentAddress" required error={errors.permanentAddress}>
            <textarea
              id="f-permanentAddress"
              name="permanentAddress"
              rows={4}
              maxLength={500}
              value={values.permanentAddress}
              onChange={(e) => setField("permanentAddress", e.target.value)}
              className={cls(errors.permanentAddress)}
              {...aria("permanentAddress")}
            />
          </Field>
          <Field label="Address for Communication" htmlFor="f-communicationAddress" required error={errors.communicationAddress}>
            <textarea
              id="f-communicationAddress"
              name="communicationAddress"
              rows={4}
              maxLength={500}
              readOnly={sameAddress}
              value={values.communicationAddress}
              onChange={(e) => setField("communicationAddress", e.target.value)}
              className={`${cls(errors.communicationAddress)} ${sameAddress ? "bg-paper" : ""}`}
              {...aria("communicationAddress")}
            />
            <label className="mt-2 flex cursor-pointer items-center gap-2 text-[13.5px] text-primary/80">
              <input
                type="checkbox"
                checked={sameAddress}
                onChange={(e) => setSameAddress(e.target.checked)}
                className="h-4 w-4 accent-[#1e3c76]"
              />
              Same as permanent address
            </label>
          </Field>

          <Field label="Religion & Community" htmlFor="f-religion" required error={errors.religion}>
            {input("religion", { maxLength: 100 })}
          </Field>
          <Field label="Phone Number" htmlFor="f-phoneNo" required error={errors.phoneNo}>
            {input("phoneNo", { type: "tel", inputMode: "numeric", maxLength: 12, autoComplete: "tel" })}
          </Field>
          <Field label="Mobile No" htmlFor="f-mobileNo" required error={errors.mobileNo}>
            {input("mobileNo", { type: "tel", inputMode: "numeric", maxLength: 12, autoComplete: "tel" })}
          </Field>
          <Field label="Email Address" htmlFor="f-email" required error={errors.email}>
            {input("email", { type: "email", maxLength: 50, autoComplete: "email" })}
          </Field>

          <Field label="Family Annual Income (Rs.)" htmlFor="f-income" required error={errors.income}>
            {input("income", { inputMode: "numeric", maxLength: 10 })}
          </Field>
          <Field label="Stream" htmlFor="f-stream" required error={errors.stream}>
            {select("stream", STREAMS, "Select stream")}
          </Field>

          <Field
            label="If the candidate is claiming any reservation or other benefits, furnish details"
            htmlFor="f-claim"
            error={errors.claim}
            wide
          >
            {input("claim", { maxLength: 200 })}
          </Field>
        </Section>

        {/* --------------------------------------------------- marks */}
        <section className="rounded-3xl border border-mist bg-white p-6 md:p-9 shadow-sm">
          <h2 className="text-[19px] md:text-[21px] font-bold text-primary flex items-center gap-3">
            <span className="h-6 w-1.5 rounded-full bg-gradient-to-b from-secondary to-green" />
            Marks Obtained - Higher Secondary
          </h2>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[620px] border-separate border-spacing-y-3 text-left">
              <thead>
                <tr className="text-[13px] font-semibold text-primary">
                  <th className="px-2 pb-1">Subject</th>
                  {MARK_COLUMNS.map((c) => (
                    <th key={c.key} className="px-2 pb-1">
                      {c.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SUBJECTS.map((s) => (
                  <tr key={s.key}>
                    <td className="px-2 text-[14px] font-bold text-primary">{s.label}</td>
                    {MARK_COLUMNS.map((c) => {
                      const key = markKey(s.key, c.key);
                      return (
                        <td key={key} className="px-2">
                          <input
                            id={`f-${key}`}
                            name={key}
                            value={values[key]}
                            inputMode="numeric"
                            maxLength={4}
                            aria-label={`${s.label} - ${c.label}`}
                            onChange={(e) => setField(key, e.target.value)}
                            className={cls(errors[key])}
                            aria-invalid={!!errors[key]}
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
                <tr>
                  <td className="px-2 text-[14px] font-bold text-primary">Total</td>
                  {MARK_COLUMNS.map((c) => (
                    <td key={c.key} className="px-2">
                      <input readOnly aria-label={`Total ${c.label}`} value={totals[c.key]} className={readonlyCls} />
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {marksErrors.length > 0 && (
            <ul className="mt-3 space-y-1 text-[13px] font-medium text-red-600" role="alert">
              {marksErrors.map(([k, m]) => (
                <li key={k}>{m}</li>
              ))}
            </ul>
          )}
        </section>

        <Section title="Online Payment Details">
          <Field label="Transaction ID" htmlFor="f-transactionId" required error={errors.transactionId} hint="12-digit transaction / UTR number">
            {input("transactionId", { inputMode: "numeric", maxLength: 12 })}
          </Field>
          <Field label="Date" htmlFor="f-paymentDate" required error={errors.paymentDate}>
            {input("paymentDate", { type: "date" })}
          </Field>
          <Field label="Bank / UPI" htmlFor="f-bank" required error={errors.bank} wide>
            {input("bank", { maxLength: 100 })}
          </Field>
        </Section>

        {/* ---------------------------------------- declaration + signature */}
        <section className="rounded-3xl border border-mist bg-white p-6 md:p-9 shadow-sm">
          <h2 className="text-[19px] md:text-[21px] font-bold text-primary flex items-center gap-3">
            <span className="h-6 w-1.5 rounded-full bg-gradient-to-b from-secondary to-green" />
            Declaration
          </h2>
          <p className="mt-5 text-justify text-[14.5px] leading-relaxed text-primary/80">
            {declarationText(values.applicantName)}
          </p>

          <label className="mt-5 flex cursor-pointer items-start gap-3">
            <input
              id="f-declaration"
              type="checkbox"
              checked={declaration}
              aria-invalid={!!errors.declaration}
              onChange={(e) => {
                setDeclaration(e.target.checked);
                clearError("declaration");
              }}
              className="mt-1 h-5 w-5 accent-[#1e3c76]"
            />
            <span className="text-[14.5px] font-semibold text-primary">I agree to the above declaration.</span>
          </label>
          {errors.declaration && <p className="mt-2 text-[13px] font-medium text-red-600">{errors.declaration}</p>}

          <div className="mt-7 max-w-md">
            <Field
              label="Upload your signature (signature of the candidate)"
              htmlFor="f-signature"
              required
              error={errors.signature}
              hint="Sign on white paper and upload a clear photo. JPG / PNG / WebP, up to 2 MB"
            >
              <div className="flex flex-wrap items-center gap-5">
                <input
                  id="f-signature"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={(e) => pickImage("signature", e.target.files?.[0] ?? null)}
                  aria-invalid={!!errors.signature}
                  aria-describedby={errors.signature ? "f-signature-err" : undefined}
                  className="block min-w-0 flex-1 text-[14px] text-primary/80 file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-primary file:px-5 file:py-2.5 file:text-[14px] file:font-semibold file:text-white hover:file:bg-primary-dark"
                />
                {signatureUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={signatureUrl} alt="Signature preview" className="h-14 w-32 rounded-lg border border-mist bg-white object-contain" />
                )}
              </div>
            </Field>
          </div>

          {/* honeypot — hidden from people */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label>
              Website
              <input type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
            </label>
          </div>

          {serverError && (
            <p role="alert" className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[14px] font-medium text-red-700">
              {serverError}
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="rounded-full bg-primary hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60 text-white font-bold text-[15px] px-10 py-4 shadow-md transition"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="rounded-full border border-primary/30 text-primary hover:bg-primary hover:text-white font-bold text-[15px] px-10 py-4 transition"
            >
              Reset
            </button>
          </div>
        </section>
        <p className="text-center text-[13.5px] text-primary/60">
          Need help? Call {contact.enquiryNumbers.join(" / ")} or email{" "}
          <a href={`mailto:${contact.email}`} className="font-semibold text-secondary-dark hover:underline">
            {contact.email}
          </a>
        </p>
      </form>
    </main>
  );
}