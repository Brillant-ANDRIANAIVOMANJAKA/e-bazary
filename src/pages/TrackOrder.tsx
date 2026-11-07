import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Check, PackageSearch, Search } from "lucide-react";
import { PageShell, PageTitle } from "@/components/layout/PageShell";
import { findOrder, getOrders, orderStatus } from "@/lib/storage";
import { cn } from "@/lib/utils";

const TrackOrder = () => {
  const [params, setParams] = useSearchParams();
  const current = params.get("order") ?? "";
  const [input, setInput] = useState(current);
  const order = useMemo(() => (current ? findOrder(current) : undefined), [current]);
  const recent = getOrders().slice(0, 5);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) setParams({ order: input.trim().toUpperCase() });
  };

  return (
    <PageShell>
      <main className="container-x max-w-3xl py-10">
        <PageTitle title="Track your order" subtitle="Enter the order number you received after checkout (e.g. EM-AB12CD34)." />

        <form onSubmit={submit} className="flex gap-2">
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Order number" className="field flex-1 font-mono uppercase" aria-label="Order number" />
          <button type="submit" className="btn btn-primary btn-md btn-square"><Search className="h-4 w-4" /> Track</button>
        </form>

        {current && !order && (
          <div className="mt-6 rounded-md border border-dashed border-border bg-card p-8 text-center">
            <PackageSearch className="mx-auto h-10 w-10 text-muted-foreground" />
            <p className="mt-2 font-semibold">No order found for “{current}”.</p>
            <p className="text-sm text-muted-foreground">Orders are stored in this browser only.</p>
          </div>
        )}

        {order && (() => {
          const { steps, index } = orderStatus(order);
          return (
            <div className="mt-6 rounded-md border border-border bg-card p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-mono text-lg font-bold">{order.id}</p>
                <p className="text-sm text-muted-foreground">Placed {new Date(order.createdAt).toLocaleString()}</p>
              </div>
              <ol className="mt-6 grid gap-4 sm:grid-cols-5">
                {steps.map((s, i) => (
                  <li key={s} className="flex items-center gap-3 sm:flex-col sm:text-center">
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold",
                        i <= index ? "border-brand bg-brand text-brand-foreground" : "border-border text-muted-foreground",
                      )}
                    >
                      {i < index ? <Check className="h-4 w-4" /> : i + 1}
                    </span>
                    <span className={cn("text-xs", i === index ? "font-bold text-brand" : i < index ? "font-medium" : "text-muted-foreground")}>{s}</span>
                  </li>
                ))}
              </ol>
              <ul className="mt-6 divide-y divide-border border-t border-border text-sm">
                {order.items.map((it) => (
                  <li key={it.id} className="flex items-center gap-3 py-3">
                    <img src={it.image} alt={it.name} className="h-12 w-12 rounded object-cover" />
                    <Link to={`/product/${it.id}`} className="flex-1 hover:text-brand">{it.name}</Link>
                    <span>×{it.quantity}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-right font-bold">Total: <span className="text-brand">Ar {order.total.toFixed(2)}</span></p>
            </div>
          );
        })()}

        {recent.length > 0 && (
          <div className="mt-10">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-muted-foreground">Your recent orders</h2>
            <div className="flex flex-wrap gap-2">
              {recent.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => { setInput(o.id); setParams({ order: o.id }); }}
                  className={cn("btn btn-sm font-mono normal-case", o.id === current ? "btn-primary" : "btn-outline")}
                >
                  {o.id}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
    </PageShell>
  );
};

export default TrackOrder;
