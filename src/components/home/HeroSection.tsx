import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { shopUrl } from "@/data/products";
import { ArrowRight } from "lucide-react";
import heroBedroom from "@/assets/hero-bedroom.jpg";
import promoPillows from "@/assets/promo-pillows.jpg";
import promoSofa from "@/assets/promo-sofa.jpg";

export function HeroSection() {
  return (
    <section className="grid gap-4 lg:grid-cols-[1fr_280px]">
      {/* Main hero */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative min-h-[320px] overflow-hidden rounded-md bg-secondary sm:min-h-[360px] lg:min-h-[400px]"
      >
        <img
          src={heroBedroom}
          alt="Modern bedroom furniture sale"
          width={1280}
          height={640}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/30 to-transparent dark:from-background/70" />
        <div className="relative flex min-h-[inherit] flex-col items-center justify-center px-5 py-8 text-center sm:px-8">
          <motion.p
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm font-semibold uppercase tracking-widest text-foreground/80"
          >
            Office furniture
          </motion.p>
          <motion.h1
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-2 text-3xl font-extrabold leading-tight text-brand sm:text-4xl md:text-6xl"
          >
            SALE UP TO 50% OFF
          </motion.h1>
          <motion.p
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-2 max-w-md text-xs text-foreground/70 sm:text-sm"
          >
            They key is to have every key, the key to open every door. We don't seem them, we will never see them.
          </motion.p>
          <motion.div initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
            <Link to={shopUrl("furniture")} className="btn btn-primary btn-lg mt-5">
              Shop Now <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Side promos */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-1">
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ y: -3 }}
          className="group relative overflow-hidden rounded-md bg-gradient-to-br from-amber-100 to-orange-200 p-4 dark:from-amber-900/30 dark:to-orange-900/30"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-foreground/70">Colorful</p>
          <p className="text-lg font-extrabold">Pillows</p>
          <p className="mt-1 text-xs">Starts at <span className="text-brand font-bold">Ar 29000.99</span></p>
          <Link to={shopUrl("home")} className="absolute inset-0" aria-label="Shop colorful pillows" />
          <img src={promoPillows} alt="Colorful pillows" loading="lazy" className="mt-2 h-24 w-full object-contain" />
        </motion.div>
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="relative overflow-hidden rounded-md bg-secondary p-4"
        >
          <p className="text-base font-extrabold text-brand sm:text-lg">Ar 450 000.89</p>
          <p className="text-xs font-semibold uppercase tracking-wider">Interior Design</p>
          <Link to={shopUrl("furniture")} className="btn-link mt-1">Shop now <ArrowRight className="h-3 w-3" /></Link>
          <img src={promoSofa} alt="Modern sofa" loading="lazy" className="mt-2 h-24 w-full object-contain" />
        </motion.div>
      </div>
    </section>
  );
}
