import nodemailer from "nodemailer";
import { contact } from "./content";
import { ACADEMIC_YEAR } from "./applicationFields";
export interface MailResult {
  admissions: boolean;
  applicant: boolean;
}

/**
 * Emails the PDF to the college and to the applicant (like mail() in application_save.php).
 * Only runs when SMTP_HOST is set in .env.local — otherwise it is skipped.
 */
export async function sendApplicationEmails(opts: {
  applicantEmail: string;
  applicantName: string;
  applicationNo: string;
  fileName: string;
  pdf: Uint8Array;
}): Promise<MailResult> {
  const result: MailResult = { admissions: false, applicant: false };
  const host = process.env.SMTP_HOST;
  if (!host) return result;

  const port = Number(process.env.SMTP_PORT || 587);
  const transport = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined,
  });

  const from = process.env.MAIL_FROM || process.env.SMTP_USER || contact.email;
  const subject = `P K Das College of Physiotherapy Application ${ACADEMIC_YEAR} - ${opts.applicantName}`;
  const text = `Application received successfully for ${opts.applicantName} (${opts.applicationNo}). Please find the application attached as a PDF.`;
  const attachments = [
    {
      filename: opts.fileName,
      content: Buffer.from(opts.pdf),
      contentType: "application/pdf",
    },
  ];

  const admissionsTo = process.env.ADMISSIONS_EMAIL || contact.email;

  try {
    await transport.sendMail({ from, to: admissionsTo, subject, text, attachments });
    result.admissions = true;
  } catch (err) {
    console.error("Could not email the college copy:", err);
  }
  try {
    await transport.sendMail({ from, to: opts.applicantEmail, subject, text, attachments });
    result.applicant = true;
  } catch (err) {
    console.error("Could not email the applicant copy:", err);
  }
  return result;
}