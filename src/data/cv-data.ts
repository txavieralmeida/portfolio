import type { CVData } from "@/types/cv";
import type { Locale } from "@/i18n/config";
import { cvDataEn } from "./cv-data.en";
import { cvDataPt } from "./cv-data.pt";
import { cvDataFr } from "./cv-data.fr";
import { cvDataIt } from "./cv-data.it";
import { cvDataSv } from "./cv-data.sv";

const CV_DATA_MAP: Record<Locale, CVData> = {
  en: cvDataEn,
  pt: cvDataPt,
  fr: cvDataFr,
  it: cvDataIt,
  sv: cvDataSv,
};

export function getCvData(locale: string): CVData {
  return CV_DATA_MAP[locale as Locale] ?? cvDataEn;
}

// Backward-compat re-export for any existing imports
export const cvData = cvDataEn;
