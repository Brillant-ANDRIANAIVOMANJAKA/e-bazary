import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";

const Cart = () => {
  const { items, update, remove, subtotal, clear } = useCart();
  const shipping = subtotal > 49 || subtotal === 0 ? 0 : 6.99;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container-x py-10">
        <h1 className="mb-6 text-3xl font-extrabold">Shopping Cart</h1>

        {items.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-md border border-border bg-card py-16 text-center">
            <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-3 text-muted-foreground">Your cart is empty.</p>
            <Link to="/" className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-brand-foreground hover:bg-brand-hover transition">
              Continue Shopping <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="rounded-md border border-border bg-card overflow-hidden">
              <div className="hidden md:grid grid-cols-[1fr_120px_120px_120px_40px] gap-4 border-b border-border bg-secondary px-4 py-3 text-xs font-bold uppercase">
                <span>Product</span><span>Price</span><span>Qty</span><span>Subtotal</span><span></span>
              </div>
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="grid grid-cols-[1fr_40px] md:grid-cols-[1fr_120px_120px_120px_40px] items-center gap-4 border-b border-border p-4 last:border-0"
                  >
                    <Link to={`/product/${item.id}`} className="flex items-center gap-3 min-w-0">
                      <img src={item.image} alt={item.name} className="h-16 w-16 rounded object-cover bg-muted shrink-0" />
                      <div className="min-w-0">
                        <p className="line-clamp-2 text-sm font-semibold">{item.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">{item.category}</p>
                      </div>
                    </Link>
                    <span className="hidden md:block text-sm font-semibold">Ar{item.price.toFixed(2)}</span>
                    <div className="hidden md:flex h-9 items-center rounded border border-border w-fit">
                      <button onClick={() => update(item.id, item.quantity - 1)} className="px-2 hover:bg-secondary"><Minus className="h-3 w-3" /></button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button onClick={() => update(item.id, item.quantity + 1)} className="px-2 hover:bg-secondary"><Plus className="h-3 w-3" /></button>
                    </div>
                    <span className="hidden md:block text-sm font-bold text-brand">Ar{(item.price * item.quantity).toFixed(2)}</span>
                    <button onClick={() => remove(item.id)} aria-label="Remove" className="text-muted-foreground hover:text-brand">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div className="flex items-center justify-between p-4">
                <Link to="/" className="text-sm font-semibold hover:text-brand">← Continue shopping</Link>
                <button onClick={clear} className="text-sm text-muted-foreground hover:text-brand">Clear cart</button>
              </div>
            </div>

            <aside>
              <div className="sticky top-4 rounded-md border border-border bg-card p-6">
                <h2 className="mb-4 text-lg font-bold">Order Summary</h2>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between"><dt>Subtotal</dt><dd className="font-semibold">Ar{subtotal.toFixed(2)}</dd></div>
                  <div className="flex justify-between"><dt>Shipping</dt><dd className="font-semibold">{shipping === 0 ? "FREE" : `Ar ${shipping.toFixed(2)}`}</dd></div>
                  <div className="border-t border-border pt-2 flex justify-between text-base font-bold">
                    <dt>Total</dt><dd className="text-brand">Ar{total.toFixed(2)}</dd>
                  </div>
                </dl>
                <Link to="/checkout" className="mt-6 flex items-center justify-center gap-2 rounded bg-brand py-3 text-sm font-bold text-brand-foreground hover:bg-brand-hover transition">
                  Checkout <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
