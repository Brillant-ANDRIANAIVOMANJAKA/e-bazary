import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Home, LayoutGrid, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";

/** Barre de navigation fixe en bas de l'ecran, mobile uniquement. */
export function MobileNav() {
  const { pathname } = useLocation();
  const { count } = useCart();
  const { count: wishCount } = useWishlist();

  const items = [
    { to: "/", label: "Accueil", icon: Home, active: pathname === "/" },
    { to: "/shop", label: "Boutique", icon: LayoutGrid, active: pathname === "/shop" || pathname.startsWith("/product") },
    { to: "/wishlist", label: "Favoris", icon: Heart, active: pathname === "/wishlist", badge: wishCount },
    { to: "/cart", label: "Panier", icon: ShoppingCart, active: pathname === "/cart" || pathname === "/checkout", badge: count },
    { to: "/account", label: "Compte", icon: User, active: pathname === "/account" || pathname === "/track" },
  ];

  return (
    <nav
      aria-label="Navigation mobile"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur md:hidden"
    >
      <ul className="grid grid-cols-5">
        {items.map((it) => (
          <li key={it.to}>
            <Link
              to={it.to}
              aria-current={it.active ? "page" : undefined}
              className={cn(
                "relative flex h-16 flex-col items-center justify-center gap-1 text-[10px] font-semibold transition-colors active:scale-95",
                it.active ? "text-brand" : "text-muted-foreground",
              )}
            >
              {it.active && (
                <motion.span
                  layoutId="mobile-nav-indicator"
                  className="absolute inset-x-4 top-0 h-0.5 rounded-full bg-brand"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <span className="relative">
                <it.icon className={cn("h-5 w-5", it.active && it.icon === Heart && "fill-current")} />
                {!!it.badge && (
                  <motion.span
                    key={it.badge}
                    initial={{ scale: 0.4 }}
                    animate={{ scale: 1 }}
                    className="absolute -right-2.5 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[9px] font-bold text-brand-foreground"
                  >
                    {it.badge > 99 ? "99+" : it.badge}
                  </motion.span>
                )}
              </span>
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
