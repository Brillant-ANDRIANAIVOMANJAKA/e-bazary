import { useState } from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { isEmail, subscribeNewsletter } from "@/lib/storage";

const COLUMNS = [
  {
    title: "Informations",
    links: [
      { label: "À propos", to: "/page/about" },
      { label: "Contact", to: "/page/contact" },
      { label: "Carrières", to: "/page/careers" },
      { label: "Affiliation", to: "/page/affiliate" },
      { label: "Nos boutiques", to: "/page/stores" },
    ],
  },
  {
    title: "Service client",
    links: [
      { label: "Centre d'aide", to: "/page/help" },
      { label: "Retours", to: "/page/returns" },
      { label: "Livraison", to: "/page/shipping" },
      { label: "Suivi de commande", to: "/track" },
      { label: "Confidentialité", to: "/page/privacy" },
    ],
  },
  {
    title: "Mon compte",
    links: [
      { label: "Connexion", to: "/account" },
      { label: "Favoris", to: "/wishlist" },
      { label: "Panier", to: "/cart" },
      { label: "Suivre ma commande", to: "/track" },
      { label: "Boutique", to: "/shop" },
    ],
  },
];

const SOCIALS = [
  { Icon: Facebook, label: "Facebook", href: "https://www.facebook.com/" },
  { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/" },
  { Icon: Twitter, label: "Twitter", href: "https://x.com/" },
  { Icon: Youtube, label: "YouTube", href: "https://www.youtube.com/" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmail(email)) {
      toast.error("Veuillez saisir une adresse email valide.");
      return;
    }
    setState("loading");
    window.setTimeout(() => {
      const isNew = subscribeNewsletter(email);
      toast.success(isNew ? "Merci pour votre inscription !" : "Vous êtes déjà inscrit.");
      setState("done");
      setEmail("");
      window.setTimeout(() => setState("idle"), 2500);
    }, 500);
  };

  return (
    <footer className="mt-16 bg-header-bar text-white/80">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
          <div>
            <h3 className="text-xl font-bold text-white">Abonnez-vous à notre newsletter</h3>
            <p className="text-sm opacity-70">Recevez nos dernières promos et nouveautés directement par email.</p>
          </div>
          <form onSubmit={subscribe} noValidate className="flex w-full max-w-md overflow-hidden rounded-full bg-white/10 p-1 focus-within:ring-2 focus-within:ring-brand">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Adresse email"
              placeholder="Votre adresse email..."
              className="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm text-white outline-none placeholder:text-white/50"
            />
            <button type="submit" disabled={state === "loading"} className="btn btn-primary btn-sm w-32">
              {state === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : state === "done" ? <><Check className="h-4 w-4" /> Inscrit</> : "S'abonner"}
            </button>
          </form>
        </div>
      </div>

      <div className="container-x grid gap-8 py-12 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-3 w-fit">
            <div className="h-9 w-9 rounded-full overflow-hidden">
              <img src="/e-bazary.png" alt="Logo e-bazary" className="h-full w-full object-cover" />
            </div>
            <p className="text-xl font-extrabold text-white">e-bazary</p>
          </Link>
          <p className="text-sm opacity-70 max-w-sm">
            Votre marketplace malgache pour la maison, la mode, l'électronique et plus encore — promos quotidiennes, qualité premium et livraison rapide.
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href="https://maps.google.com/?q=Analakely+Antananarivo" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-brand transition">
                <MapPin className="h-4 w-4 text-brand" /> 123 Analakely, Antananarivo
              </a>
            </li>
            <li>
              <a href="tel:+261346610839" className="flex items-center gap-2 hover:text-brand transition">
                <Phone className="h-4 w-4 text-brand" /> +261 34 66 108 39
              </a>
            </li>
            <li>
              <a href="mailto:support@e-bazary.mg" className="flex items-center gap-2 hover:text-brand transition">
                <Mail className="h-4 w-4 text-brand" /> support@e-bazary.mg
              </a>
            </li>
          </ul>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">{col.title}</h4>
            <ul className="space-y-2 text-sm">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="inline-block opacity-70 transition hover:translate-x-1 hover:text-brand hover:opacity-100">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-5 text-xs md:flex-row">
          <p className="opacity-70">© {new Date().getFullYear()} e-bazary par Brillant — Tous droits réservés.</p>
          <div className="flex items-center gap-2">
            {SOCIALS.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="btn-icon h-8 w-8 bg-white/10 hover:-translate-y-0.5 hover:bg-brand hover:text-brand-foreground"
              >
                <Icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
