import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://turkiyepuzzle.com'),
  title: "Puzzle Derneği | Türkiye'nin İlk ve Tek Yapboz Derneği",
  description: "Türkiye'deki tüm puzzle severleri bir araya getiren ve ödüllü puzzle yarışmaları düzenleyen resmi dernek platformu.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Puzzle Derneği",
    description: "Türkiye'deki tüm puzzle severleri bir araya getiren resmi dernek.",
    url: 'https://turkiyepuzzle.com',
    siteName: 'Puzzle Derneği',
    images: [
      {
        url: '/images/puzzle_hero_bg.png',
        width: 1200,
        height: 630,
        alt: 'Puzzle Derneği',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Puzzle Derneği",
    description: "Türkiye'deki tüm puzzle severleri bir araya getiren resmi dernek.",
    images: ['/images/puzzle_hero_bg.png'],
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();
  return (
    <html lang={locale} className={inter.className}>
      <body>
        <NextIntlClientProvider messages={messages}>
        <Navbar />

        <main>{children}</main>
        <Footer />
        <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
