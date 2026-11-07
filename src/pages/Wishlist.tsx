import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Heart, ShoppingCart, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { PageTitle } from "@/components/layout/PageShell";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

const Wishlist = () => {
  const { items, remove, clear } = useWishlist();
  const { add } = useCart();

  const moveAllToCart = () => {
    items.forEach((p) => add(p));
    clear();
    toast.success("Tous les favoris ont été ajoutés au panier");
  };

  return (
    <>
      <main className="container-x py-10">
        <PageTitle title="Mes favoris" subtitle={`${items.length} ${items.length === 1 ? "article enregistré" : "articles enregistrés"}`} />

        {items.length === 0 ? (
          <div className="rounded-md border border-border bg-card py-16 text-center">
            <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-3 text-muted-foreground">Vous n'avez aucun favori. Touchez le cœur d'un produit pour l'enregistrer.</p>
            <Link to="/shop" className="btn btn-primary btn-md mt-6">
              Voir les produits <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-4 flex flex-wrap justify-end gap-2">
              <button type="button" onClick={clear} className="btn btn-ghost btn-sm">
                <Trash2 className="h-4 w-4" /> Tout retirer
              </button>
              <button type="button" onClick={moveAllToCart} className="btn btn-primary btn-sm">
                <ShoppingCart className="h-4 w-4" /> Tout ajouter au panier
              </button>
            </div>
            <ul className="divide-y divide-border overflow-hidden rounded-md border border-border bg-card">
              <AnimatePresence initial={false}>
                {items.map((p) => (
                  <motion.li
                    key={p.id}
                    layout
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-wrap items-center gap-4 p-4"
                  >
                    <Link to={`/product/${p.id}`} className="flex min-w-0 flex-1 items-center gap-3">
                      <img src={p.image} alt={p.name} className="h-20 w-20 shrink-0 rounded object-cover bg-muted" />
                      <div className="min-w-0">
                        <p className="line-clamp-2 font-semibold hover:text-brand">{p.name}</p>
                        <p className="mt-1 text-sm">
                          <span className="font-bold text-brand">Ar {p.price.toFixed(2)}</span>
                          {p.oldPrice && <span className="price-old ml-2">Ar {p.oldPrice.toFixed(2)}</span>}
                        </p>
                        <p className="text-xs text-muted-foreground">{p.stock > 0 ? `${p.stock} en stock` : "Rupture de stock"}</p>
                      </div>
                    </Link>
                    <div className="flex items-center gap-2">
                      <button type="button" onClick={() => { add(p); remove(p.id); }} className="btn btn-primary btn-sm">
                        <ShoppingCart className="h-4 w-4" /> Ajouter au panier
                      </button>
                      <button
                        type="button"
                        aria-label={`Retirer ${p.name}`}
                        onClick={() => { remove(p.id); toast("Retiré des favoris"); }}
                        className="btn-icon h-9 w-9 text-muted-foreground hover:bg-secondary hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </>
        )}
      </main>
    </>
  );
};

export default Wishlist;
