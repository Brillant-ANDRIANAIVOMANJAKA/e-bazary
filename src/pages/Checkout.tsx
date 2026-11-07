import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Copy, Loader2, Lock, Tag, Truck, X } from "lucide-react";
import { toast } from "sonner";
import { PageTitle } from "@/components/layout/PageShell";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { couponRate, newOrderId, saveOrder } from "@/lib/storage";

const digits = (v: string) => v.replace(/\D/g, "");

const Checkout = () => {
  const { items, subtotal, clear } = useCart();
  const { user } = useAuth();
  const [orderId, setOrderId] = useState<string | null>(null);
  const [placing, setPlacing] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState<string | null>(null);
  const [form, setForm] = useState({
    first: user?.name.split(" ")[0] ?? "",
    last: user?.name.split(" ").slice(1).join(" ") ?? "",
    email: user?.email ?? "",
    address: "",
    city: "",
    zip: "",
    card: "",
    exp: "",
    cvc: "",
  });

  const discount = coupon ? subtotal * couponRate(coupon) : 0;
  const shipping = subtotal > 49 || subtotal === 0 ? 0 : 6.99;
  const total = subtotal - discount + shipping;

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value;
    if (k === "card") v = digits(v).slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
    if (k === "exp") v = digits(v).slice(0, 4).replace(/^(\d{2})(\d)/, "$1 / $2");
    if (k === "cvc") v = digits(v).slice(0, 4);
    setForm((f) => ({ ...f, [k]: v }));
  };

  const applyCoupon = () => {
    if (couponRate(couponInput) > 0) {
      setCoupon(couponInput.trim().toUpperCase());
      toast.success(`Code appliqué : -${couponRate(couponInput) * 100} %`);
    } else {
      toast.error("Ce code promo n'est pas valide.");
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (digits(form.card).length < 12) return toast.error("Veuillez saisir un numéro de carte valide.");
    if (digits(form.exp).length !== 4) return toast.error("Veuillez saisir la date d'expiration au format MM / AA.");
    if (form.cvc.length < 3) return toast.error("Veuillez saisir un CVC valide.");
    setPlacing(true);
    window.setTimeout(() => {
      const id = newOrderId();
      saveOrder({
        id,
        createdAt: new Date().toISOString(),
        email: form.email.trim(),
        name: `${form.first} ${form.last}`.trim(),
        address: `${form.address}, ${form.zip} ${form.city}`,
        items: items.map(({ id, name, image, price, quantity }) => ({ id, name, image, price, quantity })),
        subtotal,
        discount,
        shipping,
        total,
      });
      clear();
      setPlacing(false);
      setOrderId(id);
      toast.success("Commande validée !");
    }, 900);
  };

  if (orderId) {
    return (
      <>
        <main className="container-x py-20 text-center">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <CheckCircle2 className="mx-auto h-16 w-16 text-brand" />
            <h1 className="mt-4 text-3xl font-extrabold">Merci pour votre commande !</h1>
            <p className="mt-2 text-muted-foreground">Votre numéro de commande :</p>
            <button
              type="button"
              onClick={() => { navigator.clipboard?.writeText(orderId); toast.success("Numéro de commande copié"); }}
              className="btn btn-outline btn-md mt-2 font-mono text-lg"
            >
              {orderId} <Copy className="h-4 w-4" />
            </button>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to={`/track?order=${orderId}`} className="btn btn-primary btn-md"><Truck className="h-4 w-4" /> Suivre ma commande</Link>
              <Link to="/shop" className="btn btn-outline btn-md">Continuer mes achats</Link>
            </div>
          </motion.div>
        </main>
      </>
    );
  }

  return (
    <>
      <main className="container-x py-10">
        <PageTitle title="Paiement" />
        {items.length === 0 ? (
          <div className="rounded-md border border-border bg-card py-16 text-center">
            <p className="text-muted-foreground">Votre panier est vide — ajoutez des produits avant de passer commande.</p>
            <Link to="/shop" className="btn btn-primary btn-md mt-6">Voir les produits</Link>
          </div>
        ) : (
          <form onSubmit={submit} className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="space-y-6 rounded-md border border-border bg-card p-6">
              <section>
                <h2 className="mb-3 text-lg font-bold">Adresse de livraison</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input required autoComplete="given-name" placeholder="Prénom" className="field" value={form.first} onChange={set("first")} />
                  <input required autoComplete="family-name" placeholder="Nom" className="field" value={form.last} onChange={set("last")} />
                  <input required type="email" autoComplete="email" placeholder="Email" className="field sm:col-span-2" value={form.email} onChange={set("email")} />
                  <input required autoComplete="street-address" placeholder="Adresse" className="field sm:col-span-2" value={form.address} onChange={set("address")} />
                  <input required autoComplete="address-level2" placeholder="Ville" className="field" value={form.city} onChange={set("city")} />
                  <input required autoComplete="postal-code" placeholder="Code postal" className="field" value={form.zip} onChange={set("zip")} />
                </div>
              </section>
              <section>
                <h2 className="mb-3 flex items-center gap-2 text-lg font-bold">Paiement <Lock className="h-4 w-4 text-muted-foreground" /></h2>
                <div className="grid gap-3">
                  <input required inputMode="numeric" autoComplete="cc-number" placeholder="Numéro de carte" className="field font-mono" value={form.card} onChange={set("card")} />
                  <div className="grid grid-cols-2 gap-3">
                    <input required inputMode="numeric" autoComplete="cc-exp" placeholder="MM / AA" className="field font-mono" value={form.exp} onChange={set("exp")} />
                    <input required inputMode="numeric" autoComplete="cc-csc" placeholder="CVC" className="field font-mono" value={form.cvc} onChange={set("cvc")} />
                  </div>
                  <p className="text-xs text-muted-foreground">Boutique de démonstration : aucun paiement n'est débité et les données de carte ne sont jamais enregistrées.</p>
                </div>
              </section>
            </div>

            <aside>
              <div className="sticky top-[calc(var(--header-h,0px)+1rem)] rounded-md border border-border bg-card p-6">
                <h2 className="mb-4 text-lg font-bold">Commande ({items.length})</h2>
                <ul className="space-y-2 max-h-60 overflow-auto pr-1">
                  {items.map((it) => (
                    <li key={it.id} className="flex items-center gap-2 text-xs">
                      <img src={it.image} alt={it.name} className="h-10 w-10 rounded object-cover" />
                      <span className="flex-1 line-clamp-2">{it.name}</span>
                      <span className="font-semibold">×{it.quantity}</span>
                    </li>
                  ))}
                </ul>

                {/* Coupon */}
                <div className="mt-4 border-t border-border pt-4">
                  {coupon ? (
                    <div className="flex items-center justify-between rounded-md bg-brand/15 px-3 py-2 text-sm">
                      <span className="flex items-center gap-2 font-semibold"><Tag className="h-4 w-4 text-brand" /> {coupon}</span>
                      <button type="button" aria-label="Retirer le code" onClick={() => setCoupon(null)} className="btn-icon h-7 w-7 hover:bg-background">
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); applyCoupon(); } }}
                        placeholder="Code promo"
                        aria-label="Code promo"
                        className="field h-10 uppercase"
                      />
                      <button type="button" onClick={applyCoupon} disabled={!couponInput.trim()} className="btn btn-dark h-10 px-4 text-xs uppercase">
                        Appliquer
                      </button>
                    </div>
                  )}
                </div>

                <dl className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
                  <div className="flex justify-between"><dt>Sous-total</dt><dd>Ar {subtotal.toFixed(2)}</dd></div>
                  {discount > 0 && <div className="flex justify-between text-brand"><dt>Remise</dt><dd>- Ar {discount.toFixed(2)}</dd></div>}
                  <div className="flex justify-between"><dt>Livraison</dt><dd>{shipping === 0 ? "OFFERTE" : `Ar ${shipping.toFixed(2)}`}</dd></div>
                  <div className="flex justify-between text-base font-bold pt-2 border-t border-border">
                    <dt>Total</dt><dd className="text-brand">Ar {total.toFixed(2)}</dd>
                  </div>
                </dl>
                <button type="submit" disabled={placing} className="btn btn-primary btn-lg btn-block btn-square mt-6">
                  {placing ? <><Loader2 className="h-4 w-4 animate-spin" /> Validation...</> : <><Lock className="h-4 w-4" /> Valider la commande</>}
                </button>
              </div>
            </aside>
          </form>
        )}
      </main>
    </>
  );
};

export default Checkout;
