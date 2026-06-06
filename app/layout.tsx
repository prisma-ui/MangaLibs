import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import Header from "./components/header";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "MangaSui",
  description: "Read Manga and Comics online free, update fastest, most full, synthesized with high-quality images, with all manga update daily.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
