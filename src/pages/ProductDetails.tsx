import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronRight, ShoppingCart, Heart, Truck, ShieldCheck, RefreshCw, Share2, Zap } from "lucide-react";
import { toast } from "sonner";
import { Rating } from "@/components/common/Rating";
import { QtyControl } from "@/components/common/QtyControl";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";
import { ProductGrid } from "@/components/product/ProductGrid";
import { categoryLabel, findProduct, products, shopUrl } from "@/data/products";
import { useCart } from "@/context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const product = id ? findProduct(id) : undefined;
  const { add } = useCart();
  const wishlist = useWishlist();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  useEffect(() => setQty(1), [id]);

  if (!product) return <Navigate to="/" replace />;

  const liked = wishlist.has(product.id);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: product.name, url });
      else {
        await navigator.clipboard.writeText(url);
        toast.success("Lien copié dans le presse-papiers");
      }
    } catch {
      /* partage annule */
    }
  };

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 5);

  return (
    <>
      <main className="container-x py-6">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-brand">Accueil</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to={shopUrl(product.category)} className="hover:text-brand">{categoryLabel(product.category)}</Link>
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
            <Rating value={product.rating} reviews={product.reviews} size="md" className="mt-3" />

            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-brand">Ar {product.price.toFixed(2)}</span>
              {product.oldPrice && <span className="text-lg line-through text-muted-foreground">Ar {product.oldPrice.toFixed(2)}</span>}
            </div>

            <p className="mt-4 text-sm text-muted-foreground">{product.description}</p>

            <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
              <p>Disponibilité : <span className="font-bold text-foreground">{product.stock} en stock</span></p>
              <p>Vendus : <span className="font-bold text-foreground">{product.sold}</span></p>
            </div>

            {/* Quantity & CTA */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <QtyControl value={qty} onChange={setQty} max={product.stock} />
              <button type="button" onClick={() => add(product, qty)} className="btn btn-primary btn-lg flex-1 sm:flex-none">
                <ShoppingCart className="h-4 w-4" /> Ajouter au panier
              </button>
              <button
                type="button"
                onClick={() => { add(product, qty); navigate("/checkout"); }}
                className="btn btn-dark btn-lg flex-1 sm:flex-none"
              >
                <Zap className="h-4 w-4" /> Acheter maintenant
              </button>
              <button
                type="button"
                aria-label={liked ? "Retirer des favoris" : "Ajouter aux favoris"}
                aria-pressed={liked}
                onClick={() => wishlist.toggle(product)}
                className={cn("btn-icon h-12 w-12 border", liked ? "border-brand bg-brand/15 text-brand" : "border-border hover:border-brand hover:text-brand")}
              >
                <Heart className={cn("h-5 w-5", liked && "fill-current")} />
              </button>
              <button type="button" aria-label="Partager" onClick={share} className="btn-icon h-12 w-12 border border-border hover:border-brand hover:text-brand">
                <Share2 className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-border pt-6">
              {[
                { icon: Truck, label: "Livraison offerte" },
                { icon: ShieldCheck, label: "Paiement sécurisé" },
                { icon: RefreshCw, label: "Retour sous 30 jours" },
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
              Produits similaires
            </h2>
            <ProductGrid products={related} columns={5} />
          </section>
        )}
      </main>
    </>
  );
};

export default ProductDetails;
