import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MessageCircle, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";

const posts = [
  {
    id: 1,
    image: blog1,
    title: "Curated Decor: The Key to a Personal Retreat",
    date: "Feb 28, 2026",
    comments: 18,
    excerpt: "Discover how a curated decor approach transforms any room into a personal retreat.",
    body: [
      "A curated room is not about owning more, it is about choosing better. Start with one piece you love — a lamp, a rug, a print — and build the palette of the room around it.",
      "Mix textures rather than colors: linen, wood, wool and ceramic add depth while keeping the space calm.",
      "Finally, leave some empty space. Breathing room is what makes every object you keep stand out.",
    ],
  },
  {
    id: 2,
    image: blog2,
    title: "Designing the Perfect Workspace at Home",
    date: "Mar 12, 2026",
    comments: 9,
    excerpt: "Productivity meets aesthetics. Our top tips to design a workspace you actually love.",
    body: [
      "Place your desk near natural light, ideally perpendicular to the window to avoid glare on your screen.",
      "Invest first in a good chair: you will spend more time in it than in any other piece of furniture.",
      "Keep cables hidden and only the essentials on the desk. A tidy surface means a clearer mind.",
    ],
  },
  {
    id: 3,
    image: blog3,
    title: "5 Scandinavian Design Principles to Live By",
    date: "Apr 04, 2026",
    comments: 24,
    excerpt: "Light, function, simplicity — the timeless rules behind Scandinavian interiors.",
    body: [
      "1. Light first: pale walls and floors reflect daylight through long winters.",
      "2. Function over decoration: every object should be useful or deeply loved.",
      "3. Natural materials: wood, wool and stone bring warmth. 4. Soft neutrals with a single accent color. 5. Hygge: candles, throws and cosy corners make a house a home.",
    ],
  },
];

export function LatestBlog() {
  const [openId, setOpenId] = useState<number | null>(null);
  const post = posts.find((p) => p.id === openId);

  return (
    <section id="blog" className="mt-12 scroll-mt-4">
      <div className="mb-4 border-b border-border">
        <span className="section-title">Latest Blog</span>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((p, i) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="group overflow-hidden rounded-md border border-border bg-card transition-shadow hover:shadow-lg"
          >
            <button type="button" onClick={() => setOpenId(p.id)} className="block w-full text-left" aria-label={`Read: ${p.title}`}>
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
            </button>
            <div className="p-4">
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-wider text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {p.date}</span>
                <span className="flex items-center gap-1"><MessageCircle className="h-3 w-3" /> {p.comments} Comments</span>
              </div>
              <h3 className="mt-2 line-clamp-2 text-base font-bold leading-snug group-hover:text-brand transition-colors">
                {p.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">{p.excerpt}</p>
              <button type="button" onClick={() => setOpenId(p.id)} className="btn-link mt-3">
                Read more <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </motion.article>
        ))}
      </div>

      <Dialog open={!!post} onOpenChange={(o) => !o && setOpenId(null)}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto p-0">
          {post && (
            <article>
              <img src={post.image} alt={post.title} className="aspect-[16/9] w-full object-cover" />
              <div className="p-6">
                <p className="flex items-center gap-1 text-xs uppercase tracking-wider text-muted-foreground">
                  <Calendar className="h-3 w-3" /> {post.date}
                </p>
                <DialogTitle className="mt-2 text-2xl font-extrabold leading-tight">{post.title}</DialogTitle>
                <DialogDescription className="mt-2 font-medium">{post.excerpt}</DialogDescription>
                <div className="mt-4 space-y-3 text-sm leading-relaxed">
                  {post.body.map((para) => <p key={para}>{para}</p>)}
                </div>
                <div className="mt-6 flex flex-wrap gap-2 border-t border-border pt-4">
                  {posts.filter((x) => x.id !== post.id).map((x) => (
                    <button key={x.id} type="button" onClick={() => setOpenId(x.id)} className="btn btn-outline btn-sm normal-case">
                      Next: {x.title.slice(0, 32)}{x.title.length > 32 ? "..." : ""}
                    </button>
                  ))}
                </div>
              </div>
            </article>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
