// Minimal root layout — all routing is handled by src/app/[locale]/layout.tsx
// next-intl middleware rewrites every request to the [locale] segment.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
