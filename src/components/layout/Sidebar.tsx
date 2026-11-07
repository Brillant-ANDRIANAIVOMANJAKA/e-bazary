import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, LayoutGrid } from "lucide-react";
import { motion } from "framer-motion";
import { categories, shopUrl } from "@/data/products";
import { cn } from "@/lib/utils";

interface Props {
  /** Categorie active : null = boutique sans filtre, undefined = hors boutique. */
  active?: string | null;
  /** Garde la recherche en cours quand on change de categorie. */
  query?: string;
  showPromo?: boolean;
}

export function Sidebar({ active, query, showPromo = true }: Props) {
  const item = (isActive: boolean) =>
    cn(
      "group flex w-full items-center justify-between border-b border-border px-4 py-2.5 text-sm transition-colors last:border-0",
      isActive ? "bg-accent font-semibold text-brand" : "hover:bg-secondary hover:pl-5",
    );

  return (
    <aside className="w-full">
      <div className="rounded-md border border-border overflow-hidden bg-card">
        <div className="bg-primary text-primary-foreground px-4 py-3 text-sm font-bold uppercase tracking-wider">
          Toutes les catégories
        </div>
        <ul>
          <li>
            <Link to={shopUrl(undefined, query)} className={item(active === null)}>
              <span className="flex items-center gap-2">
                <LayoutGrid className="h-4 w-4 shrink-0 text-brand" /> Tous les produits
              </span>
              <ChevronRight className="h-3.5 w-3.5 opacity-50 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </li>
          {categories.map((c, i) => (
            <motion.li key={c.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}>
              <Link to={shopUrl(c.id, query)} aria-current={active === c.id ? "page" : undefined} className={item(active === c.id)}>
                <span className="flex items-center gap-2">
                  <c.icon className="h-4 w-4 shrink-0 text-brand" />
                  {c.label}
                </span>
                <ChevronRight className="h-3.5 w-3.5 opacity-50 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>

      {showPromo && (
        <div className="mt-4 rounded-md border border-border overflow-hidden bg-gradient-to-br from-primary to-header-top text-primary-foreground p-5">
          <p className="text-xs uppercase tracking-widest opacity-70">Décoration intérieure</p>
          <p className="mt-1 text-2xl font-extrabold text-brand">Ar 4900.89</p>
          <p className="mt-1 text-xs opacity-80">Collection maison premium</p>
          <Link to={shopUrl("furniture")} className="btn-link mt-3">
            Acheter <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      )}
    </aside>
  );
}
