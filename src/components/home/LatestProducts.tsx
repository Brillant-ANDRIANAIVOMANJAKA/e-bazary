import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";

// Les 4 derniers produits ajoutes au catalogue.
const latest = products.slice(-4).reverse();

export function LatestProducts() {
  const { add } = useCart();
  return (
    <div className="mt-4 rounded-md border border-border bg-card overflow-hidden">
      <div className="bg-primary px-4 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground">
        Latest Products
      </div>
      <ul>
        {latest.map((p) => (
          <li key={p.id} className="group flex items-center gap-3 border-b border-border p-3 last:border-0 hover:bg-secondary transition-colors">
            <Link to={`/product/${p.id}`} className="flex min-w-0 flex-1 items-center gap-3">
              <img src={p.image} alt={p.name} loading="lazy" className="h-14 w-14 shrink-0 rounded object-cover bg-muted" />
              <div className="min-w-0">
                <p className="line-clamp-2 text-xs leading-snug group-hover:text-brand">{p.name}</p>
                <p className="mt-0.5">
                  {p.oldPrice && <span className="mr-1 text-[10px] text-muted-foreground line-through">Ar {p.oldPrice.toFixed(2)}</span>}
                  <span className="text-xs font-bold text-brand">Ar {p.price.toFixed(2)}</span>
                </p>
              </div>
            </Link>
            <button
              type="button"
              aria-label={`Add ${p.name} to cart`}
              onClick={() => add(p)}
              className="btn-icon h-8 w-8 bg-background text-muted-foreground hover:bg-brand hover:text-brand-foreground"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
