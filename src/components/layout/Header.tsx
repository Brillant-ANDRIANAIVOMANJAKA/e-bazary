import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, ShoppingCart, Heart, User, Phone, Truck, Menu, Sun, Moon, ChevronDown, LogOut } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { categories, shopUrl, Category } from "@/data/products";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetClose, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/#deals", label: "Deals" },
  { to: "/#trending", label: "Best-selling" },
  { to: "/#blog", label: "Blog" },
  { to: "/page/contact", label: "Contact" },
];

function Badge({ value, className }: { value: number; className?: string }) {
  if (value <= 0) return null;
  return (
    <motion.span
      key={value}
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      className={cn(
        "absolute flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold text-brand-foreground",
        className,
      )}
    >
      {value > 99 ? "99+" : value}
    </motion.span>
  );
}

export function Header() {
  const { count, subtotal } = useCart();
  const { count: wishCount } = useWishlist();
  const { user, logout } = useAuth();
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [cat, setCat] = useState(params.get("category") ?? "");
  const [menuOpen, setMenuOpen] = useState(false);

  // Garde le champ de recherche synchronise avec l'URL.
  useEffect(() => {
    setQ(params.get("q") ?? "");
    setCat(params.get("category") ?? "");
  }, [params]);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(shopUrl((cat || undefined) as Category | undefined, q.trim() || undefined));
  };

  const isActive = (to: string) =>
    to.includes("#") ? location.pathname === "/" && location.hash === to.slice(1) : location.pathname === to && !location.hash;

  return (
    <header className="w-full">
      {/* Top promo bar */}
      <div className="bg-header-top text-white/80 text-xs">
        <div className="container-x flex h-9 items-center justify-between">
          <p className="hidden md:block">
            Welcome to <span className="font-semibold text-white">eMarket</span> · Free shipping over Ar4900 — Code:{" "}
            <span className="font-semibold text-brand">Brillant2026</span>
          </p>
          <div className="ml-auto flex items-center gap-1">
            <button
              type="button"
              onClick={toggle}
              aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
              className="btn-icon h-7 w-7 hover:bg-white/10 hover:text-white"
            >
              {theme === "light" ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="bg-header-bar text-white">
        <div className="container-x flex h-14 items-center gap-3 md:h-16 md:gap-4 lg:gap-6">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="btn-icon -ml-2 lg:hidden hover:bg-white/10"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="h-9 w-9 rounded-full overflow-hidden">
              <img src="/e-market.png" alt="e-market logo" className="h-full w-full object-cover" />
            </div>
            <div className="leading-tight">
              <p className="font-extrabold text-lg tracking-tight">e-market</p>
              <p className="text-[9px] uppercase tracking-widest opacity-60">all in one store</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center">
            {NAV_LINKS.map((l) => (
              <Link key={l.to} to={l.to} className={cn("nav-link", isActive(l.to) && "text-brand")}>
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3 text-xs">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="hidden md:flex items-center gap-1.5 rounded px-2 py-1 hover:text-brand transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
                  <User className="h-4 w-4" /> Hi, {user.name.split(" ")[0]} <ChevronDown className="h-3 w-3" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onSelect={() => navigate("/account")}>My account</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => navigate("/track")}>My orders</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => navigate("/wishlist")}>Wishlist</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={logout}>
                    <LogOut className="mr-2 h-4 w-4" /> Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/account" className="hidden md:flex items-center gap-1.5 hover:text-brand transition">
                <User className="h-4 w-4" /> Login / Register
              </Link>
            )}
            <span className="hidden md:inline opacity-30">|</span>
            <Link to="/track" className="hidden md:flex items-center gap-1.5 hover:text-brand transition">
              <Truck className="h-4 w-4" /> Track Order
            </Link>
            <Link to="/cart" aria-label={`Cart (${count})`} className="btn-icon relative -mr-2 hover:bg-white/10 md:hidden">
              <ShoppingCart className="h-5 w-5" />
              <Badge value={count} className="-top-0.5 -right-0.5" />
            </Link>
            <span className="hidden xl:inline opacity-30">|</span>
            <a href="tel:+261346610839" className="hidden xl:flex items-center gap-1.5 opacity-80 hover:text-brand hover:opacity-100 transition">
              <Phone className="h-4 w-4" /> +261 34 66 108 39
            </a>
          </div>
        </div>

        {/* Search row */}
        <div className="container-x flex items-center gap-3 pb-3 md:pb-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="btn btn-primary btn-square hidden h-11 px-4 text-sm md:inline-flex">
              <Menu className="h-4 w-4" /> All Departments <ChevronDown className="h-3.5 w-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-60">
              <DropdownMenuItem onSelect={() => navigate("/shop")} className="font-semibold">
                All products
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {categories.map((c) => (
                <DropdownMenuItem key={c.id} onSelect={() => navigate(shopUrl(c.id))} className="gap-2">
                  <c.icon className="h-4 w-4 text-brand" /> {c.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <form onSubmit={submitSearch} role="search" className="flex-1 flex h-11 overflow-hidden rounded-md bg-white text-foreground dark:bg-card focus-within:ring-2 focus-within:ring-brand">
            <select
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              aria-label="Category"
              className="hidden md:block h-full max-w-[170px] bg-secondary px-3 text-xs font-medium border-r border-border outline-none cursor-pointer"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              type="search"
              aria-label="Search products"
              placeholder="Search products..."
              className="flex-1 min-w-0 px-4 text-sm outline-none bg-transparent"
            />
            <button type="submit" aria-label="Search" className="h-full w-12 bg-brand text-brand-foreground hover:bg-brand-hover transition flex items-center justify-center active:scale-95">
              <Search className="h-4 w-4" />
            </button>
          </form>

          <div className="hidden items-center gap-3 md:flex">
            <Link to="/wishlist" aria-label={`Wishlist (${wishCount})`} className="btn-icon relative hover:bg-white/10 hover:text-brand">
              <Heart className="h-5 w-5" />
              <Badge value={wishCount} className="-top-0.5 -right-0.5" />
            </Link>
            <Link
              to="/cart"
              aria-label={`Cart (${count})`}
              className="relative flex items-center gap-2 rounded-md p-2 transition hover:bg-white/15 md:bg-white/10 md:px-3"
            >
              <div className="relative">
                <ShoppingCart className="h-5 w-5" />
                <Badge value={count} className="-top-2 -right-2" />
              </div>
              <div className="hidden text-left leading-tight md:block">
                <p className="text-[10px] opacity-70">MY CART</p>
                <p className="text-sm font-bold">Ar {subtotal.toFixed(2)}</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="left" className="w-80 overflow-y-auto p-0 [&>button]:right-3 [&>button]:top-3.5 [&>button]:rounded-full [&>button]:p-1.5 [&>button]:text-white [&>button]:opacity-90 [&>button:hover]:bg-white/10 [&>button]:focus:ring-brand [&>button]:focus:ring-offset-0">
          <SheetTitle className="bg-header-bar px-5 py-4 text-base font-extrabold text-white">Menu</SheetTitle>
          <nav className="flex flex-col py-2">
            {NAV_LINKS.map((l) => (
              <SheetClose asChild key={l.to}>
                <Link to={l.to} className="px-5 py-3 text-sm font-semibold hover:bg-secondary hover:text-brand">{l.label}</Link>
              </SheetClose>
            ))}
          </nav>
          <p className="border-t border-border px-5 pt-4 pb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Categories</p>
          <ul className="pb-2">
            {categories.map((c) => (
              <li key={c.id}>
                <SheetClose asChild>
                  <Link to={shopUrl(c.id)} className="flex items-center gap-3 px-5 py-2.5 text-sm hover:bg-secondary hover:text-brand">
                    <c.icon className="h-4 w-4 text-brand" /> {c.label}
                  </Link>
                </SheetClose>
              </li>
            ))}
          </ul>
          <div className="grid gap-2 border-t border-border p-5">
            <SheetClose asChild>
              <Link to="/account" className="btn btn-outline btn-md"><User className="h-4 w-4" /> {user ? "My account" : "Login / Register"}</Link>
            </SheetClose>
            <SheetClose asChild>
              <Link to="/track" className="btn btn-outline btn-md"><Truck className="h-4 w-4" /> Track order</Link>
            </SheetClose>
            <a href="tel:+261346610839" className="btn btn-ghost btn-md"><Phone className="h-4 w-4" /> +261 34 66 108 39</a>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
