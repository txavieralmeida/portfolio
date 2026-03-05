// This file is not reachable at runtime.
// next-intl middleware intercepts all requests and rewrites them to /[locale]/...
// (e.g. / → handled by [locale]/page.tsx with locale="en")
export default function RootPage() {
  return null;
}
