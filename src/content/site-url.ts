// Public address of the site, used for canonical URLs, the sitemap, robots.txt
// and social-share images (which must be absolute URLs).
//
// 1. SITE_URL, if set (e.g. when building the HTML mockup for Netlify)
// 2. On Vercel, the project's production address: the vercel.app link until the
//    custom domain is connected, then princegeorges-countycdc.org automatically
// 3. Otherwise the organization's domain
const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl = (
  process.env.SITE_URL ?? (vercel ? `https://${vercel}` : "https://www.princegeorges-countycdc.org")
).replace(/\/$/, "");
