"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

type Mode = "none" | "basic" | "pro";

function CheckRow({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 text-sm text-slate-700">
      <span
        className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white"
        style={{ background: "var(--brand)" }}
      >
        ✓
      </span>
      <span className="leading-relaxed">{children}</span>
    </li>
  );
}

function PricePill({
  original,
  now,
  note,
}: {
  original: string;
  now: string;
  note: string;
}) {
  return (
    <div className="flex items-end gap-3">
      <div className="text-sm text-slate-500 line-through">{original}</div>
      <div className="text-3xl font-semibold tracking-tight text-slate-900">
        {now}
      </div>
      <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
        {note}
      </div>
    </div>
  );
}

export default function PilotPage() {
  const [mode, setMode] = useState<Mode>("none");
  const [message, setMessage] = useState<string | null>(null);

  // Pro form
  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [summary, setSummary] = useState("");
  const [reason, setReason] = useState("");
  const [purpose, setPurpose] = useState("");

  const isProOpen = useMemo(() => mode === "pro", [mode]);

  async function grantBasic() {
    setMessage(null);
    setMode("basic");
    await new Promise((r) => setTimeout(r, 350));
    setMessage("Basic 파일럿 권한이 부여되었습니다(모의). 이제 AI 진단하기로 이동해보세요.");
  }

  async function submitPro() {
    setMessage(null);

    try {
      if (!companyName.trim()) throw new Error("회사명을 입력해주세요.");
      if (!summary.trim()) throw new Error("회사 소개를 입력해주세요.");
      if (!reason.trim()) throw new Error("미국 진출 이유를 입력해주세요.");
      if (!purpose.trim()) throw new Error("미국 진출 목적을 입력해주세요.");

      // TODO: 백엔드 제출 API 연결
      await new Promise((r) => setTimeout(r, 600));
      setMessage("Pro 파일럿 신청이 접수되었습니다(모의). 검토 후 안내드리겠습니다.");
    } catch (e: any) {
      setMessage(e?.message ?? "제출 중 오류가 발생했습니다.");
    }
  }

  return (
    <div className="space-y-8 pt-2">
      {/* Header */}
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          파일럿 신청
        </h1>
        <p className="text-slate-600">
          결제 전, 우리 회사에 맞는지 먼저 검증해보세요. 파일럿 기간 동안{" "}
          <span className="font-semibold text-slate-900">
            Basic/Pro를 무료로 체험
          </span>
          할 수 있습니다.
        </p>
      </header>

      {/* Benefits (new UX) */}
      <Card className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="max-w-2xl">
            <div className="text-sm font-semibold text-slate-900">
              파일럿 혜택
              <span className="ml-2 rounded-full bg-[var(--brand)]/10 px-3 py-1 text-xs font-semibold text-[var(--brand)]">
                3개월 무료 체험
              </span>
            </div>

            <p className="mt-2 text-sm text-slate-600">
              파일럿 종료 후에만 구독 여부를 결정하면 됩니다. (필요 시 운영 정책에 맞게
              기간/가격 문구만 바꿔서 사용하세요.)
            </p>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="text-xs font-semibold text-slate-500">Basic (정량 진단)</div>
                <div className="mt-2">
                  <PricePill original="월 ₩100,000" now="₩0" note="최대 3개월 무료" />
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="text-xs font-semibold text-slate-500">
                  Pro (Human-in-the-loop)
                </div>
                <div className="mt-2">
                  <PricePill
                    original="월 ₩250,000"
                    now="₩0"
                    note="선정 기업 한정"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
            <div className="font-semibold text-slate-900">진행 방식</div>
            <ul className="mt-2 space-y-1 text-sm text-slate-600">
              <li>• Basic: 즉시 시작</li>
              <li>• Pro: 신청 폼 제출 → 선정 기업 제공</li>
              <li>• 종료 후 구독 여부 결정</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Basic */}
        <Card className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Basic 파일럿</h2>
              <p className="mt-2 text-sm text-slate-600">
                빠르게 시작: 기본 진단 + 월 1회 업데이트 리포트(이메일)
              </p>
            </div>

            <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
              즉시 시작
            </span>
          </div>

          <div className="mt-5 rounded-2xl bg-slate-50 p-4">
            <PricePill original="월 ₩100,000" now="₩0" note="최대 3개월" />
            <p className="mt-2 text-xs text-slate-500">
              * 파일럿 종료 후에만 구독 여부를 결정합니다.
            </p>
          </div>

          <ul className="mt-5 space-y-3">
            <CheckRow>미국 진출 준비도 스코어 + 핵심 리스크 요약</CheckRow>
            <CheckRow>유사 미국 스타트업 비교</CheckRow>
            <CheckRow>월 1회 업데이트 리포트(이메일)</CheckRow>
          </ul>

          {/* ✅ Footer fixed so both cards align */}
          <div className="mt-auto pt-6">
            <div className="grid gap-2 sm:grid-cols-2">
              <Button className="w-full" onClick={grantBasic}>
                Basic 권한 받기
              </Button>

              <Link href="/ai-diagnosis" className="block">
                <Button variant="outline" className="w-full">
                  바로 진단하기
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        {/* Pro */}
        <Card className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Pro 파일럿</h2>
              <p className="mt-2 text-sm text-slate-600">
                문서 기반 심화 분석 + 전문가 검토(Human-in-the-loop)로 실행 전략까지 보완
                + 월 2회 업데이트
              </p>
            </div>

            <span className="rounded-full bg-[var(--brand)]/10 px-3 py-1 text-xs font-semibold text-[var(--brand)]">
              Recommended
            </span>
          </div>

          <div className="mt-5 rounded-2xl bg-slate-50 p-4">
            <PricePill original="월 ₩250,000" now="₩0" note="선정 기업 한정" />
            <p className="mt-2 text-xs text-slate-500">
              * 신청 후 선정된 기업에 한해 제공됩니다.
            </p>
          </div>

          <ul className="mt-5 space-y-3">
            <CheckRow>문서 업로드 기반 정밀 분석(IR/Deck/재무 가정 등)</CheckRow>
            <CheckRow>전문가 검토(Human-in-the-loop)로 리스크/전략 보완</CheckRow>
            <CheckRow>월 2회 업데이트 리포트(이메일)</CheckRow>
          </ul>

          {/* ✅ Footer fixed so both cards align */}
          <div className="mt-auto pt-6">
            <Button
              className="w-full"
              variant="outline"
              onClick={() => {
                setMode("pro");
                setMessage(null);
              }}
            >
              Pro 파일럿 신청하기
            </Button>
          </div>
        </Card>
      </div>

      {/* Message */}
      {message && (
        <Card className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm">
          <div className="text-sm text-slate-800">{message}</div>
        </Card>
      )}

      {/* Pro form */}
      {isProOpen && (
        <Card className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Pro 파일럿 신청 폼</h2>
              <p className="mt-1 text-sm text-slate-600">
                아래 정보는 선정/분석 범위 설정을 위해 사용됩니다.
              </p>
            </div>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              평균 2~3분 소요
            </span>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                회사명
              </label>
              <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                웹사이트(선택)
              </label>
              <Input
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-xs font-medium text-slate-700">
                회사 기본 소개
              </label>
              <Textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="제품/타깃/핵심 지표/현재 traction 등"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-xs font-medium text-slate-700">
                미국 진출 이유
              </label>
              <Textarea value={reason} onChange={(e) => setReason(e.target.value)} />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-xs font-medium text-slate-700">
                미국 진출 목적
              </label>
              <Textarea
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="예: 고객 확보, 파트너십, 투자 유치 등"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button
              variant="ghost"
              onClick={() => {
                setMode("none");
                setMessage(null);
              }}
            >
              닫기
            </Button>
            <Button onClick={submitPro}>제출</Button>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            * 제출 데이터 저장/검토 프로세스는 백엔드 연결 시 실제 동작으로 교체하세요.
          </p>
        </Card>
      )}
    </div>
  );
}