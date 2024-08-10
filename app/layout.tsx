import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { Providers } from "./Providers/providers";
import { YMapLoader } from "@/components/Map/YMapLoader";
import Header from "@/components/Header/Header";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Карты",
  description: "Разработка различных карт",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Header />
        <Providers>{children}</Providers>
        <YMapLoader />
      </body>
    </html>
  );
}
