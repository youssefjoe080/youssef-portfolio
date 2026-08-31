import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "start";
  className?: string;
}) {
  return (
    <div className={cn("mb-10 md:mb-14", align === "center" ? "text-center mx-auto max-w-2xl" : "text-right", className)}>
      {eyebrow && (
        <span className="mb-3 inline-block rounded-full border border-accent/25 bg-accent/10 px-3.5 py-1.5 text-xs font-bold text-accent-soft">
          {eyebrow}
        </span>
      )}
      <h2 className="text-balance text-3xl font-black md:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-balance text-paper-muted md:text-lg">{subtitle}</p>}
    </div>
  );
}
