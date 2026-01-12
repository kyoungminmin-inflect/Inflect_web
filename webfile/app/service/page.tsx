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

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="text-lg font-semibold">무엇을 제공하나요?</h2>
          <ul className="mt-4 space-y-2 text-sm text-black/80">
            <li>• 회사 정보 기반 GTM 성공 확률 스코어링</li>
            <li>• 리스크/기회 요인 구조화 및 우선순위</li>
            <li>• 채널/포지셔닝/세일즈 모션 추천</li>
            <li>• 월별 시장 변화 반영 이메일 리포트</li>
          </ul>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold">보안(안내)</h2>
          <p className="mt-3 text-sm text-black/80">
            사용자는 사업/투자 계획서 등 공개되지 않은 자료를 업로드할 수 있으므로,
            서비스 화면에서 업로드 목적과 처리 범위를 명확히 안내합니다.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-black/80">
            <li>• 업로드 파일은 분석 목적에 한해 사용(백엔드 정책 연결 예정)</li>
            <li>• 민감 정보(개인식별/비밀번호 등) 업로드 금지 안내</li>
            <li>• 조직/플랜에 따른 데이터 보관/삭제 옵션(향후 제공)</li>
          </ul>
          <p className="mt-4 text-xs text-black/50">
            * 실제 보안/보관 정책 문구는 법무/보안 정책 확정 후 교체하세요.
          </p>
        </Card>
      </div>

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