import { cn } from "@/lib/cn";

type Variant = "brand" | "outline" | "ghost";

export function Button({
  variant = "brand",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  const base =
    "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed";

  const styles: Record<Variant, string> = {
    brand: "bg-[var(--brand)] text-black hover:brightness-110",
    outline: "border border-white/15 bg-transparent text-white/85 hover:bg-white/5",
    ghost: "bg-transparent text-white/75 hover:bg-white/5 hover:text-white",
  };

  return <button {...props} className={cn(base, styles[variant], className)} />;
}