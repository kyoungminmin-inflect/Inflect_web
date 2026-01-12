"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_ITEMS } from "@/lib/nav";
import { cn } from "@/lib/cn";
import { supabase } from "@/lib/supabaseClient";

export function Header() {
  const pathname = usePathname();
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    let mounted = true;

    // 초기 세션 확인
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (mounted) setIsAuthed(!!data.session);
    })();

    // 이후 로그인/로그아웃 상태 변화 감지
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) setIsAuthed(!!session);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black shadow-sm">
            <span className="text-lg font-extrabold" style={{ color: "var(--brand)" }}>
              I
            </span>
          </div>

          <div className="leading-tight">
            <div className="font-semibold tracking-tight text-slate-900">INFLECT</div>
            <div className="hidden text-xs text-slate-500 md:block">US GTM AI Diagnostics • Subscription</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const isHash = item.href.startsWith("/#");
            const active = isHash ? pathname === "/" : item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-xl px-4 py-2 text-sm font-medium transition",
                  active ? "bg-slate-100 text-slate-900" : "text-slate-700 hover:bg-slate-100"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-2">
          <Link
            href="/ai-diagnosis"
            className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-105"
            style={{ background: "var(--brand)" }}
          >
            AI 진단하기
          </Link>

          {!isAuthed ? (
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              로그인
            </Link>
          ) : (
            <Link
              href="/mypage"
              className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              마이페이지
            </Link>
          )}

          {/* 구독(홈 pricing 섹션) */}
          <Link
            href="/#pricing"
            className="hidden items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-105 md:inline-flex"
            style={{ background: "var(--brand)" }}
          >
            구독
          </Link>
        </div>
      </div>

      {/* Mobile Nav Pills */}
      <div className="mx-auto w-full max-w-6xl px-4 pb-3 md:hidden">
        <div className="flex flex-wrap gap-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-slate-200 bg-white/70 px-3 py-1.5 text-xs text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
