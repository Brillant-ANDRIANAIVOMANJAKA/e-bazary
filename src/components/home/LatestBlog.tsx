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
    title: "Une déco choisie pour un intérieur qui vous ressemble",
    date: "28 févr. 2026",
    comments: 18,
    excerpt: "Comment une déco bien choisie transforme n'importe quelle pièce en cocon.",
    body: [
      "Une pièce réussie, ce n'est pas posséder plus, c'est mieux choisir. Partez d'un objet que vous aimez — une lampe, un tapis, une affiche — et construisez la palette autour.",
      "Mélangez les matières plutôt que les couleurs : lin, bois, laine et céramique apportent de la profondeur tout en gardant une ambiance apaisée.",
      "Enfin, laissez du vide. C'est l'espace autour des objets qui les met en valeur.",
    ],
  },
  {
    id: 2,
    image: blog2,
    title: "Aménager le bureau idéal à la maison",
    date: "12 mars 2026",
    comments: 9,
    excerpt: "Productivité et esthétique : nos conseils pour un coin bureau que vous aimerez vraiment.",
    body: [
      "Placez votre bureau près de la lumière naturelle, idéalement perpendiculaire à la fenêtre pour éviter les reflets.",
      "Investissez d'abord dans une bonne chaise : vous y passerez plus de temps que sur n'importe quel autre meuble.",
      "Cachez les câbles et ne gardez que l'essentiel sur le bureau. Espace rangé, esprit clair.",
    ],
  },
  {
    id: 3,
    image: blog3,
    title: "5 principes du design scandinave",
    date: "4 avr. 2026",
    comments: 24,
    excerpt: "Lumière, fonction, simplicité : les règles intemporelles des intérieurs scandinaves.",
    body: [
      "1. La lumière d'abord : murs et sols clairs reflètent la lumière du jour.",
      "2. La fonction avant la déco : chaque objet doit être utile ou vraiment aimé.",
      "3. Des matières naturelles : bois, laine et pierre réchauffent. 4. Des tons neutres avec une seule couleur forte. 5. Le hygge : bougies, plaids et coins douillets font d'une maison un foyer.",
    ],
  },
];

export function LatestBlog() {
  const [openId, setOpenId] = useState<number | null>(null);
  const post = posts.find((p) => p.id === openId);

  return (
    <section id="blog" className="mt-12 scroll-mt-4">
      <div className="mb-4 border-b border-border">
        <span className="section-title">Derniers articles</span>
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
            <button type="button" onClick={() => setOpenId(p.id)} className="block w-full text-left" aria-label={`Lire : ${p.title}`}>
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
            </button>
            <div className="p-4">
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-wider text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {p.date}</span>
                <span className="flex items-center gap-1"><MessageCircle className="h-3 w-3" /> {p.comments} commentaires</span>
              </div>
              <h3 className="mt-2 line-clamp-2 text-base font-bold leading-snug group-hover:text-brand transition-colors">
                {p.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">{p.excerpt}</p>
              <button type="button" onClick={() => setOpenId(p.id)} className="btn-link mt-3">
                Lire la suite <ArrowRight className="h-3 w-3" />
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
                      À lire : {x.title.slice(0, 32)}{x.title.length > 32 ? "..." : ""}
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
