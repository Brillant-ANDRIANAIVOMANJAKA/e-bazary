import { useState } from "react";
import { Eye, ShoppingCart, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Rating } from "@/components/common/Rating";
import { QuickView } from "@/components/product/QuickView";
import { cn } from "@/lib/utils";

interface Props { product: Product; index?: number }

export function ProductCard({ product, index = 0 }: Props) {
  const { add } = useCart();
  const wishlist = useWishlist();
  const [quickOpen, setQuickOpen] = useState(false);
  const liked = wishlist.has(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.4) }}
      whileHover={{ y: -4 }}
      className="product-card group flex flex-col"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Link to={`/product/${product.id}`} className="block h-full w-full" aria-label={product.name}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        {product.discount && <span className="badge-sale">-{product.discount}%</span>}

        {/* Favori : toujours visible (utilisable au tactile) */}
        <button
          type="button"
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={liked}
          onClick={() => wishlist.toggle(product)}
          className={cn(
            "btn-icon absolute left-2 top-2 h-8 w-8 bg-card/90 shadow-sm backdrop-blur",
            liked ? "text-brand" : "text-muted-foreground hover:text-brand",
          )}
        >
          <Heart className={cn("h-4 w-4", liked && "fill-current")} />
        </button>

        {/* Actions au survol */}
        <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-2 bg-primary/90 p-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
          <button
            type="button"
            aria-label="Quick view"
            onClick={() => setQuickOpen(true)}
            className="btn-icon h-9 w-9 bg-white/10 text-white hover:bg-white/25"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => add(product)}
            className="btn btn-primary h-9 px-4 text-xs uppercase"
          >
            <ShoppingCart className="h-4 w-4" /> Add
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <Rating value={product.rating} reviews={product.reviews} />
        <Link to={`/product/${product.id}`} className="line-clamp-2 text-sm font-medium leading-snug hover:text-brand transition-colors">
          {product.name}
        </Link>
        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="price-now">Ar {product.price.toFixed(2)}</span>
            {product.oldPrice && <span className="price-old">Ar {product.oldPrice.toFixed(2)}</span>}
          </div>
          <button
            type="button"
            aria-label={`Add ${product.name} to cart`}
            onClick={() => add(product)}
            className="btn-icon h-8 w-8 bg-secondary text-foreground hover:bg-brand hover:text-brand-foreground"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <QuickView product={product} open={quickOpen} onOpenChange={setQuickOpen} />
    </motion.div>
  );
}
