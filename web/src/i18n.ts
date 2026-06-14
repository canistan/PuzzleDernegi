import {getRequestConfig} from 'next-intl/server';
 
export const locales = ['tr', 'en', 'de', 'fr', 'ru'] as const;
export const defaultLocale = 'tr';
 
export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;
  const locale = locales.includes(requested as any) ? requested! : defaultLocale;
 
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
