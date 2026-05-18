import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eitan Ziada | בניית אתרים ואפליקציות",
  description: "איתן זיאדה - מתמחה בבניית אתרים, אפליקציות ודפי נחיתה מקצועיים",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className="h-full">
      <body className={`${inter.className} min-h-full flex flex-col bg-[#030712]`}>
        {children}
      </body>
    </html>
  );
}
