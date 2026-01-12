"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type Msg = { role: "user" | "assistant"; content: string };

const BRAND = {
  orange: "var(--brand)",
};

function formatMB(bytes: number) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export default function AIDiagnosisPage() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "안녕하세요. 회사/시장/제품/팀/재무/채널 정보를 입력하거나 파일을 업로드하면, 미국 GTM 관점에서 진단 리포트를 생성해드릴게요.",
    },
  ]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);

  const [files, setFiles] = useState<File[]>([]);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const chatRef = useRef<HTMLDivElement | null>(null);

  const fileCountLabel = useMemo(() => {
    if (files.length === 0) return "업로드된 파일 없음";
    if (files.length === 1) return "파일 1개 업로드됨";
    return `파일 ${files.length}개 업로드됨`;
  }, [files.length]);

  useEffect(() => {
    // 새 메시지 오면 아래로 자동 스크롤
    const el = chatRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages.length, busy]);

  async function mockAskLLM(userText: string) {
    // TODO: 백엔드 LLM API로 교체 (files 포함하여 전송)
    await new Promise((r) => setTimeout(r, 700));
    return `진단 요약(모의)
- 성공 확률 스코어: 0.72
- 주요 리스크: 포지셔닝/채널 가설 부족
- 추천 액션: ICP 명확화 → 채널 실험 3개 설계 → KPI 트래킹

(업로드 파일 ${files.length}개 반영은 백엔드 연결 시 적용)`;
  }

  async function send() {
    const trimmed = text.trim();
    if (!trimmed || busy) return;

    setMessages((m) => [...m, { role: "user", content: trimmed }]);
    setText("");
    setBusy(true);

    try {
      const answer = await mockAskLLM(trimmed);
      setMessages((m) => [...m, { role: "assistant", content: answer }]);
    } finally {
      setBusy(false);
    }
  }

  function onPickFiles(list: FileList | null) {
    if (!list) return;
    const next = Array.from(list);
    setFiles((prev) => [...prev, ...next]);
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div
      className="px-4 py-8"
      style={{
        background:
          "radial-gradient(ellipse at top, rgba(230,95,40,0.10), transparent 55%), linear-gradient(to bottom, transparent, rgba(248,249,251,1))",
      }}
    >
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">AI 진단하기</h1>
            <p className="mt-2 text-sm text-slate-600">
              사업 계획서/투자 계획서 등 공개되지 않은 정보를 업로드하고, 대화 형태로 분석 리포트를 받으세요.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              {fileCountLabel}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              Demo UI
            </span>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-12">
          {/* Left: Upload + Tips */}
          <Card className="md:col-span-4 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">문서 업로드</h2>
                <p className="mt-2 text-sm text-slate-600">
                  PDF/Doc/Slides 업로드로 분석 정확도를 높일 수 있어요.
                </p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                Optional
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <input
                ref={fileRef}
                type="file"
                multiple
                className="hidden"
                onChange={(e) => onPickFiles(e.target.files)}
              />
              <Button variant="outline" onClick={() => fileRef.current?.click()}>
                파일 선택
              </Button>
              <Button variant="ghost" onClick={() => setFiles([])} disabled={files.length === 0}>
                전체 초기화
              </Button>
            </div>

            <div className="mt-4 space-y-2">
              {files.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-5 text-sm text-slate-500">
                  업로드된 파일이 없습니다. <br />
                  <span className="text-xs text-slate-400">IR Deck / Market research / Financial assumptions 등을 권장해요.</span>
                </div>
              ) : (
                files.map((f, idx) => (
                  <div
                    key={`${f.name}-${idx}`}
                    className="flex items-start justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4"
                  >
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-slate-900">{f.name}</div>
                      <div className="mt-1 text-xs text-slate-500">{formatMB(f.size)}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(idx)}
                      className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                      aria-label="Remove file"
                    >
                      제거
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="text-sm font-semibold text-slate-900">업로드 가이드</div>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full" style={{ background: BRAND.orange }} />
                  <span>개인식별/비밀번호 등 민감정보는 제거 후 업로드</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full" style={{ background: BRAND.orange }} />
                  <span>IR/Deck/시장조사/재무 가정이 포함되면 진단 품질이 상승</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full" style={{ background: BRAND.orange }} />
                  <span>업로드된 내용은 외부에 공개되지 않도록 설계할 예정 (MVP 단계)</span>
                </li>
              </ul>
            </div>
          </Card>

          {/* Right: Chat */}
          <Card className="md:col-span-8 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">진단 채팅</h2>
                <p className="mt-1 text-sm text-slate-600">
                  아래 입력창에 정보를 적고 전송하세요. (Enter 전송 지원)
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  {busy ? "분석 중" : "Ready"}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  LLM: mock
                </span>
              </div>
            </div>

            {/* Chat window */}
            <div
              ref={chatRef}
              className="mt-4 h-[420px] overflow-auto rounded-3xl border border-slate-200 bg-white p-4"
            >
              <div className="space-y-3">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={[
                      "max-w-[92%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed",
                      m.role === "user"
                        ? "ml-auto border border-slate-200 bg-slate-900 text-white"
                        : "border border-slate-200 bg-slate-50 text-slate-900",
                    ].join(" ")}
                  >
                    {m.content}
                  </div>
                ))}

                {busy && (
                  <div className="max-w-[92%] rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    분석 중… 잠시만요.
                  </div>
                )}
              </div>
            </div>

            {/* Composer */}
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <div className="flex-1">
                <Input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="회사/시장/제품/팀/재무/채널 전략 등을 입력해 주세요."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") send();
                  }}
                />
                <div className="mt-2 text-xs text-slate-500">
                  Tip: ICP, 경쟁사, 가격, 채널 가설, KPI를 함께 적으면 품질이 좋아져요.
                </div>
              </div>

              <Button
                onClick={send}
                disabled={busy || text.trim().length === 0}
                className="sm:w-28"
              >
                {busy ? "분석중..." : "전송"}
              </Button>
            </div>

            {/* Email report interface */}
            <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    월별 시장 변화에 맞춘 업데이트 리포트 (이메일)
                  </div>
                  <div className="mt-1 text-sm text-slate-600">
                    지금 제공해주신 정보를 기반으로, 시장 변화에 맞춘 업데이트를 정기적으로 이메일로 보내드립니다.
                  </div>
                </div>

                <Button variant="outline">이메일 리포트 구독(모의)</Button>
              </div>

              <p className="mt-2 text-xs text-slate-400">
                * 실제 발송/구독 상태 관리는 백엔드(구독/알림) 연결 시 적용됩니다.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}