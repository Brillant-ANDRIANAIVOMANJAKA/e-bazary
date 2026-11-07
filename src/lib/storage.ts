// Persistance locale (sans backend) : tout est stocke dans le navigateur.

export function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJSON(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* stockage indisponible (navigation privee, quota) : on ignore */
  }
}

/* ---------- Commandes ---------- */

export interface OrderItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  createdAt: string;
  email: string;
  name: string;
  address: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
}

const ORDERS_KEY = "ebazary_orders_v1";

export const getOrders = () => readJSON<Order[]>(ORDERS_KEY, []);

export function saveOrder(order: Order) {
  writeJSON(ORDERS_KEY, [order, ...getOrders()]);
}

export const findOrder = (id: string) =>
  getOrders().find((o) => o.id.toLowerCase() === id.trim().toLowerCase());

export function newOrderId() {
  return "EB-" + Date.now().toString(36).toUpperCase().slice(-6) + Math.floor(Math.random() * 90 + 10);
}

/** Statut simule a partir de l'age de la commande. */
export function orderStatus(order: Order) {
  const minutes = (Date.now() - new Date(order.createdAt).getTime()) / 60000;
  const steps = ["Commande passée", "En préparation", "Expédiée", "En cours de livraison", "Livrée"];
  const index = minutes < 2 ? 0 : minutes < 60 ? 1 : minutes < 60 * 24 ? 2 : minutes < 60 * 48 ? 3 : 4;
  return { steps, index };
}

/* ---------- Coupons ---------- */

export const COUPONS: Record<string, number> = { BRILLANT2026: 0.1 };

export function couponRate(code: string) {
  return COUPONS[code.trim().toUpperCase()] ?? 0;
}

/* ---------- Newsletter ---------- */

const NEWSLETTER_KEY = "ebazary_newsletter_v1";

export function subscribeNewsletter(email: string) {
  const list = readJSON<string[]>(NEWSLETTER_KEY, []);
  const already = list.includes(email.toLowerCase());
  if (!already) writeJSON(NEWSLETTER_KEY, [...list, email.toLowerCase()]);
  return !already;
}

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
