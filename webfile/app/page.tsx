import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const BRAND = {
  orange: "var(--brand)", // globals.css에서 --brand = #E65F28
  black: "#0B0B0B",
};

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs text-slate-700 shadow-sm">
    {children}
  </span>
);

const Feature = ({ children }: { children: React.ReactNode }) => (
  <li className="flex gap-3">
    <span
      className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full text-xs font-semibold text-white"
      style={{ background: BRAND.orange }}
    >
      ✓
    </span>
    <span className="text-slate-700">{children}</span>
  </li>
);

type Billing = "monthly" | "yearly";

// (UI만 먼저) 가격/카피는 이후에 너가 원하는 값으로 바꾸면 됨
const plans = [
  {
    name: "Basic",
    tag: "AI Diagnostic",
    desc: "미국 진출 준비 수준을 AI로 빠르게 정량 진단합니다.",
    features: ["AI 기반 준비도 스코어", "리스크 & 포지션 분석", "유사 미국 스타트업 비교", "월간 진단 리포트"],
    priceMonthly: "10만원",
    priceYearly: "100만원",
    cta: "구독",
    href: "/ai-diagnosis",
    highlight: false,
  },
  {
    name: "Pro",
    tag: "AI + Human-in-the-loop",
    desc: "AI 분석에 전문가 인사이트를 더해 실행 가능한 방향성을 제공합니다.",
    features: ["Basic 전체 기능", "전문가 리뷰 & 해석", "전략적 방향성 제안", "30/60/90일 실행 로드맵"],
    priceMonthly: "25만원",
    priceYearly: "250만원",
    cta: "파일럿 신청",
    href: "/pilot",
    highlight: true,
  },
  {
    name: "VC Edition",
    tag: "Portfolio-level Analysis",
    desc: "여러 스타트업을 같은 기준으로 한 번에 비교/판단합니다.",
    features: ["다수 스타트업 일괄 분석", "포트폴리오 비교 대시보드", "투자 검토용 요약 리포트"],
    priceMonthly: "40만원",
    priceYearly: "400만원",
    cta: "Contact Sales",
    href: "/service",
    highlight: false,
  },
] as const;

export default function HomePage() {
  const billing: Billing = "monthly"; // (UI만) 토글까지 원하면 client 컴포넌트로 바꿔줄게

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="pt-10 md:pt-14">
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* Left */}
          <div>
            <div className="flex flex-wrap gap-2">
              <Pill>월 구독 리포트</Pill>
              <Pill>CEO-ready 요약</Pill>
              <Pill>성공/실패 사례 기반</Pill>
              <Pill>정량 진단</Pill>
            </div>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
              미국 진출, <span style={{ color: BRAND.orange }}>감</span>이 아니라
              <br />
              <span style={{ color: BRAND.orange }}>수치</span>로 결정하세요.
            </h1>

            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              INFLECT는 스타트업이 입력/업로드한 회사 정보(사업/투자 계획서 등)를 기반으로
              GTM 성공 확률과 리스크, 추천 전략을 구조화된 리포트로 제공합니다.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/#pricing"
                className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-105"
                style={{ background: BRAND.orange }}
              >
                구독하기
              </Link>
              <Link
                href="/#how"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
              >
                어떻게 작동하나요?
              </Link>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              * 홈페이지는 소개용 MVP입니다. 회사 정보 입력/분석 대시보드는 다음 단계에서 구현합니다.
            </p>

            <div className="mt-8 grid gap-3 md:grid-cols-3">
              <Card className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm">
                <div className="text-sm font-semibold text-slate-900">정확도 중심</div>
                <div className="mt-1 text-sm text-slate-600">입력 정보 기반으로 근거를 함께 제시</div>
              </Card>
              <Card className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm">
                <div className="text-sm font-semibold text-slate-900">보안 우선</div>
                <div className="mt-1 text-sm text-slate-600">민감 정보 업로드 UX + 보안 안내</div>
              </Card>
              <Card className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm">
                <div className="text-sm font-semibold text-slate-900">실행 가능한 결과</div>
                <div className="mt-1 text-sm text-slate-600">채널/포지셔닝/우선순위까지</div>
              </Card>
            </div>
          </div>

          {/* Right visual */}
          <div className="relative">
            <div
              className="absolute -inset-2 rounded-3xl blur-2xl"
              style={{
                background: "linear-gradient(to top right, rgba(230,95,40,0.22), transparent)",
              }}
            />
            <div className="relative rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-sm p-6 shadow-sm">
              <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
  {/* Logo mark */}
  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black">
    <span
      className="text-base font-extrabold"
      style={{ color: "var(--brand)" }}
    >
      I
    </span>
  </div>

  <div className="font-semibold tracking-tight text-slate-900">
    INFLECT
  </div>

  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
    sample (demo)
  </span>
</div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
                  January Report
                </span>
              </div>

              <div className="mt-6 grid gap-3">
                <div className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-slate-800">Preparedness Score</div>
                    <div className="text-sm font-semibold text-slate-900">78 / 100</div>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-slate-100">
                    <div className="h-2 w-[78%] rounded-full" style={{ background: BRAND.orange }} />
                  </div>
                  <div className="mt-2 text-xs text-slate-500">
                    재무 안정성 / GTM 적합도 / 경쟁 포지션 / 운영 리스크
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 p-4">
                  <div className="text-sm font-medium text-slate-800">Top Risks</div>
                  <ul className="mt-3 space-y-2 text-sm">
                    {[
                      ["Pricing mismatch (US)", "High"],
                      ["Channel strategy uncertainty", "Medium"],
                      ["Compliance readiness", "Medium"],
                    ].map(([label, level]) => (
                      <li key={label} className="flex items-center justify-between">
                        <span className="text-slate-600">{label}</span>
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
                          {level}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-slate-200 p-4">
                  <div className="text-sm font-medium text-slate-800">This Month Deliverables</div>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600">
                    <li>• Comparable US companies list + positioning</li>
                    <li>• Success/Failure case analysis</li>
                    <li>• Next-step roadmap (90 days)</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                <div>
                  <div className="text-sm font-semibold text-slate-900">CEO Summary</div>
                  <div className="text-xs text-slate-500">“결정에 필요한 것만 한 장으로”</div>
                </div>
                <div className="text-xs text-slate-500">PDF • Dashboard • Notion</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product */}
      <section id="product" className="scroll-mt-24">
        <div className="rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-sm p-8 shadow-sm">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                대표가 “결정”하기 쉬운 정보만.
              </h2>
              <p className="mt-3 text-slate-600">
                입력된 회사 정보를 바탕으로, 미국 시장 조사와 케이스 분석을 결합해 매달 업데이트되는
                “맞춤형 진출 브리핑”을 제공합니다.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:col-span-2">
              {[
                {
                  title: "정량 진단",
                  desc: "준비 수준과 리스크를 스코어/지표로 명확하게 보여줍니다.",
                  items: ["재무/현금흐름 신호", "GTM 적합도", "운영/법무 리스크"],
                },
                {
                  title: "사례 기반 인사이트",
                  desc: "성공/실패 사례를 비교해 “왜 되는지/왜 안 되는지”를 알려줍니다.",
                  items: ["Comparable US startups", "실패 원인 패턴", "포지셔닝 제안"],
                },
                {
                  title: "월간 구독 리포트",
                  desc: "매달 업데이트되는 시장 변화와 실행 로드맵을 제공합니다.",
                  items: ["시장 동향 요약", "이번 달 해야 할 일", "90일 실행계획"],
                },
                {
                  title: "AI 맞춤 도우미",
                  desc: "각 회사에 최적화된 미국 진출 도우미 AI를 목표로 합니다.",
                  items: ["회사별 맥락 반영", "지속 학습(데이터/피드백)", "의사결정 지원"],
                },
              ].map((c) => (
                <div key={c.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="text-sm font-semibold text-slate-900">{c.title}</div>
                  <p className="mt-2 text-sm text-slate-600">{c.desc}</p>
                  <ul className="mt-4 space-y-2 text-sm">
                    {c.items.map((it) => (
                      <Feature key={it}>{it}</Feature>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How */}
      <section id="how" className="scroll-mt-24">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              step: "01",
              title: "회사 정보 입력",
              desc: "재무/지표/전략 정보를 입력하거나 문서를 업로드합니다. (현재는 MVP UI)",
            },
            {
              step: "02",
              title: "시장/케이스 분석",
              desc: "미국 유사 기업과 성공/실패 패턴을 비교해 리스크와 기회를 구조화합니다.",
            },
            {
              step: "03",
              title: "월간 브리핑 제공",
              desc: "대표가 이해하기 쉬운 형태로 ‘이번 달 결정을 위한 정보’를 제공합니다.",
            },
          ].map((c) => (
            <div
              key={c.step}
              className="rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-sm p-6 shadow-sm"
            >
              <div className="text-xs text-slate-500">{c.step}</div>
              <div className="mt-2 text-lg font-semibold text-slate-900">{c.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Security */}
      <section id="security" className="scroll-mt-24">
        <div className="rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-sm p-8 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                보안은 “옵션”이 아니라 기본값.
              </h2>
              <p className="mt-3 text-slate-600">
                INFLECT는 민감한 기업 정보를 다루므로, 제품 설계 단계부터 보안을 최우선으로 둡니다.
                (아래는 홈페이지에 표시할 신뢰 메시지이며, 실제 구현은 다음 단계에서 적용합니다.)
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
              Data security-first design
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "최소 권한 접근",
                desc: "역할 기반 권한(RBAC)과 접근 제어로 내부/외부 노출을 최소화합니다.",
              },
              {
                title: "암호화 & 분리 저장",
                desc: "전송/저장 암호화 및 민감정보 분리로 데이터 유출 리스크를 낮춥니다.",
              },
              {
                title: "감사 로그",
                desc: "누가 언제 어떤 데이터에 접근했는지 추적 가능한 로그를 남깁니다.",
              },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-sm font-semibold text-slate-900">{c.title}</div>
                <p className="mt-2 text-sm text-slate-600">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="scroll-mt-24 pb-16">
        <div className="rounded-3xl border border-slate-200 p-8 text-white shadow-sm" style={{ background: BRAND.black }}>
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                월 구독으로, 매달 업데이트되는 미국 진출 브리핑을 받으세요.
              </h2>
              <p className="mt-3 text-white/80">
                INFLECT는 “결정에 필요한 정보”를 매달 제공하는 구독 서비스입니다.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-white/85">
                <li>• CEO-ready 요약 + 근거 자료</li>
                <li>• 유사 기업/경쟁 지도 + 포지셔닝</li>
                <li>• 성공/실패 사례 분석 + 실행 로드맵</li>
              </ul>
            </div>

            <div className="rounded-3xl bg-white p-6 text-slate-900">
              <div className="text-sm font-semibold">파일럿 서비스</div>
              <p className="mt-2 text-sm text-slate-600">
                파일럿 기간동안 Basic 모델에 한해 무료로 서비스를 제공하고 있습니다.
                Pro 모델 파일럿을 희망하시는 경우 파일럿 신청을 부탁드립니다.
              </p>

              <div className="mt-5 grid gap-3">
                <Link
                  href="/ai-diagnosis"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Basic로 시작하기
                </Link>
                <Link
                  href="/pilot"
                  className="inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold text-white"
                  style={{ background: BRAND.orange }}
                >
                  Pro 파일럿 신청
                </Link>
              </div>

              <div className="mt-4 text-xs text-slate-500">
                * 결제/구독은 추후 Stripe 연결로 활성화됩니다.
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={[
                "rounded-3xl border bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg",
                p.highlight ? "relative border-[var(--brand)]/60" : "border-slate-200",
              ].join(" ")}
            >
              {p.highlight && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-semibold text-white shadow"
                  style={{ background: BRAND.orange }}
                >
                  Most Popular
                </div>
              )}

              <div className="text-sm font-semibold text-slate-900">{p.name}</div>
              <div className="mt-1 text-xs text-slate-500">{p.tag}</div>

              <p className="mt-4 text-sm text-slate-600">{p.desc}</p>

              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {p.features.map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>

              <div className="mt-6 text-2xl font-semibold text-slate-900">
                {billing === "monthly" ? p.priceMonthly : p.priceYearly}
                <span className="text-sm font-medium text-slate-500">
                  {" "}
                  / {billing === "monthly" ? "월" : "연"}
                </span>
              </div>

              <div className="mt-6">
                <Link
                  href={p.href}
                  className={
                    p.highlight
                      ? "inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-105"
                      : "inline-flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
                  }
                  style={p.highlight ? { background: BRAND.orange } : undefined}
                >
                  {p.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <footer className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-slate-200 pt-8 md:flex-row md:items-center">
          <div className="text-sm text-slate-600">© {new Date().getFullYear()} INFLECT.</div>
          <div className="text-sm text-slate-600">Contact: jeeyoujung@inflectco.com</div>
        </footer>
      </section>
    </div>
  );
}