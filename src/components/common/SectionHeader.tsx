import { ReactNode } from "react";

export function SectionHeader({
  title,
  tabs,
  active,
  onTabChange,
  right,
}: {
  title: string;
  tabs?: string[];
  active?: string;
  onTabChange?: (t: string) => void;
  right?: ReactNode;
}) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-3 border-b border-border">
      <div className="flex min-w-0 items-end gap-6">
        <span className="section-title">{title}</span>
        {tabs && (
          <div className="-mb-px flex items-center gap-1 overflow-x-auto pb-1" role="tablist">
            {tabs.map((t) => (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={active === t}
                onClick={() => onTabChange?.(t)}
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand md:text-sm ${
                  active === t ? "bg-brand text-brand-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        )}
      </div>
      {right}
    </div>
  );
}
