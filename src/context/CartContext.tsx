import { createContext, useContext, useEffect, useMemo, useReducer, ReactNode } from "react";
import { Product } from "@/data/products";
import { toast } from "sonner";

export interface CartItem extends Product { quantity: number; }

interface State { items: CartItem[]; }
type Action =
  | { type: "ADD"; product: Product; qty?: number }
  | { type: "REMOVE"; id: string }
  | { type: "UPDATE"; id: string; qty: number }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; items: CartItem[] };

const STORAGE_KEY = "ebazary_cart_v1";

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "HYDRATE": return { items: action.items };
    case "ADD": {
      const qty = action.qty ?? 1;
      const existing = state.items.find((i) => i.id === action.product.id);
      if (existing) {
        return { items: state.items.map((i) => i.id === action.product.id ? { ...i, quantity: i.quantity + qty } : i) };
      }
      return { items: [...state.items, { ...action.product, quantity: qty }] };
    }
    case "REMOVE": return { items: state.items.filter((i) => i.id !== action.id) };
    case "UPDATE": return {
      items: state.items.map((i) => i.id === action.id ? { ...i, quantity: Math.max(1, action.qty) } : i),
    };
    case "CLEAR": return { items: [] };
  }
}

interface CartContextValue {
  items: CartItem[];
  add: (p: Product, qty?: number) => void;
  remove: (id: string) => void;
  update: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "HYDRATE", items: JSON.parse(raw) });
    } catch {
      /* panier stocke illisible : on repart a vide */
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const value = useMemo<CartContextValue>(() => ({
    items: state.items,
    add: (p, qty) => {
      dispatch({ type: "ADD", product: p, qty });
      toast.success(`${p.name} ajouté au panier`);
    },
    remove: (id) => { dispatch({ type: "REMOVE", id }); toast("Retiré du panier"); },
    update: (id, qty) => dispatch({ type: "UPDATE", id, qty }),
    clear: () => dispatch({ type: "CLEAR" }),
    count: state.items.reduce((n, i) => n + i.quantity, 0),
    subtotal: state.items.reduce((s, i) => s + i.price * i.quantity, 0),
  }), [state.items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
