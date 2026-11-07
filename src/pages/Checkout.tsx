import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";

const Checkout = () => {
  const { items, subtotal, clear } = useCart();
  const [done, setDone] = useState(false);
  const navigate = useNavigate();
  const shipping = subtotal > 49 || subtotal === 0 ? 0 : 6.99;
  const total = subtotal + shipping;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Order placed successfully!");
    clear();
    setDone(true);
  };

  if (done) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container-x py-20 text-center">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <CheckCircle2 className="mx-auto h-16 w-16 text-brand" />
            <h1 className="mt-4 text-3xl font-extrabold">Thank you for your order!</h1>
            <p className="mt-2 text-muted-foreground">A confirmation has been sent to your email.</p>
            <button onClick={() => navigate("/")} className="mt-6 rounded-full bg-brand px-6 py-3 text-sm font-bold text-brand-foreground hover:bg-brand-hover transition">
              Back to Shop
            </button>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container-x py-10">
        <h1 className="mb-6 text-3xl font-extrabold">Checkout</h1>
        <form onSubmit={submit} className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6 rounded-md border border-border bg-card p-6">
            <section>
              <h2 className="mb-3 text-lg font-bold">Shipping Information</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <input required placeholder="First name" className="h-11 rounded border border-border bg-background px-3 text-sm" />
                <input required placeholder="Last name" className="h-11 rounded border border-border bg-background px-3 text-sm" />
                <input required type="email" placeholder="Email" className="h-11 rounded border border-border bg-background px-3 text-sm sm:col-span-2" />
                <input required placeholder="Address" className="h-11 rounded border border-border bg-background px-3 text-sm sm:col-span-2" />
                <input required placeholder="City" className="h-11 rounded border border-border bg-background px-3 text-sm" />
                <input required placeholder="ZIP" className="h-11 rounded border border-border bg-background px-3 text-sm" />
              </div>
            </section>
            <section>
              <h2 className="mb-3 text-lg font-bold">Payment</h2>
              <div className="grid gap-3">
                <input required placeholder="Card number" className="h-11 rounded border border-border bg-background px-3 text-sm" />
                <div className="grid grid-cols-2 gap-3">
                  <input required placeholder="MM / YY" className="h-11 rounded border border-border bg-background px-3 text-sm" />
                  <input required placeholder="CVC" className="h-11 rounded border border-border bg-background px-3 text-sm" />
                </div>
              </div>
            </section>
          </div>

          <aside>
            <div className="sticky top-4 rounded-md border border-border bg-card p-6">
              <h2 className="mb-4 text-lg font-bold">Order ({items.length})</h2>
              <ul className="space-y-2 max-h-60 overflow-auto pr-1">
                {items.map((it) => (
                  <li key={it.id} className="flex items-center gap-2 text-xs">
                    <img src={it.image} alt={it.name} className="h-10 w-10 rounded object-cover" />
                    <span className="flex-1 line-clamp-2">{it.name}</span>
                    <span className="font-semibold">×{it.quantity}</span>
                  </li>
                ))}
              </ul>
              <dl className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
                <div className="flex justify-between"><dt>Subtotal</dt><dd>Ar{subtotal.toFixed(2)}</dd></div>
                <div className="flex justify-between"><dt>Shipping</dt><dd>{shipping === 0 ? "FREE" : `Ar ${shipping.toFixed(2)}`}</dd></div>
                <div className="flex justify-between text-base font-bold pt-2 border-t border-border">
                  <dt>Total</dt><dd className="text-brand">Ar{total.toFixed(2)}</dd>
                </div>
              </dl>
              <button
                type="submit"
                disabled={items.length === 0}
                className="mt-6 w-full rounded bg-brand py-3 text-sm font-bold text-brand-foreground hover:bg-brand-hover transition disabled:opacity-50"
              >
                Place Order
              </button>
            </div>
          </aside>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
