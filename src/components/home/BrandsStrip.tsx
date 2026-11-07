import { motion } from "framer-motion";

const brands = ["Apple", "Samsung", "Sony", "Nike", "Adidas", "IKEA", "Zara", "Bose", "Canon", "Philips"];

export function BrandsStrip() {
  return (
    <section className="mt-12">
      <div className="mb-4 border-b border-border">
        <span className="section-title">Featured Brands</span>
      </div>
      <div className="overflow-hidden rounded-md border border-border bg-card">
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10">
          {brands.map((b, i) => (
            <motion.div
              key={b}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ scale: 1.05 }}
              className="flex h-20 items-center justify-center border-b border-r border-border last:border-r-0 text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-brand transition-colors"
            >
              {b}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
