"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

/**
 * Google → Supabase → (redirectTo) /auth/callback
 *
 * 여기서는:
 * - 세션이 생길 때까지 짧게 재시도
 * - 실패하면 /login?error=oauth 로 이동
 */
export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("로그인 처리 중...");

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      // 만약 URL에 에러 파라미터가 있으면 즉시 로그인으로
      const err = searchParams.get("error");
      if (err) {
        const desc = searchParams.get("error_description");
        if (mounted) router.replace(`/login?error=${encodeURIComponent(err)}${desc ? `&error_description=${encodeURIComponent(desc)}` : ""}`);
        return;
      }

      // 세션이 잡힐 때까지 재시도
      for (let i = 0; i < 10; i++) {
        const { data, error } = await supabase.auth.getSession();
        if (error) console.error(error);

        if (data.session) {
          if (!mounted) return;
          setStatus("로그인 완료. 이동 중...");
          router.replace("/mypage");
          return;
        }

        if (!mounted) return;
        await new Promise((r) => setTimeout(r, 250));
      }

      // 끝까지 세션이 없으면 로그인으로
      if (mounted) router.replace("/login?error=oauth");
    };

    run();

    return () => {
      mounted = false;
    };
  }, [router, searchParams]);

  return (
    <div className="mx-auto w-full max-w-md px-4 py-14 text-center">
      <div className="text-lg font-semibold text-slate-900">{status}</div>
      <p className="mt-2 text-sm text-slate-600">창을 닫지 말고 잠시만 기다려주세요.</p>
      <p className="mt-4 text-xs text-slate-500">
        문제가 지속되면 Supabase Authentication → URL Configuration의 Redirect URLs에
        <br />
        <span className="font-mono">{typeof window !== "undefined" ? `${window.location.origin}/auth/callback` : ""}</span>
        <br />
        이 값이 포함되어 있는지 확인하세요.
      </p>
    </div>
  );
}
