import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-8 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-white/60">
          © {new Date().getFullYear()} INFLECT. All rights reserved.
        </div>
        <div className="flex gap-4 text-sm text-white/60">
          <Link href="/service" className="hover:text-white">서비스</Link>
          <Link href="/pilot" className="hover:text-white">파일럿 신청</Link>
          <Link href="/mypage" className="hover:text-white">마이페이지</Link>
        </div>
      </div>
    </footer>
  );
}