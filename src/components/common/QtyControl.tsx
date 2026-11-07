import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function QtyControl({
  value,
  onChange,
  max = 99,
  size = "md",
  className,
}: {
  value: number;
  onChange: (n: number) => void;
  max?: number;
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center overflow-hidden rounded-full border border-border bg-card",
        size === "sm" ? "h-9" : "h-12",
        className,
      )}
    >
      <button type="button" aria-label="Decrease quantity" className="qty-btn" disabled={value <= 1} onClick={() => onChange(value - 1)}>
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className={cn("text-center font-semibold tabular-nums", size === "sm" ? "w-7 text-sm" : "w-10")} aria-live="polite">
        {value}
      </span>
      <button type="button" aria-label="Increase quantity" className="qty-btn" disabled={value >= max} onClick={() => onChange(value + 1)}>
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
