import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  locales: ['tr', 'en', 'de', 'fr', 'ru'],
  defaultLocale: 'tr',
  localePrefix: 'as-needed'
});
 
export const config = {
  // Skip all paths that should not be internationalized.
  // This skips the paths "api", "_next", "_vercel", "admin", and all files with an extension (e.g. favicon.ico, images)
  matcher: ['/((?!api|_next|_vercel|admin|images|payload|.*\\..*).*)']
};
