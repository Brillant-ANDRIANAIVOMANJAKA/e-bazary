import { Star, Eye, ShoppingCart, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

interface Props { product: Product; index?: number }

export function ProductCard({ product, index = 0 }: Props) {
  const { add } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.4) }}
      whileHover={{ y: -4 }}
      className="product-card group flex flex-col"
    >
      <Link to={`/product/${product.id}`} className="relative block aspect-square overflow-hidden bg-muted">
        <motion.img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.4 }}
        />
        {product.discount && (
          <span className="badge-sale">-{product.discount}%</span>
        )}
        <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-2 bg-primary/90 p-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button aria-label="Quick view" className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition">
            <Eye className="h-4 w-4" />
          </button>
          <button aria-label="Add to wishlist" className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition">
            <Heart className="h-4 w-4" />
          </button>
          <button
            aria-label="Add to cart"
            onClick={(e) => { e.preventDefault(); add(product); }}
            className="rounded-full bg-brand p-2 text-brand-foreground hover:bg-brand-hover transition"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <div className="flex items-center gap-1 text-amber-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-3 w-3 ${i < Math.round(product.rating) ? "fill-current" : "opacity-30"}`} />
          ))}
          <span className="ml-1 text-[10px] text-muted-foreground">({product.reviews})</span>
        </div>
        <Link to={`/product/${product.id}`} className="line-clamp-2 text-sm font-medium leading-snug hover:text-brand transition-colors">
          {product.name}
        </Link>
        <div className="mt-auto flex items-baseline gap-2 pt-1">
          <span className="price-now">Ar{product.price.toFixed(2)}</span>
          {product.oldPrice && <span className="price-old">Ar{product.oldPrice.toFixed(2)}</span>}
        </div>
      </div>
    </motion.div>
  );
}
