import PageShell from "@/components/PageShell";
import AdmissionsCTA from "@/components/AdmissionsCTA";
import { pageMetadata } from "@/lib/pageMeta";

export const metadata = pageMetadata({
    title: "BPT Admission 2026-27 & Eligibility | P K Das College of Physiotherapy",
    description:
        "BPT admission 2026-27 at P K Das College of Physiotherapy: 5-year course, eligibility (50% in Physics, Chemistry, Biology; NEET mandatory), career scope and how to apply.",
    path: "/admissions/",
});

export default function Page() {
    return (
        <PageShell
            title="Admissions"
            description="BPT course details, eligibility, career scope and how to apply."
            path="/admissions/"
        >
            <AdmissionsCTA />
        </PageShell>
    );
}