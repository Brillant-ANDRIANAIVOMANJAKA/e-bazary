import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, ShoppingCart } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Product, categoryLabel } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Rating } from "@/components/common/Rating";
import { QtyControl } from "@/components/common/QtyControl";
import { cn } from "@/lib/utils";

export function QuickView({ product, open, onOpenChange }: { product: Product; open: boolean; onOpenChange: (o: boolean) => void }) {
  const { add } = useCart();
  const wishlist = useWishlist();
  const [qty, setQty] = useState(1);
  const liked = wishlist.has(product.id);

  return (
    <Dialog open={open} onOpenChange={(o) => { onOpenChange(o); if (!o) setQty(1); }}>
      <DialogContent className="max-w-3xl gap-0 overflow-hidden p-0">
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-square bg-muted">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
            {product.discount && <span className="badge-sale">-{product.discount}%</span>}
          </div>
          <div className="flex flex-col p-6">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{categoryLabel(product.category)}</p>
            <DialogTitle className="mt-1 text-2xl font-extrabold leading-tight">{product.name}</DialogTitle>
            <Rating value={product.rating} reviews={product.reviews} className="mt-2" />
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-brand">Ar {product.price.toFixed(2)}</span>
              {product.oldPrice && <span className="price-old">Ar {product.oldPrice.toFixed(2)}</span>}
            </div>
            <DialogDescription className="mt-3 text-sm">{product.description}</DialogDescription>
            <p className="mt-2 text-xs text-muted-foreground">
              Disponibilité : <span className="font-bold text-foreground">{product.stock} en stock</span>
            </p>

            <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
              <QtyControl value={qty} onChange={setQty} max={product.stock} size="sm" />
              <button
                type="button"
                className="btn btn-primary btn-sm flex-1"
                onClick={() => { add(product, qty); onOpenChange(false); setQty(1); }}
              >
                <ShoppingCart className="h-4 w-4" /> Ajouter au panier
              </button>
              <button
                type="button"
                aria-label={liked ? "Retirer des favoris" : "Ajouter aux favoris"}
                aria-pressed={liked}
                onClick={() => wishlist.toggle(product)}
                className={cn("btn-icon h-9 w-9 border border-border", liked ? "border-brand bg-brand/15 text-brand" : "hover:border-brand hover:text-brand")}
              >
                <Heart className={cn("h-4 w-4", liked && "fill-current")} />
              </button>
            </div>
            <Link to={`/product/${product.id}`} onClick={() => onOpenChange(false)} className="btn-link mt-4 self-start">
              Voir la fiche complète <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
