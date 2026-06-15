"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';
import { useState, useEffect, useCallback } from 'react';

export default function Navbar() {
  const t = useTranslations('common');
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const closeMenu = useCallback(() => setIsOpen(false), []);

  const navItems = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/tarihce`, label: t('history') },
    { href: `/${locale}/gecmis-yarismalar`, label: t('pastCompetitions') },
    { href: `/${locale}/tuzuk`, label: t('bylaws') },
    { href: `/${locale}/galeri`, label: t('gallery') },
    { href: `/${locale}/uyelik`, label: t('membership') },
    { href: `/${locale}/iletisim`, label: t('contact') },
  ];

  return (
    <>
      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="main-navbar">
        <div className="container navbar__inner">
          <Link href={`/${locale}`} className="navbar__logo" onClick={closeMenu}>
            <Image src="/images/logo.png" alt="Puzzle Derneği" width={180} height={45} style={{ objectFit: 'contain' }} priority />
          </Link>

          {/* Desktop Navigation */}
          <nav className="navbar__desktop-nav">
            <ul className="nav-links">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
            <LanguageSwitcher />
          </nav>

          {/* Hamburger Button */}
          <button
            className={`navbar__hamburger ${isOpen ? 'navbar__hamburger--open' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menüyü aç/kapat"
            aria-expanded={isOpen}
            id="hamburger-toggle"
          >
            <span className="navbar__hamburger-line" />
            <span className="navbar__hamburger-line" />
            <span className="navbar__hamburger-line" />
          </button>
        </div>
      </header>

      {/* Mobile Overlay Menu */}
      <div className={`mobile-menu ${isOpen ? 'mobile-menu--open' : ''}`} id="mobile-menu">
        <nav className="mobile-menu__nav">
          <div>
            <div className="flex justify-center mb-8">
              <Image 
                src="/images/logo-icon.png" 
                alt="Puzzle Derneği Icon" 
                width={72} 
                height={72} 
                className="object-contain"
              />
            </div>
            <ul className="mobile-menu__links">
            {navItems.map((item, i) => (
              <li key={item.href} style={{ animationDelay: `${i * 0.05}s` }}>
                <Link href={item.href} onClick={closeMenu}>
                  {item.label}
                </Link>
              </li>
            ))}
            </ul>
          </div>
          <div className="mobile-menu__footer">
            <LanguageSwitcher className="" dropdownAlign="left" direction="up" />
          </div>
        </nav>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div className="mobile-menu__backdrop" onClick={closeMenu} />
      )}
    </>
  );
}
