import "./globals.css";

import { Header } from "@/components/Header";
import type { Metadata } from "next";
import { NextUILibraryProvider } from "@/context/NextUILibraryProvider";
import { Roboto } from "next/font/google";
import SessionAuthProvider from "@/context/SessionAuthProvider";

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Memes Project",
  description: "Memes Project",
};

const fontRoboto = Roboto({
  preload: true,
  style: ["italic", "normal"],
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es" className="light">
      <body className={`${fontRoboto.className} bg-slate-300 min-h-screen`}>
        <NextUILibraryProvider>
          <SessionAuthProvider>
            <Header />
            {children}
          </SessionAuthProvider>
        </NextUILibraryProvider>
      </body>
    </html>
  );
}
