import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ChevronRight, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { isEmail, readJSON, writeJSON } from "@/lib/storage";

const PAGES: Record<string, { title: string; body: string[] }> = {
  about: {
    title: "À propos",
    body: [
      "e-bazary est une boutique en ligne tout-en-un basée à Antananarivo. Meubles, mode, électronique, beauté et bien plus, réunis au même endroit.",
      "Notre objectif est simple : des prix justes, des produits bien choisis et un service client à l'écoute, tous les jours.",
    ],
  },
  contact: {
    title: "Contact",
    body: ["Une question sur un produit ou une commande ? Envoyez-nous un message, notre équipe vous répond sous 24 heures."],
  },
  careers: {
    title: "Carrières",
    body: [
      "Nous sommes une petite équipe en pleine croissance, passionnée par le e-commerce et le design.",
      "Aucun poste ouvert pour le moment, mais les candidatures spontanées sont les bienvenues à support@e-bazary.mg.",
    ],
  },
  affiliate: {
    title: "Programme d'affiliation",
    body: ["Partagez e-bazary avec votre communauté et touchez une commission sur chaque commande passée via votre lien. Contactez-nous pour recevoir votre code."],
  },
  stores: {
    title: "Nos boutiques",
    body: ["Showroom : 123 Analakely, Antananarivo.", "Ouvert du lundi au samedi, de 8 h à 18 h."],
  },
  help: {
    title: "Centre d'aide",
    body: [
      "Commander : ajoutez des produits au panier puis passez commande. Vous recevrez un numéro pour suivre votre livraison.",
      "Codes promo : saisissez votre code (par exemple BRILLANT2026) au moment du paiement pour obtenir votre remise.",
      "Compte : votre profil, vos favoris et votre panier sont enregistrés dans votre navigateur.",
    ],
  },
  returns: {
    title: "Retours",
    body: ["Vous pouvez retourner un article sous 30 jours après livraison, dans son état d'origine. Contactez-nous avec votre numéro de commande."],
  },
  shipping: {
    title: "Livraison",
    body: ["Livraison offerte dès Ar 4900 d'achat. Les commandes sont expédiées sous 24 h et livrées en 2 à 5 jours ouvrés."],
  },
  privacy: {
    title: "Politique de confidentialité",
    body: [
      "Cette boutique de démonstration n'envoie aucune donnée à un serveur. Votre panier, vos favoris, votre compte et vos commandes sont stockés uniquement dans votre navigateur (localStorage).",
      "Vous pouvez les effacer à tout moment en vidant les données de votre navigateur.",
    ],
  },
};

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name.trim().length < 2) return toast.error("Veuillez saisir votre nom.");
    if (!isEmail(form.email)) return toast.error("Veuillez saisir une adresse email valide.");
    if (form.message.trim().length < 10) return toast.error("Votre message est trop court.");
    setSending(true);
    window.setTimeout(() => {
      writeJSON("ebazary_messages_v1", [...readJSON<unknown[]>("ebazary_messages_v1", []), { ...form, at: new Date().toISOString() }]);
      setSending(false);
      setForm({ name: "", email: "", message: "" });
      toast.success("Message envoyé ! Nous vous répondons sous 24 h.");
    }, 600);
  };

  return (
    <form onSubmit={submit} noValidate className="mt-6 grid gap-3 sm:grid-cols-2">
      <input className="field" placeholder="Votre nom" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input className="field" type="email" placeholder="Votre email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <textarea
        className="field h-36 resize-y py-2 sm:col-span-2"
        placeholder="Votre message"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />
      <button type="submit" disabled={sending} className="btn btn-primary btn-md sm:col-span-2 sm:justify-self-start">
        {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />} Envoyer
      </button>
    </form>
  );
}

const InfoPage = () => {
  const { slug = "" } = useParams();
  const page = PAGES[slug];
  if (!page) return <Navigate to="/404" replace />;

  return (
    <>
      <main className="container-x max-w-3xl py-10">
        <nav className="mb-4 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Fil d'Ariane">
          <Link to="/" className="hover:text-brand">Accueil</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{page.title}</span>
        </nav>
        <h1 className="text-3xl font-extrabold">{page.title}</h1>
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
          {page.body.map((p) => <p key={p}>{p}</p>)}
        </div>

        {slug === "contact" && (
          <>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <a href="tel:+261346610839" className="btn btn-outline btn-md"><Phone className="h-4 w-4 text-brand" /> Appeler</a>
              <a href="mailto:support@e-bazary.mg" className="btn btn-outline btn-md"><Mail className="h-4 w-4 text-brand" /> Écrire</a>
              <a href="https://maps.google.com/?q=Analakely+Antananarivo" target="_blank" rel="noreferrer" className="btn btn-outline btn-md">
                <MapPin className="h-4 w-4 text-brand" /> Nous trouver
              </a>
            </div>
            <ContactForm />
          </>
        )}

        <div className="mt-10 flex flex-wrap gap-2 border-t border-border pt-6">
          {Object.entries(PAGES).filter(([k]) => k !== slug).map(([k, p]) => (
            <Link key={k} to={`/page/${k}`} className="btn btn-ghost btn-sm normal-case">{p.title}</Link>
          ))}
        </div>
      </main>
    </>
  );
};

export default InfoPage;
