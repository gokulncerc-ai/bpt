
import PageShell from "@/components/PageShell";
import About from "@/components/About";
import { pageMetadata } from "@/lib/pageMeta";

export const metadata = pageMetadata({
    title: "Best Physiotherapy Colleges in Kerala | BPT Colleges in Thrissur",
    description:
        "PK Das College of Physiotherapy is one of the top physiotherapy colleges in Kerala, offering quality BPT.",
    keywords: [
        "Top Physiotherapy Colleges in Kerala",
        "Physiotherapy Colleges in Kerala",
        "BPT Colleges in Kerala",
        "Best Physiotherapy Colleges in Thrissur",
        "Bachelor of Physiotherapy Colleges in Kerala",
    ],
    path: "/about/",
});

export default function Page() {
    return (
        <PageShell
            title="About Us"
            description="PK Das College of Physiotherapy is one of the top physiotherapy colleges in Kerala, offering quality BPT."
            path="/about/"
        >
            <About />
        </PageShell>
    );
}