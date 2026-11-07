import { categories } from "@/data/products";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  active?: string;
  onSelect?: (id: string | undefined) => void;
}

export function Sidebar({ active, onSelect }: Props) {
  return (
    <aside className="w-full">
      <div className="rounded-md border border-border overflow-hidden bg-card">
        <div className="bg-primary text-primary-foreground px-4 py-3 text-sm font-bold uppercase tracking-wider">
          All Categories
        </div>
        <ul>
          <li>
            <button
              onClick={() => onSelect?.(undefined)}
              className={`flex w-full items-center justify-between px-4 py-2.5 text-sm border-b border-border transition-colors ${
                !active ? "bg-accent text-brand font-semibold" : "hover:bg-secondary"
              }`}
            >
              <span>All Products</span>
              <ChevronRight className="h-3.5 w-3.5 opacity-50" />
            </button>
          </li>
          {categories.map((c, i) => (
            <motion.li
              key={c.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <button
                onClick={() => onSelect?.(c.id)}
                className={`flex w-full items-center justify-between px-4 py-2.5 text-sm border-b border-border last:border-0 transition-colors ${
                  active === c.id ? "bg-accent text-brand font-semibold" : "hover:bg-secondary"
                }`}
              >
                <span className="flex items-center gap-2">
                  <c.icon className="h-4 w-4 shrink-0 text-brand" />
                  {c.label}
                </span>
                <ChevronRight className="h-3.5 w-3.5 opacity-50" />
              </button>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Promo card */}
      <div className="mt-4 rounded-md border border-border overflow-hidden bg-gradient-to-br from-primary to-header-top text-primary-foreground p-5">
        <p className="text-xs uppercase tracking-widest opacity-70">Interior Design</p>
        <p className="mt-1 text-2xl font-extrabold text-brand">Ar4900.89</p>
        <p className="mt-1 text-xs opacity-80">Premium home collection</p>
        <button className="mt-3 text-xs font-bold uppercase border-b border-brand text-brand">Shop now →</button>
      </div>
    </aside>
  );
}
