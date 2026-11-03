import PageShell from "@/components/PageShell";
import Departments from "@/components/Departments";
import { pageMetadata } from "@/lib/pageMeta";

export const metadata = pageMetadata({
    title: "Departments & Labs | P K Das College of Physiotherapy",
    description:
        "Explore the nine laboratories and museums at P K Das College of Physiotherapy, from anatomy and physiology to electrotherapy, orthopaedic and laser therapy labs.",
    path: "/departments/",
});

export default function Page() {
    return (
        <PageShell
            title="Departments & Labs"
            description="Nine labs and museums that turn theory into patient-ready skill."
            path="/departments/"
        >
            <Departments />
        </PageShell>
    );
}