import Link from "next/link";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { SITE_URL } from "@/lib/siteUrl";

/**
 * The frame every inner page uses:  Navbar  +  title banner (with breadcrumb)  +  content  +  Footer.
 * It also tells Google the page's position on the site (breadcrumb structured data).
 */
export default function PageShell({
    title,
    description,
    path,
    children,
}: {
    title: string; // the one <h1> of the page
    description: string; // short line shown under the title
    path: string; // e.g. "/about/"
    children: React.ReactNode;
}) {
    const breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: title, item: `${SITE_URL}${path}` },
        ],
    };

    return (
        <>
            <Navbar />
            <main>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(breadcrumb).replace(/</g, "\\u003c"),
                    }}
                />

                {/* ---------- title banner ---------- */}
                <section className="brand-gradient text-white">
                    <div className="max-w-7xl mx-auto px-5 md:px-8 py-10 md:py-14">
                        <nav aria-label="Breadcrumb" className="text-[13px] font-semibold text-white/80">
                            <Link href="/" className="hover:text-white transition-colors">
                                Home
                            </Link>
                            <span className="mx-2 text-white/50" aria-hidden="true">
                                /
                            </span>
                            <span aria-current="page" className="text-white">
                                {title}
                            </span>
                        </nav>
                        <h1 className="mt-3 text-[30px] md:text-[44px] font-bold leading-tight">{title}</h1>
                        <p className="mt-3 max-w-2xl text-white/85 leading-relaxed">{description}</p>
                    </div>
                </section>

                {children}
            </main>
            <Footer />
        </>
    );
}