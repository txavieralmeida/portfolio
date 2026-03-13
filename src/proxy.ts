import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all paths except: _next, api, static files, images
    "/((?!_next|api|images|favicon\\.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|pdf|css|js|woff|woff2|ttf)).*)",
  ],
};
