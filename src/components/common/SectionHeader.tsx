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
      <div className="flex items-end gap-6">
        <span className="section-title">{title}</span>
        {tabs && (
          <div className="hidden items-center gap-4 pb-2 md:flex">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => onTabChange?.(t)}
                className={`text-sm font-medium uppercase tracking-wide transition-colors ${
                  active === t ? "text-brand" : "text-muted-foreground hover:text-foreground"
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
