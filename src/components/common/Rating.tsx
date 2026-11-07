import { cn } from "@/lib/utils";

/** Note produit affichee sous forme de badge chiffre (pas d'icone etoile). */
export function Rating({
  value,
  reviews,
  size = "sm",
  className,
}: {
  value: number;
  reviews?: number;
  size?: "sm" | "md";
  className?: string;
}) {
  const pct = Math.max(0, Math.min(100, (value / 5) * 100));
  return (
    <div className={cn("flex items-center gap-2", className)} aria-label={`Noté ${value.toFixed(1)} sur 5`}>
      <span
        className={cn(
          "inline-flex items-center rounded bg-brand/15 font-bold text-foreground",
          size === "sm" ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-1 text-sm",
        )}
      >
        {value.toFixed(1)}
        <span className="ml-0.5 font-medium text-muted-foreground">/5</span>
      </span>
      <span
        className={cn("relative overflow-hidden rounded-full bg-secondary", size === "sm" ? "h-1 w-10" : "h-1.5 w-16")}
        aria-hidden
      >
        <span className="absolute inset-y-0 left-0 rounded-full bg-brand" style={{ width: `${pct}%` }} />
      </span>
      {reviews !== undefined && (
        <span className={cn("text-muted-foreground", size === "sm" ? "text-[10px]" : "text-sm")}>
          {reviews} avis
        </span>
      )}
    </div>
  );
}
