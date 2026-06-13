import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
 
export const locales = ['tr', 'en', 'de', 'fr', 'ru'];
export const defaultLocale = 'tr';
 
export default getRequestConfig(async ({locale}) => {
  console.log("LOCALE IS", locale);
  if (!locales.includes(locale as any)) notFound();
 
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
