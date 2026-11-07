import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { shopUrl } from "@/data/products";
import collageStudio from "@/assets/collage-studio.jpg";
import collageDecor from "@/assets/collage-decor.jpg";
import collageTowels from "@/assets/collage-towels.jpg";

export function CollageBanner() {
  return (
    <section className="mt-10 grid gap-4 md:grid-cols-4 md:grid-rows-2 md:h-[360px]">
      {/* Top-left small */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -3 }}
        className="relative overflow-hidden rounded-md md:row-span-1"
      >
        <Link to={shopUrl("furniture")} className="absolute inset-0 z-10" aria-label="Voir la déco" />
        <img src={collageDecor} alt="Décoration maison" loading="lazy" className="h-full w-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/25">
          <div className="text-center text-white">
            <p className="text-xs font-bold uppercase tracking-widest opacity-80">Maison</p>
            <p className="text-lg font-extrabold">Belle déco</p>
          </div>
        </div>
      </motion.div>

      {/* Center large */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.01 }}
        className="relative overflow-hidden rounded-md md:col-span-2 md:row-span-2"
      >
        <img src={collageStudio} alt="Collection exclusive Studio.w" loading="lazy" className="h-full w-full object-cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-primary/80 via-primary/30 to-transparent text-center text-white">
          <p className="text-3xl font-extrabold tracking-tight md:text-5xl">Studio.w</p>
          <p className="mt-1 text-xs font-bold uppercase tracking-[0.3em] opacity-90">Collection exclusive</p>
          <Link to={shopUrl("furniture")} className="btn btn-primary btn-sm mt-4">
            J'en profite <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </motion.div>

      {/* Top-right */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -3 }}
        className="relative overflow-hidden rounded-md md:row-span-1"
      >
        <Link to={shopUrl("home")} className="absolute inset-0 z-10" aria-label="Voir les serviettes" />
        <img src={collageTowels} alt="Serviettes décoratives" loading="lazy" className="h-full w-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/25">
          <div className="text-center text-white">
            <p className="text-xs font-bold uppercase tracking-widest opacity-80">Serviettes</p>
            <p className="text-lg font-extrabold">Belle déco</p>
          </div>
        </div>
      </motion.div>

      {/* Bottom-left */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        whileHover={{ y: -3 }}
        className="relative overflow-hidden rounded-md bg-gradient-to-br from-accent to-secondary p-5"
      >
        <p className="text-xs font-bold uppercase tracking-widest text-brand">Nouveauté</p>
        <p className="mt-1 text-xl font-extrabold leading-tight">Collection salon</p>
        <Link to={shopUrl("furniture")} className="btn-link mt-3">Découvrir <ArrowRight className="h-3 w-3" /></Link>
      </motion.div>

      {/* Bottom-right */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        whileHover={{ y: -3 }}
        className="relative overflow-hidden rounded-md bg-primary p-5 text-primary-foreground"
      >
        <p className="text-xs font-bold uppercase tracking-widest opacity-70">Meilleure vente</p>
        <p className="mt-1 text-xl font-extrabold leading-tight">Ensemble chambre premium</p>
        <p className="mt-2 text-2xl font-extrabold text-brand">−40%</p>
        <Link to={shopUrl("home")} className="btn-link mt-2">Acheter <ArrowRight className="h-3 w-3" /></Link>
      </motion.div>
    </section>
  );
}
