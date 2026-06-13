"use client";

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { ChangeEvent, useTransition } from 'react';

export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    const newPath = `/${nextLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;

    startTransition(() => {
      router.replace(newPath);
    });
  };

  return (
    <select
      defaultValue={locale}
      disabled={isPending}
      onChange={onSelectChange}
      className="bg-transparent text-slate-800 border border-slate-300 rounded px-2 py-1 ml-4 focus:ring-2 focus:ring-orange-400 outline-none transition-all cursor-pointer font-medium"
      style={{ appearance: 'none', WebkitAppearance: 'none', paddingRight: '1.5rem', background: 'url("data:image/svg+xml;utf8,<svg fill=\'black\' height=\'24\' viewBox=\'0 0 24 24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/><path d=\'M0 0h24v24H0z\' fill=\'none\'/></svg>") no-repeat', backgroundPositionX: '100%', backgroundPositionY: '50%' }}
    >
      <option value="tr">TR</option>
      <option value="en">EN</option>
      <option value="de">DE</option>
      <option value="fr">FR</option>
      <option value="ru">RU</option>
    </select>
  );
}
