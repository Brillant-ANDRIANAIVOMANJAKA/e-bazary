import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { HeroSection } from "@/components/home/HeroSection";
import { GiftBanner } from "@/components/home/GiftBanner";
import { PromoBanner } from "@/components/home/PromoBanner";
import { FeatureStrip } from "@/components/home/FeatureStrip";
import { LatestProducts } from "@/components/home/LatestProducts";
import { CollageBanner } from "@/components/home/CollageBanner";
import { LatestBlog } from "@/components/home/LatestBlog";
import { BrandsStrip } from "@/components/home/BrandsStrip";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SectionHeader } from "@/components/common/SectionHeader";
import { CountdownTimer } from "@/components/common/CountdownTimer";
import { products, shopUrl, Category } from "@/data/products";
import { useCart } from "@/context/CartContext";

const Home = () => {
  const [trendingTab, setTrendingTab] = useState("All");
  const { add } = useCart();

  // Colonne gauche "sticky" : elle defile avec la page jusqu'a ce que son bas
  // soit visible, puis reste fixe, pour eviter un grand vide a gauche.
  const leftColRef = useRef<HTMLDivElement>(null);
  const [leftTop, setLeftTop] = useState(16);
  useEffect(() => {
    const el = leftColRef.current;
    if (!el) return;
    const update = () => setLeftTop(Math.min(16, window.innerHeight - el.offsetHeight - 16));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const dailyDeals = products.filter((p) => p.dailyDeal);
  const tabs = ["All", "Furniture", "Electronics", "Fashion", "Beauty", "Home"] as const;
  const tabCategory = trendingTab === "All" ? undefined : (trendingTab.toLowerCase() as Category);
  const trending = useMemo(() => {
    if (!tabCategory) return products.filter((p) => p.trending).slice(0, 5);
    return products
      .filter((p) => p.category === tabCategory)
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 5);
  }, [tabCategory]);

  return (
    <>
      <main className="container-x py-6">
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <div ref={leftColRef} className="hidden lg:block lg:sticky lg:self-start" style={{ top: leftTop }}>
            <Sidebar />
            <LatestProducts />
          </div>

          <div className="min-w-0">
            <HeroSection />
            <GiftBanner />

            {/* Daily deals */}
            <section id="deals" className="mt-10 scroll-mt-4">
              <SectionHeader
                title="Daily Deals"
                right={<div className="hidden md:block"><CountdownTimer /></div>}
              />
              <div className="grid gap-4 md:grid-cols-2">
                {dailyDeals.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col gap-4 rounded-md border border-border bg-card p-4 transition-shadow hover:shadow-lg sm:flex-row"
                  >
                    <Link to={`/product/${p.id}`} className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded bg-muted sm:aspect-auto sm:h-40 sm:w-40">
                      <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                      <span className="badge-sale">-{p.discount}%</span>
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <Link to={`/product/${p.id}`} className="line-clamp-2 text-sm font-semibold hover:text-brand">{p.name}</Link>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-base font-bold text-brand">Ar {p.price.toFixed(2)}</span>
                        {p.oldPrice && <span className="text-xs line-through text-muted-foreground">Ar {p.oldPrice.toFixed(2)}</span>}
                      </div>
                      <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">{p.description}</p>
                      <div className="mt-2 flex justify-between text-xs">
                        <span>Available: <strong>{p.stock}</strong></span>
                        <span>Sold: <strong>{p.sold}</strong></span>
                      </div>
                      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                        <div
                          className="h-full bg-brand"
                          style={{ width: `${(p.sold / (p.sold + p.stock)) * 100}%` }}
                        />
                      </div>
                      <p className="mt-3 text-[10px] font-bold uppercase">Hurry Up! Offers end in:</p>
                      <div className="mt-1"><CountdownTimer /></div>
                      <button type="button" onClick={() => add(p)} className="btn btn-primary btn-sm mt-3 self-start">
                        <ShoppingCart className="h-3.5 w-3.5" /> Add to cart
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            <PromoBanner />

            {/* Trending */}
            <section id="trending" className="mt-4 scroll-mt-4">
              <SectionHeader
                title="Trending Items"
                tabs={[...tabs]}
                active={trendingTab}
                onTabChange={setTrendingTab}
                right={
                  <Link to={shopUrl(tabCategory)} className="btn-link mb-2">
                    View all <ArrowRight className="h-3 w-3" />
                  </Link>
                }
              />
              <ProductGrid products={trending} columns={5} />
            </section>

            {/* Promo + grid */}
            <section className="mt-10 grid gap-4 lg:grid-cols-[260px_1fr]">
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-md bg-gradient-to-br from-secondary to-accent p-6"
              >
                <p className="text-xs font-bold uppercase tracking-widest text-brand">Up to 50% OFF</p>
                <p className="mt-1 text-2xl font-extrabold">Armchair Furniture</p>
                <Link to={shopUrl("furniture")} className="btn-link mt-3">
                  Shop now <ArrowRight className="h-3 w-3" />
                </Link>
                <img
                  src="https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=400&q=70"
                  alt="Armchair"
                  loading="lazy"
                  className="mt-4 h-40 w-full object-contain"
                />
              </motion.div>
              <ProductGrid products={products.slice(8, 16)} columns={4} />
            </section>

            <section id="features" className="mt-10 scroll-mt-4">
              <FeatureStrip />
            </section>

            <CollageBanner />

            <LatestBlog />

            <BrandsStrip />

          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
