import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/layout/Footer";
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
import { BackToTop } from "@/components/common/BackToTop";
import { products, categories, Category } from "@/data/products";
import { useSearch } from "@/context/SearchContext";

const Home = () => {
  const [active, setActive] = useState<string | undefined>(undefined);
  const [trendingTab, setTrendingTab] = useState("All");
  const { query } = useSearch();

  const filtered = useMemo(() => {
    let res = products;
    if (active) res = res.filter((p) => p.category === active);
    if (query.trim()) {
      const q = query.toLowerCase();
      res = res.filter((p) => p.name.toLowerCase().includes(q) || p.category.includes(q));
    }
    return res;
  }, [active, query]);

  const dailyDeals = products.filter((p) => p.dailyDeal);
  const trending = useMemo(() => {
    let t = products.filter((p) => p.trending);
    if (trendingTab !== "All") t = t.filter((p) => p.category === trendingTab.toLowerCase());
    return t;
  }, [trendingTab]);

  const tabs = ["All", "Furniture", "Electronics", "Fashion", "Beauty", "Home"];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container-x py-6">
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <div className="hidden lg:block">
            <Sidebar active={active} onSelect={(id) => setActive(id as Category | undefined)} />
            <LatestProducts />
          </div>

          <div className="min-w-0">
            <HeroSection />
            <GiftBanner />

            {/* Daily deals */}
            <section className="mt-10">
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
                    className="flex gap-4 rounded-md border border-border bg-card p-4 hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded bg-muted">
                      <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover" />
                      <span className="badge-sale">-{p.discount}%</span>
                    </div>
                    <div className="flex flex-1 flex-col">
                      <h3 className="line-clamp-2 text-sm font-semibold">{p.name}</h3>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-base font-bold text-brand">Ar{p.price}</span>
                        <span className="text-xs line-through text-muted-foreground">Ar{p.oldPrice}</span>
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
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            <PromoBanner />

            {/* Trending */}
            <section className="mt-4">
              <SectionHeader
                title="Trending Items"
                tabs={tabs}
                active={trendingTab}
                onTabChange={setTrendingTab}
              />
              <ProductGrid products={trending.length ? trending : products.slice(0, 5)} columns={5} />
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
                <button className="mt-3 inline-block text-xs font-bold uppercase border-b border-brand text-brand">Shop now →</button>
                <img
                  src="https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=400&q=70"
                  alt="Armchair"
                  loading="lazy"
                  className="mt-4 h-40 w-full object-contain"
                />
              </motion.div>
              <ProductGrid products={products.slice(8, 16)} columns={4} />
            </section>

            <section className="mt-10">
              <FeatureStrip />
            </section>

            <CollageBanner />

            <LatestBlog />

            <BrandsStrip />

            {/* Filtered all-products section (search/category) */}
            {(active || query) && (
              <section className="mt-10">
                <SectionHeader title={query ? `Results for "${query}"` : `Category: ${categories.find(c => c.id === active)?.label}`} />
                {filtered.length === 0 ? (
                  <p className="py-10 text-center text-muted-foreground">No products found.</p>
                ) : (
                  <ProductGrid products={filtered} columns={5} />
                )}
              </section>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Home;
