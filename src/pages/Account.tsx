import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, LogOut, Package, ShoppingCart, User } from "lucide-react";
import { toast } from "sonner";
import { PageTitle } from "@/components/layout/PageShell";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { getOrders, isEmail } from "@/lib/storage";
import { cn } from "@/lib/utils";

const Account = () => {
  const { user, login, logout } = useAuth();
  const { count: wishCount } = useWishlist();
  const { count: cartCount } = useCart();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmail(form.email)) return toast.error("Veuillez saisir une adresse email valide.");
    if (form.password.length < 6) return toast.error("Le mot de passe doit contenir au moins 6 caractères.");
    if (mode === "register" && form.name.trim().length < 2) return toast.error("Veuillez saisir votre nom.");
    const name = mode === "register" ? form.name.trim() : form.email.split("@")[0];
    login({ name, email: form.email.trim() });
    toast.success(mode === "register" ? `Bienvenue, ${name} !` : "Connexion réussie");
  };

  if (user) {
    const orders = getOrders().filter((o) => o.email.toLowerCase() === user.email.toLowerCase());
    return (
      <>
        <main className="container-x py-10">
          <PageTitle title={`Bonjour, ${user.name}`} subtitle={user.email} />
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { to: "/track", icon: Package, label: "Commandes", value: orders.length },
              { to: "/wishlist", icon: Heart, label: "Favoris", value: wishCount },
              { to: "/cart", icon: ShoppingCart, label: "Articles au panier", value: cartCount },
            ].map((c) => (
              <Link key={c.to} to={c.to} className="group flex items-center gap-4 rounded-md border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:border-brand hover:shadow-lg">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/15 text-brand"><c.icon className="h-5 w-5" /></span>
                <span>
                  <span className="block text-2xl font-extrabold">{c.value}</span>
                  <span className="text-sm text-muted-foreground group-hover:text-brand">{c.label}</span>
                </span>
              </Link>
            ))}
          </div>

          <h2 className="mt-10 mb-3 text-lg font-bold">Commandes récentes</h2>
          {orders.length === 0 ? (
            <p className="text-sm text-muted-foreground">Aucune commande pour l'instant. <Link to="/shop" className="btn-link ml-1">Commencer mes achats</Link></p>
          ) : (
            <ul className="divide-y divide-border rounded-md border border-border bg-card">
              {orders.slice(0, 5).map((o) => (
                <li key={o.id} className="flex flex-wrap items-center justify-between gap-3 p-4 text-sm">
                  <span className="font-mono font-semibold">{o.id}</span>
                  <span className="text-muted-foreground">{new Date(o.createdAt).toLocaleDateString("fr-FR")}</span>
                  <span className="font-bold text-brand">Ar {o.total.toFixed(2)}</span>
                  <Link to={`/track?order=${o.id}`} className="btn btn-outline btn-sm">Suivre</Link>
                </li>
              ))}
            </ul>
          )}

          <button type="button" onClick={() => { logout(); toast("Vous êtes déconnecté"); }} className="btn btn-outline btn-md mt-10">
            <LogOut className="h-4 w-4" /> Se déconnecter
          </button>
        </main>
      </>
    );
  }

  return (
    <>
      <main className="container-x flex justify-center py-12">
        <div className="w-full max-w-md rounded-md border border-border bg-card p-6 shadow-sm">
          <div className="mb-6 grid grid-cols-2 rounded-full bg-secondary p-1">
            {(["login", "register"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                aria-pressed={mode === m}
                className={cn("btn h-9 text-sm", mode === m ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}
              >
                {m === "login" ? "Connexion" : "Créer un compte"}
              </button>
            ))}
          </div>
          <form onSubmit={submit} noValidate className="grid gap-3">
            {mode === "register" && (
              <input className="field" placeholder="Nom complet" autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            )}
            <input className="field" type="email" placeholder="Email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input
              className="field"
              type="password"
              placeholder="Mot de passe (6 caractères min.)"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button type="submit" className="btn btn-primary btn-md btn-block mt-2">
              <User className="h-4 w-4" /> {mode === "login" ? "Se connecter" : "Créer mon compte"}
            </button>
          </form>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Compte de démonstration : votre profil est enregistré uniquement dans ce navigateur.
          </p>
        </div>
      </main>
    </>
  );
};

export default Account;
