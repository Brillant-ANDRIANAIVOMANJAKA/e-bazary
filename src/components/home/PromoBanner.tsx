import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { shopUrl } from "@/data/products";
import bannerTowels from "@/assets/banner-towels.jpg";

export function PromoBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative my-8 overflow-hidden rounded-md"
    >
      <img src={bannerTowels} alt="Promo linge de maison" loading="lazy" className="h-56 w-full object-cover md:h-64" />
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-background/80 via-background/40 to-transparent dark:from-background/90">
        <div className="text-center">
          <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-brand text-brand-foreground">
            <div className="text-center leading-tight">
              <p className="text-xs font-bold">75%</p>
              <p className="text-[9px]">REMISE</p>
            </div>
          </div>
          <h3 className="text-2xl font-extrabold md:text-3xl">Serviette microfibre jacquard</h3>
          <p className="mt-1 text-sm text-muted-foreground">Douce, absorbante et ultra-légère : le confort au quotidien.</p>
          <Link to={shopUrl("home")} className="btn btn-primary btn-md mt-4">
            J'en profite <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
