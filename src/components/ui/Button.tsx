import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "whatsapp" | "danger";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gradient-to-l from-accent to-accent-soft text-ink-950 shadow-glow hover:brightness-110 active:brightness-95",
  secondary:
    "bg-ink-800 text-paper border border-ink-600 hover:bg-ink-700",
  ghost: "bg-transparent text-paper hover:bg-ink-800 border border-transparent",
  whatsapp: "bg-[#25D366] text-ink-950 hover:brightness-105",
  danger: "bg-red-600/90 text-white hover:bg-red-600",
};

const sizeClasses: Record<Size, string> = {
  sm: "text-sm px-3.5 py-2 rounded-xl gap-1.5",
  md: "text-[0.95rem] px-5 py-3 rounded-xl gap-2",
  lg: "text-base px-7 py-4 rounded-xl2 gap-2.5",
};

const base =
  "inline-flex items-center justify-center font-bold transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none select-none";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  fullWidth?: boolean;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  fullWidth,
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(base, variantClasses[variant], sizeClasses[size], fullWidth && "w-full", className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  fullWidth,
  target,
  onClick,
}: CommonProps & { href: string; target?: string; onClick?: () => void }) {
  const isExternal = href.startsWith("http") || href.startsWith("tel") || href.startsWith("mailto");
  const Comp = isExternal ? "a" : Link;
  return (
    <Comp
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      onClick={onClick}
      className={cn(base, variantClasses[variant], sizeClasses[size], fullWidth && "w-full", className)}
    >
      {children}
    </Comp>
  );
}
