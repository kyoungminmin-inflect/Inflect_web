import "./globals.css";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// ✅ Geist 폰트 (npm i geist 로 설치한 것 사용)
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

export const metadata: Metadata = {
  title: "INFLECT — US GTM AI Diagnostics",
  description: "AI로 미국 진출(GTM) 성공 확률과 진단 리포트를 생성합니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body
        className={`
          ${GeistSans.className}
          ${GeistMono.variable}
          antialiased
        `}
      >
        <Header />
        <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
