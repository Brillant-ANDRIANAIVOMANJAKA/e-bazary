import { Product } from "@/data/products";
import { ProductCard } from "./ProductCard";

interface Props { products: Product[]; columns?: 3 | 4 | 5 }

export function ProductGrid({ products, columns = 5 }: Props) {
  const colClass = {
    3: "grid-cols-2 sm:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
    5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
  }[columns];
  return (
    <div className={`grid gap-4 ${colClass}`}>
      {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
    </div>
  );
}
