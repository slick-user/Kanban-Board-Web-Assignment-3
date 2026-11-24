interface BadgeProps {
  label: string;
  tone?: "low" | "medium" | "high" | "neutral" | "brand";
}

const tones = {
  low: "bg-emerald-100 text-emerald-800",
  medium: "bg-amber-100 text-amber-800",
  high: "bg-rose-100 text-rose-800",
  neutral: "bg-ink/5 text-muted",
  brand: "bg-brand/10 text-brand-dark",
};

export default function Badge({ label, tone = "neutral" }: BadgeProps) {
  return <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${tones[tone]}`}>{label}</span>;
}
