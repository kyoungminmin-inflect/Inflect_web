"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { supabase } from "@/lib/supabaseClient";

type Mode = "login" | "signup";

/**
 * StackBlitz/WebContainer 환경에서는 localhost로 redirect 하면 브라우저가 접속할 수 없어 실패합니다.
 * 따라서 현재 접속중인 origin(Preview URL)을 기준으로 callback을 설정합니다.
 *
 * 예: https://...--3000--....webcontainer.io/auth/callback
 */
function getRedirectTo() {
  if (typeof window === "undefined") return "";
  return `${window.location.origin}/auth/callback`;
}

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [mode, setMode] = useState<Mode>("login");
  const title = useMemo(() => (mode === "login" ? "로그인" : "회원가입"), [mode]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // signup only

  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);

  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // 이미 로그인 상태면 /mypage로 보내기
  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      if (data.session) router.replace("/mypage");
    })();
    return () => {
      mounted = false;
    };
  }, [router]);

  // oauth 에러 표시 (callback에서 /login?error=oauth 로 보냄)
  useEffect(() => {
    const err = searchParams.get("error");
    const desc = searchParams.get("error_description");
    if (err) {
      setMessage({
        type: "error",
        text:
          err === "oauth"
            ? "OAuth 로그인 처리에 실패했습니다. Supabase Redirect URLs / Google OAuth 설정을 확인해주세요."
            : `로그인 오류: ${err}${desc ? ` (${desc})` : ""}`,
      });
    }
  }, [searchParams]);

  async function handleGoogleLogin() {
    setMessage(null);
    setOauthLoading(true);

    try {
      const redirectTo = getRedirectTo();
      if (!redirectTo) throw new Error("redirectTo 계산에 실패했습니다. (window undefined)");

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo },
      });

      if (error) throw error;
      // 이후 흐름: Google → Supabase → redirectTo(/auth/callback)
    } catch (e: any) {
      setMessage({
        type: "error",
        text: e?.message ?? "구글 로그인 중 오류가 발생했습니다.",
      });
      setOauthLoading(false);
    }
  }

  // (선택) 이메일/비번 로그인/회원가입은 추후 Supabase 이메일 인증으로 붙이기
  async function handleSubmit() {
    setMessage(null);
    setLoading(true);

    try {
      await new Promise((r) => setTimeout(r, 200));

      if (mode === "signup") {
        if (!username.trim()) throw new Error("아이디를 입력해주세요.");
      }
      if (!email.trim()) throw new Error("이메일을 입력해주세요.");
      if (!password.trim()) throw new Error("비밀번호를 입력해주세요.");

      setMessage({
        type: "success",
        text: "이메일/비밀번호 인증은 다음 단계에서 연결됩니다. 현재는 Google 로그인을 사용해주세요.",
      });
    } catch (e: any) {
      setMessage({
        type: "error",
        text: e?.message ?? "요청 처리 중 오류가 발생했습니다.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-[calc(100vh-88px)] px-4 py-10"
      style={{
        background:
          "radial-gradient(ellipse at top, rgba(230,95,40,0.12), transparent 55%), linear-gradient(to bottom, transparent, rgba(248,249,251,1))",
      }}
    >
      <div className="mx-auto w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h1>
          <p className="mt-2 text-sm text-slate-600">
            {mode === "login"
              ? "계정에 로그인해서 AI 진단과 리포트를 이용하세요."
              : "아이디/이메일/비밀번호로 간단히 가입하세요."}
          </p>
        </div>

        <Card className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
          {/* Mode switch */}
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-semibold text-slate-900">
              {mode === "login" ? "Welcome back" : "Create account"}
            </div>

            <div className="flex gap-1 rounded-full border border-slate-200 bg-white p-1 shadow-sm">
              <button
                type="button"
                onClick={() => setMode("login")}
                className={[
                  "rounded-full px-3 py-1 text-xs font-semibold transition",
                  mode === "login" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-50",
                ].join(" ")}
              >
                로그인
              </button>
              <button
                type="button"
                onClick={() => setMode("signup")}
                className={[
                  "rounded-full px-3 py-1 text-xs font-semibold transition",
                  mode === "signup" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-50",
                ].join(" ")}
              >
                회원가입
              </button>
            </div>
          </div>

          {/* Google Login */}
          <div className="mt-5">
            <Button onClick={handleGoogleLogin} disabled={oauthLoading} className="w-full">
              {oauthLoading ? "Google 로그인 중..." : "Google로 계속"}
            </Button>
            <p className="mt-2 text-xs text-slate-500">
              * 현재 MVP는 Google 로그인으로 계정이 자동 생성됩니다.
              <br />
              * 콜백 URL: <span className="font-mono">{typeof window !== "undefined" ? `${window.location.origin}/auth/callback` : ""}</span>
            </p>
          </div>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <div className="text-xs text-slate-500">또는</div>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">아이디</label>
                <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="inflect_ceo" />
              </div>
            )}

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">이메일</label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" type="email" />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">비밀번호</label>
              <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" type="password" />
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  {mode === "signup" ? "8자 이상을 권장합니다." : "비밀번호를 잊으셨나요?"}
                </span>
                {mode === "login" && (
                  <button
                    type="button"
                    className="text-xs font-semibold text-slate-700 hover:underline"
                    onClick={() =>
                      setMessage({
                        type: "error",
                        text: "비밀번호 재설정 UI는 추후 추가됩니다.",
                      })
                    }
                  >
                    재설정
                  </button>
                )}
              </div>
            </div>

            {message && (
              <div
                className={[
                  "rounded-2xl border p-3 text-sm",
                  message.type === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                    : "border-rose-200 bg-rose-50 text-rose-900",
                ].join(" ")}
              >
                {message.text}
              </div>
            )}

            <Button onClick={handleSubmit} disabled={loading} className="w-full">
              {loading ? "처리중..." : mode === "login" ? "로그인" : "회원가입"}
            </Button>

            <p className="pt-2 text-xs text-slate-400">
              * 이메일/비밀번호 인증은 다음 단계에서 Supabase Email Auth로 연결합니다.
            </p>
          </div>
        </Card>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm font-semibold text-slate-700 hover:underline">
            ← 홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
