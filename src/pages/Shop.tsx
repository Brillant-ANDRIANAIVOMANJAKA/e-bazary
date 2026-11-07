import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ChevronRight, PackageSearch, X } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Sidebar } from "@/components/layout/Sidebar";
import { ProductGrid } from "@/components/product/ProductGrid";
import { categories, categoryLabel, products, shopUrl } from "@/data/products";
import { cn } from "@/lib/utils";

const SORTS = [
  { id: "popular", label: "Most popular" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "rating", label: "Best rated" },
  { id: "discount", label: "Biggest discount" },
] as const;

const Shop = () => {
  const [params, setParams] = useSearchParams();
  const category = params.get("category");
  const q = params.get("q") ?? "";
  const sort = params.get("sort") ?? "popular";
  const label = categoryLabel(category);

  const results = useMemo(() => {
    let res = products.filter((p) => !category || p.category === category);
    const term = q.trim().toLowerCase();
    if (term) {
      res = res.filter((p) =>
        [p.name, p.description, p.category, categoryLabel(p.category) ?? ""].some((s) => s.toLowerCase().includes(term)),
      );
    }
    const sorted = [...res];
    switch (sort) {
      case "price-asc": sorted.sort((a, b) => a.price - b.price); break;
      case "price-desc": sorted.sort((a, b) => b.price - a.price); break;
      case "rating": sorted.sort((a, b) => b.rating - a.rating); break;
      case "discount": sorted.sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0)); break;
      default: sorted.sort((a, b) => b.sold - a.sold);
    }
    return sorted;
  }, [category, q, sort]);

  const setParam = (key: string, value?: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next);
  };

  return (
    <PageShell>
      <main className="container-x py-6">
        <nav className="mb-4 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-brand">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/shop" className="hover:text-brand">Shop</Link>
          {label && (<><ChevronRight className="h-3 w-3" /><span className="text-foreground">{label}</span></>)}
        </nav>

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <div className="hidden lg:block lg:sticky lg:top-4 lg:self-start">
            <Sidebar active={category} query={q || undefined} showPromo={false} />
          </div>

          <div className="min-w-0">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h1 className="text-2xl font-extrabold md:text-3xl">{label ?? "All products"}</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  {results.length} {results.length === 1 ? "product" : "products"}
                  {q && <> for “<span className="font-semibold text-foreground">{q}</span>”</>}
                </p>
              </div>
              <label className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Sort by</span>
                <select
                  value={sort}
                  onChange={(e) => setParam("sort", e.target.value === "popular" ? undefined : e.target.value)}
                  className="field h-10 w-auto cursor-pointer"
                >
                  {SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                </select>
              </label>
            </div>

            {/* Filtres rapides (mobile) */}
            <div className="mb-5 flex gap-2 overflow-x-auto pb-1 lg:hidden">
              <Link to={shopUrl(undefined, q || undefined)} className={cn("btn btn-sm shrink-0", !category ? "btn-primary" : "btn-outline")}>All</Link>
              {categories.map((c) => (
                <Link key={c.id} to={shopUrl(c.id, q || undefined)} className={cn("btn btn-sm shrink-0", category === c.id ? "btn-primary" : "btn-outline")}>
                  <c.icon className="h-3.5 w-3.5" /> {c.label}
                </Link>
              ))}
            </div>

            {(category || q) && (
              <div className="mb-5 flex flex-wrap items-center gap-2">
                {label && (
                  <button type="button" onClick={() => setParam("category")} className="btn btn-outline h-8 px-3 text-xs">
                    {label} <X className="h-3 w-3" />
                  </button>
                )}
                {q && (
                  <button type="button" onClick={() => setParam("q")} className="btn btn-outline h-8 px-3 text-xs">
                    “{q}” <X className="h-3 w-3" />
                  </button>
                )}
                <Link to="/shop" className="btn btn-ghost h-8 px-3 text-xs">Clear all</Link>
              </div>
            )}

            {results.length === 0 ? (
              <div className="rounded-md border border-dashed border-border bg-card py-16 text-center">
                <PackageSearch className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-3 font-semibold">No products found</p>
                <p className="mt-1 text-sm text-muted-foreground">Try another keyword or category.</p>
                <Link to="/shop" className="btn btn-primary btn-md mt-6">See all products</Link>
              </div>
            ) : (
              <ProductGrid products={results} columns={4} />
            )}
          </div>
        </div>
      </main>
    </PageShell>
  );
};

export default Shop;
