export const locales = ["en", "pt", "fr", "it", "sv"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
