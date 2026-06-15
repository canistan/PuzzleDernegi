"use client";

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useTransition, useState, useRef, useEffect } from 'react';

const LOCALES = [
  { code: 'tr', label: 'TR', flag: '🇹🇷' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'de', label: 'DE', flag: '🇩🇪' },
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
  { code: 'ru', label: 'RU', flag: '🇷🇺' },
];

export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const onSelectChange = (nextLocale: string) => {
    setIsOpen(false);
    if (nextLocale === locale) return;
    
    let pathWithoutLocale = pathname;
    if (pathname.startsWith(`/${locale}/`)) {
      pathWithoutLocale = pathname.replace(`/${locale}/`, '/');
    } else if (pathname === `/${locale}`) {
      pathWithoutLocale = '/';
    }

    const newPath = `/${nextLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;

    startTransition(() => {
      window.location.href = newPath;
    });
  };

  const currentLocale = LOCALES.find(l => l.code === locale) || LOCALES[0];

  return (
    <div className="relative ml-4" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className={`flex items-center gap-2 bg-transparent text-slate-800 border border-slate-300 rounded px-3 py-1.5 focus:ring-2 focus:ring-orange-400 outline-none transition-all cursor-pointer font-medium hover:bg-slate-50 ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <span className="text-lg leading-none">{currentLocale.flag}</span>
        <span>{currentLocale.label}</span>
        <svg className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white border border-slate-200 rounded-lg shadow-lg z-50 overflow-hidden py-1">
          {LOCALES.map((l) => (
            <button
              key={l.code}
              onClick={() => onSelectChange(l.code)}
              className={`flex items-center gap-3 w-full text-left px-4 py-2 hover:bg-slate-50 transition-colors ${l.code === locale ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-slate-700'}`}
            >
              <span className="text-xl leading-none">{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
