import type { Metadata } from "next";
import ApplicationForm from "@/components/ApplicationForm";

export const metadata: Metadata = {
  title: "Online Application Form 2026-27 | P K Das College of Physiotherapy",
  description:
    "Apply online for the Bachelor of Physiotherapy (BPT) programme 2026-27 at P K Das College of Physiotherapy, Vaniyamkulam, Ottapalam, Palakkad.",
  alternates: { canonical: "/application-form-2026/" },
};
export default function ApplicationFormPage() {
  return <ApplicationForm />;
}