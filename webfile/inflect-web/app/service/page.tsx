import { Card } from "@/components/ui/Card";

export default function ServicePage() {
  return (
    <div className="space-y-6">
      <header className="pt-2">
        <h1 className="text-3xl font-semibold">서비스</h1>
        <p className="mt-2 text-muted">
          INFLECT는 스타트업의 미국 진출(GTM)을 위한 성공 확률 진단과 실행 리포트를 제공합니다.
        </p>
      </header>

      

      <Card>
        <h2 className="text-lg font-semibold">워크플로우</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-4">
          {[
            ["입력", "회사/시장/제품/팀 정보"],
            ["업로드", "사업/투자 계획서 등"],
            ["분석", "모델 추론 + 근거 정리"],
            ["리포트", "대시보드/이메일 업데이트"],
          ].map(([t, d]) => (
            <div key={t} className="glass rounded-xl p-4">
              <div className="text-sm font-semibold">{t}</div>
              <div className="mt-1 text-sm text-muted">{d}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
