'use client'
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SideBar from "./components/SideBar";
import Header from "./components/Header";
import { UserRole } from '@/src/utils/types';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userRole = UserRole.ADMIN;

  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">
        <div className="flex h-screen">
          <SideBar role={userRole} />
          <div className="flex-1 flex flex-col">
            <Header onMenuClick={() => { }} />
            <main className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 pb-28 md:pb-10 dark:bg-black">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
