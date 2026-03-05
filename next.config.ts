import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { version } = require("./package.json");

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_APP_VERSION: version,
  },
  serverExternalPackages: ["@react-pdf/renderer", "puppeteer"],
  images: {
    localPatterns: [
      {
        pathname: "/images/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
