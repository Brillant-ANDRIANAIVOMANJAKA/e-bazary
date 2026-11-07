import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronRight, Minus, Plus, ShoppingCart, Heart, Star, Truck, ShieldCheck, RefreshCw } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductGrid } from "@/components/product/ProductGrid";
import { findProduct, products } from "@/data/products";
import { useCart } from "@/context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const product = id ? findProduct(id) : undefined;
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) return <Navigate to="/" replace />;

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 5);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container-x py-6">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-brand">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="capitalize">{product.category}</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{product.name}</span>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-8 lg:grid-cols-2"
        >
          <div className="relative overflow-hidden rounded-md border border-border bg-card">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
            {product.discount && <span className="badge-sale">-{product.discount}%</span>}
          </div>

          <div>
            <h1 className="text-3xl font-extrabold">{product.name}</h1>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex items-center text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? "fill-current" : "opacity-30"}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
            </div>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-brand">Ar{product.price}</span>
              {product.oldPrice && <span className="text-lg line-through text-muted-foreground">Ar{product.oldPrice}</span>}
            </div>

            <p className="mt-4 text-sm text-muted-foreground">{product.description}</p>

            <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
              <p>Availability: <span className="font-bold text-foreground">{product.stock} in stock</span></p>
              <p>Sold: <span className="font-bold text-foreground">{product.sold}</span></p>
            </div>

            {/* Quantity & CTA */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="flex h-12 items-center rounded border border-border">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex h-full w-12 items-center justify-center hover:bg-secondary">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center font-semibold">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="flex h-full w-12 items-center justify-center hover:bg-secondary">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => add(product, qty)}
                className="inline-flex h-12 items-center gap-2 rounded bg-brand px-6 text-sm font-bold text-brand-foreground hover:bg-brand-hover transition"
              >
                <ShoppingCart className="h-4 w-4" /> Add to Cart
              </motion.button>
              <button aria-label="Wishlist" className="flex h-12 w-12 items-center justify-center rounded border border-border hover:bg-secondary transition">
                <Heart className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-border pt-6">
              {[
                { icon: Truck, label: "Free Shipping" },
                { icon: ShieldCheck, label: "Secure Payment" },
                { icon: RefreshCw, label: "30-Day Returns" },
              ].map((b) => (
                <div key={b.label} className="flex flex-col items-center text-center">
                  <b.icon className="h-6 w-6 text-brand" />
                  <span className="mt-1 text-xs">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-4 inline-block bg-primary px-4 py-2 text-sm font-bold uppercase tracking-wider text-primary-foreground rounded-t-md">
              Related Products
            </h2>
            <ProductGrid products={related} columns={5} />
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetails;
