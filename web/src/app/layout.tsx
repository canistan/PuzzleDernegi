import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Puzzle Derneği",
  description: "Sevgili puzzle severler, Puzzle derneği hizmetinize açılmıştır!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>
        <Navbar />

        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
