"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { supabase } from "@/lib/supabaseClient";

type Plan = "Basic" | "Pro";

type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
};

export default function MyPage() {
  const router = useRouter();

  const [plan, setPlan] = useState<Plan>("Basic");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");

  const [loadingProfile, setLoadingProfile] = useState(true);

  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [upgrading, setUpgrading] = useState(false);

  const planBadge = useMemo(() => {
    return plan === "Pro"
      ? { label: "Pro", cls: "bg-[var(--brand)] text-white" }
      : { label: "Basic", cls: "bg-slate-100 text-slate-800" };
  }, [plan]);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoadingProfile(true);

      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData.session;

      if (!session) {
        router.replace("/login");
        return;
      }

      // profiles 트리거 생성 타이밍 대비: 짧게 재시도
      for (let i = 0; i < 5; i++) {
        const { data, error } = await supabase
          .from("profiles")
          .select("id, email, full_name, avatar_url")
          .single();

        if (!error && data) {
          const profile = data as Profile;
          if (!mounted) return;

          setEmail(profile.email ?? session.user.email ?? "");
          setFullName(profile.full_name ?? "");
          setLoadingProfile(false);
          return;
        }

        await new Promise((r) => setTimeout(r, 200));
      }

      // 그래도 없으면 최소 세션 이메일이라도 표시
      if (mounted) {
        setEmail(session.user.email ?? "");
        setFullName("");
        setLoadingProfile(false);
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, [router]);

  async function saveAccount() {
    setMessage(null);
    setSaving(true);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        router.replace("/login");
        return;
      }

      if (!email.trim()) throw new Error("이메일을 입력해주세요.");
      if (password && password.trim().length < 8) throw new Error("비밀번호는 8자 이상을 권장합니다.");

      // profiles 업데이트(이름/이메일)
      const { error: upErr } = await supabase
        .from("profiles")
        .update({ email: email.trim(), full_name: fullName.trim() || null })
        .eq("id", sessionData.session.user.id);

      if (upErr) throw upErr;

      // 비밀번호 변경(선택)
      if (password.trim()) {
        const { error: pwErr } = await supabase.auth.updateUser({ password: password.trim() });
        if (pwErr) throw pwErr;
      }

      setMessage({ type: "success", text: "계정 정보가 저장되었습니다." });
      setPassword("");
    } catch (e: any) {
      setMessage({ type: "error", text: e?.message ?? "저장 중 오류가 발생했습니다." });
    } finally {
      setSaving(false);
    }
  }

  async function upgradeToPro() {
    setMessage(null);
    setUpgrading(true);
    try {
      // TODO: 실제 결제/구독 로직 연결 (Stripe)
      await new Promise((r) => setTimeout(r, 500));
      setPlan("Pro");
      setMessage({ type: "success", text: "Pro로 업그레이드되었습니다(데모)." });
    } catch {
      setMessage({ type: "error", text: "업그레이드 중 오류가 발생했습니다." });
    } finally {
      setUpgrading(false);
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    router.replace("/");
  }

  return (
    <div
      className="px-4 py-8"
      style={{
        background:
          "radial-gradient(ellipse at top, rgba(230,95,40,0.10), transparent 55%), linear-gradient(to bottom, transparent, rgba(248,249,251,1))",
      }}
    >
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">마이페이지</h1>
            <p className="mt-2 text-sm text-slate-600">계정 정보 및 구독 플랜을 관리합니다.</p>
            {!loadingProfile && (
              <p className="mt-2 text-xs text-slate-500">
                로그인: <span className="font-medium text-slate-700">{fullName || "(이름 없음)"}</span>{" "}
                <span className="text-slate-400">•</span>{" "}
                <span className="font-medium text-slate-700">{email}</span>
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${planBadge.cls}`}>
              {planBadge.label} Plan
            </span>
            <Link
              href="/ai-diagnosis"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
            >
              AI 진단하기
            </Link>
            <button
              onClick={logout}
              className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              type="button"
            >
              로그아웃
            </button>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Account */}
          <Card className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">나의 계정 정보</h2>
            <p className="mt-1 text-sm text-slate-600">이메일/이름/비밀번호를 업데이트할 수 있습니다.</p>

            <div className="mt-5 space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">이름</label>
                <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="이름" />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">이메일</label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">비밀번호 변경</label>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="새 비밀번호 입력 (선택)"
                />
                <div className="mt-2 text-xs text-slate-500">* 비밀번호는 8자 이상을 권장합니다.</div>
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

              <Button onClick={saveAccount} className="w-full" disabled={saving || loadingProfile}>
                {saving ? "저장 중..." : "저장"}
              </Button>
            </div>
          </Card>

          {/* Subscription */}
          <Card className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">구독 플랜</h2>
            <p className="mt-1 text-sm text-slate-600">현재 플랜과 업그레이드 옵션을 확인하세요.</p>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold text-slate-900">현재 플랜</div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${planBadge.cls}`}>
                      {plan}
                    </span>
                    <span className="text-sm text-slate-600">
                      {plan === "Pro" ? "심화 분석 + 월 2회 업데이트" : "초기 진단 + 월 1회 업데이트"}
                    </span>
                  </div>
                </div>

                <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  Billing: Monthly
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900">Pro 플랜 업그레이드</div>
                  <p className="mt-1 text-sm text-slate-600">
                    문서 기반 심화 분석 + 전문가 인사이트 + 월 2회 업데이트 리포트
                  </p>

                  <Button
                    variant="outline"
                    className="mt-3 w-full"
                    onClick={upgradeToPro}
                    disabled={plan === "Pro" || upgrading}
                  >
                    {plan === "Pro" ? "이미 Pro 입니다" : upgrading ? "업그레이드 중..." : "Pro로 업그레이드(데모)"}
                  </Button>
                </div>

                <div className="text-xs text-slate-400">
                  * 결제/구독 관리는 Stripe 등 결제 시스템 연결 시 실제 동작으로 교체하세요.
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="pt-2 text-center">
          <Link href="/" className="text-sm font-semibold text-slate-700 hover:underline">
            ← 홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
