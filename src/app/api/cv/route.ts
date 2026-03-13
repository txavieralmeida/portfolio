import { NextResponse } from "next/server";
import { locales, defaultLocale } from "@/i18n/config";
import type { Locale } from "@/i18n/config";

export const runtime = "nodejs";

function getLocale(request: Request): Locale {
  const url = new URL(request.url);
  const param = url.searchParams.get("locale") ?? defaultLocale;
  return (locales.includes(param as Locale) ? param : defaultLocale) as Locale;
}

export async function GET(request: Request) {
  const locale = getLocale(request);
  const cvPrintPath =
    locale === defaultLocale ? "/cv-print" : `/${locale}/cv-print`;
  return NextResponse.redirect(new URL(cvPrintPath, request.url));
}
