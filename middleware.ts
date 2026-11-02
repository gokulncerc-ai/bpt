import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";

/**
 * Googlebot visit logger (optional).
 * Vercel's free plan keeps almost no request logs, so this writes one line each time
 * a Google crawler asks for a page:
 *   1) into Vercel's runtime log   -> Vercel > your project > Logs  (search "GOOGLEBOT")
 *   2) to a web address of your own, if BOT_LOG_WEBHOOK is set (keeps the history for ever)
 * It never changes what visitors or Google receive.
 */
const GOOGLE_BOTS =
    /googlebot|google-inspectiontool|googleother|adsbot-google|apis-google|mediapartners-google|storebot-google/i;

export function middleware(req: NextRequest, event: NextFetchEvent) {
    const ua = req.headers.get("user-agent") ?? "";

    if (GOOGLE_BOTS.test(ua)) {
        const record = {
            time: new Date().toISOString(),
            method: req.method,
            path: req.nextUrl.pathname,
            ip: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "",
            userAgent: ua.slice(0, 200),
        };

        console.log("[GOOGLEBOT]", JSON.stringify(record));

        const hook = process.env.BOT_LOG_WEBHOOK;
        if (hook) {
            event.waitUntil(
                fetch(hook, {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify(record),
                }).catch(() => undefined)
            );
        }
    }

    return NextResponse.next();
}

// Pages, sitemap.xml and robots.txt are logged; images, scripts and fonts are skipped.
export const config = {
    matcher: [
        "/((?!_next/static|_next/image|.*\\.(?:png|jpe?g|webp|avif|gif|svg|ico|css|js|woff2?|map)$).*)",
    ],
};