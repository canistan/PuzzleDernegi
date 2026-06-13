"use client";

export default function CookieSettingsLink() {
  const resetCookies = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem('cookie-consent');
    localStorage.removeItem('cookie-consent-timestamp');
    window.location.reload();
  };

  return (
    <li>
      <button 
        onClick={resetCookies}
        className="text-left text-muted hover:text-[var(--primary)] transition-colors cursor-pointer bg-transparent border-none p-0"
      >
        Çerez Tercihlerini Değiştir
      </button>
    </li>
  );
}
