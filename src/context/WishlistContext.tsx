import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { toast } from "sonner";
import { Product, findProduct } from "@/data/products";
import { readJSON, writeJSON } from "@/lib/storage";

const KEY = "emarket_wishlist_v1";

interface WishlistValue {
  ids: string[];
  items: Product[];
  count: number;
  has: (id: string) => boolean;
  toggle: (p: Product) => void;
  remove: (id: string) => void;
  clear: () => void;
}

const WishlistContext = createContext<WishlistValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>(() => readJSON<string[]>(KEY, []));

  useEffect(() => writeJSON(KEY, ids), [ids]);

  const toggle = useCallback((p: Product) => {
    if (ids.includes(p.id)) {
      setIds((prev) => prev.filter((x) => x !== p.id));
      toast(`${p.name} removed from wishlist`);
    } else {
      setIds((prev) => (prev.includes(p.id) ? prev : [...prev, p.id]));
      toast.success(`${p.name} added to wishlist`);
    }
  }, [ids]);

  const value = useMemo<WishlistValue>(() => {
    const items = ids.map(findProduct).filter((p): p is Product => Boolean(p));
    return {
      ids,
      items,
      count: items.length,
      has: (id) => ids.includes(id),
      toggle,
      remove: (id) => setIds((prev) => prev.filter((x) => x !== id)),
      clear: () => setIds([]),
    };
  }, [ids, toggle]);

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
};
