import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, LogOut, Package, ShoppingCart, User } from "lucide-react";
import { toast } from "sonner";
import { PageShell, PageTitle } from "@/components/layout/PageShell";
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
    if (!isEmail(form.email)) return toast.error("Please enter a valid email address.");
    if (form.password.length < 6) return toast.error("Password must be at least 6 characters.");
    if (mode === "register" && form.name.trim().length < 2) return toast.error("Please enter your name.");
    const name = mode === "register" ? form.name.trim() : form.email.split("@")[0];
    login({ name, email: form.email.trim() });
    toast.success(mode === "register" ? `Welcome, ${name}!` : "Signed in successfully");
  };

  if (user) {
    const orders = getOrders().filter((o) => o.email.toLowerCase() === user.email.toLowerCase());
    return (
      <PageShell>
        <main className="container-x py-10">
          <PageTitle title={`Hello, ${user.name}`} subtitle={user.email} />
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { to: "/track", icon: Package, label: "Orders", value: orders.length },
              { to: "/wishlist", icon: Heart, label: "Wishlist", value: wishCount },
              { to: "/cart", icon: ShoppingCart, label: "Cart items", value: cartCount },
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

          <h2 className="mt-10 mb-3 text-lg font-bold">Recent orders</h2>
          {orders.length === 0 ? (
            <p className="text-sm text-muted-foreground">No orders yet. <Link to="/shop" className="btn-link ml-1">Start shopping</Link></p>
          ) : (
            <ul className="divide-y divide-border rounded-md border border-border bg-card">
              {orders.slice(0, 5).map((o) => (
                <li key={o.id} className="flex flex-wrap items-center justify-between gap-3 p-4 text-sm">
                  <span className="font-mono font-semibold">{o.id}</span>
                  <span className="text-muted-foreground">{new Date(o.createdAt).toLocaleDateString()}</span>
                  <span className="font-bold text-brand">Ar {o.total.toFixed(2)}</span>
                  <Link to={`/track?order=${o.id}`} className="btn btn-outline btn-sm">Track</Link>
                </li>
              ))}
            </ul>
          )}

          <button type="button" onClick={() => { logout(); toast("Signed out"); }} className="btn btn-outline btn-md mt-10">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </main>
      </PageShell>
    );
  }

  return (
    <PageShell>
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
                {m === "login" ? "Sign in" : "Create account"}
              </button>
            ))}
          </div>
          <form onSubmit={submit} noValidate className="grid gap-3">
            {mode === "register" && (
              <input className="field" placeholder="Full name" autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            )}
            <input className="field" type="email" placeholder="Email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input
              className="field"
              type="password"
              placeholder="Password (6+ characters)"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button type="submit" className="btn btn-primary btn-md btn-block mt-2">
              <User className="h-4 w-4" /> {mode === "login" ? "Sign in" : "Create account"}
            </button>
          </form>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Demo account: your profile is stored only in this browser.
          </p>
        </div>
      </main>
    </PageShell>
  );
};

export default Account;
