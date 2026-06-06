// FIX: next/font/google selalu fetch dari Google saat build — jika jaringan tidak tersedia
// (CI, sandbox, atau cold start), build langsung gagal.
// Solusi: gunakan next/font/local dengan font Inter yang di-bundle, atau fallback ke system font.
// Di sini kita gunakan CSS custom property + system font stack agar zero external dependency.
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import Header from "./components/header";

export const metadata = {
  title: "MangaLibs",
  description: "Read Manga and Comics online free, update fastest, most full, synthesized with high-quality images, with all manga update daily.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
