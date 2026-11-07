import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ArrowLeft, ArrowRight, ShoppingBag } from "lucide-react";
import { PageTitle } from "@/components/layout/PageShell";
import { QtyControl } from "@/components/common/QtyControl";
import { useCart } from "@/context/CartContext";
import { categoryLabel } from "@/data/products";

const Cart = () => {
  const { items, update, remove, subtotal, clear } = useCart();
  const shipping = subtotal > 49 || subtotal === 0 ? 0 : 6.99;
  const total = subtotal + shipping;

  return (
    <>
      <main className="container-x py-10">
        <PageTitle title="Mon panier" />

        {items.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-md border border-border bg-card py-16 text-center">
            <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-3 text-muted-foreground">Votre panier est vide.</p>
            <Link to="/shop" className="btn btn-primary btn-md mt-6">
              Continuer mes achats <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="rounded-md border border-border bg-card overflow-hidden">
              <div className="hidden md:grid grid-cols-[1fr_120px_130px_120px_40px] gap-4 border-b border-border bg-secondary px-4 py-3 text-xs font-bold uppercase">
                <span>Produit</span><span>Prix</span><span>Qté</span><span>Sous-total</span><span></span>
              </div>
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="grid grid-cols-[1fr_auto] md:grid-cols-[1fr_120px_130px_120px_40px] items-center gap-x-4 gap-y-3 border-b border-border p-4 last:border-0"
                  >
                    <Link to={`/product/${item.id}`} className="flex items-center gap-3 min-w-0">
                      <img src={item.image} alt={item.name} className="h-16 w-16 rounded object-cover bg-muted shrink-0" />
                      <div className="min-w-0">
                        <p className="line-clamp-2 text-sm font-semibold hover:text-brand">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{categoryLabel(item.category)}</p>
                        <p className="text-xs font-semibold md:hidden">Ar {item.price.toFixed(2)}</p>
                      </div>
                    </Link>
                    <span className="hidden md:block text-sm font-semibold">Ar {item.price.toFixed(2)}</span>
                    <QtyControl
                      value={item.quantity}
                      onChange={(n) => update(item.id, n)}
                      max={item.stock}
                      size="sm"
                      className="col-start-1 row-start-2 w-fit md:col-start-auto md:row-start-auto"
                    />
                    <span className="col-start-2 row-start-2 text-right text-sm font-bold text-brand md:col-start-auto md:row-start-auto md:text-left">
                      Ar {(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      type="button"
                      onClick={() => remove(item.id)}
                      aria-label={`Retirer ${item.name}`}
                      className="btn-icon col-start-2 row-start-1 h-9 w-9 justify-self-end text-muted-foreground hover:bg-secondary hover:text-destructive md:col-start-auto md:row-start-auto"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div className="flex items-center justify-between gap-2 p-4">
                <Link to="/shop" className="btn btn-ghost btn-sm normal-case"><ArrowLeft className="h-4 w-4" /> Continuer mes achats</Link>
                <button type="button" onClick={clear} className="btn btn-ghost btn-sm normal-case hover:text-destructive">
                  <Trash2 className="h-4 w-4" /> Vider le panier
                </button>
              </div>
            </div>

            <aside>
              <div className="sticky top-[calc(var(--header-h,0px)+1rem)] rounded-md border border-border bg-card p-6">
                <h2 className="mb-4 text-lg font-bold">Récapitulatif</h2>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between"><dt>Sous-total</dt><dd className="font-semibold">Ar {subtotal.toFixed(2)}</dd></div>
                  <div className="flex justify-between"><dt>Livraison</dt><dd className="font-semibold">{shipping === 0 ? "OFFERTE" : `Ar ${shipping.toFixed(2)}`}</dd></div>
                  <div className="border-t border-border pt-2 flex justify-between text-base font-bold">
                    <dt>Total</dt><dd className="text-brand">Ar {total.toFixed(2)}</dd>
                  </div>
                </dl>
                <p className="mt-3 text-xs text-muted-foreground">Un code promo ? Vous pourrez l'appliquer à l'étape suivante.</p>
                <Link to="/checkout" className="btn btn-primary btn-lg btn-block btn-square mt-4">
                  Passer commande <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </aside>
          </div>
        )}
      </main>
    </>
  );
};

export default Cart;
