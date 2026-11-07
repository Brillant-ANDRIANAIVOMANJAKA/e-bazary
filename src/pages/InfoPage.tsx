import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ChevronRight, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { PageShell } from "@/components/layout/PageShell";
import { isEmail, readJSON, writeJSON } from "@/lib/storage";

const PAGES: Record<string, { title: string; body: string[] }> = {
  about: {
    title: "About Us",
    body: [
      "e-market is an all-in-one online store based in Antananarivo. We bring together furniture, fashion, electronics, beauty and more in one simple place.",
      "Our goal is simple: fair prices, carefully selected products and friendly support, every day.",
    ],
  },
  contact: {
    title: "Contact",
    body: ["Questions about a product or an order? Send us a message and our team will get back to you within 24 hours."],
  },
  careers: {
    title: "Careers",
    body: [
      "We are a small, growing team that loves e-commerce and good design.",
      "No open positions right now, but spontaneous applications are welcome at support@emarket.com.",
    ],
  },
  affiliate: {
    title: "Affiliate Program",
    body: ["Share e-market with your audience and earn a commission on every order placed through your link. Contact us to receive your affiliate code."],
  },
  stores: {
    title: "Our Stores",
    body: ["Showroom: 123 Analakely, Antananarivo.", "Open Monday to Saturday, 8:00 to 18:00."],
  },
  help: {
    title: "Help Center",
    body: [
      "Ordering: add products to your cart, then go to Checkout. You will receive an order number to track your delivery.",
      "Coupons: enter your code (for example BRILLANT2026) at checkout to get your discount.",
      "Account: your profile, wishlist and cart are saved in your browser.",
    ],
  },
  returns: {
    title: "Returns",
    body: ["You can return any item within 30 days of delivery, in its original condition. Contact us with your order number to start a return."],
  },
  shipping: {
    title: "Shipping",
    body: ["Free delivery on orders over Ar 4900. Orders are usually shipped within 24 hours and delivered in 2 to 5 business days."],
  },
  privacy: {
    title: "Privacy Policy",
    body: [
      "This demo store does not send your data to any server. Your cart, wishlist, account and orders are stored only in your browser (localStorage).",
      "You can erase them at any time by clearing your browser data.",
    ],
  },
};

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name.trim().length < 2) return toast.error("Please enter your name.");
    if (!isEmail(form.email)) return toast.error("Please enter a valid email address.");
    if (form.message.trim().length < 10) return toast.error("Your message is too short.");
    setSending(true);
    window.setTimeout(() => {
      writeJSON("emarket_messages_v1", [...readJSON<unknown[]>("emarket_messages_v1", []), { ...form, at: new Date().toISOString() }]);
      setSending(false);
      setForm({ name: "", email: "", message: "" });
      toast.success("Message sent! We will reply within 24 hours.");
    }, 600);
  };

  return (
    <form onSubmit={submit} noValidate className="mt-6 grid gap-3 sm:grid-cols-2">
      <input className="field" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input className="field" type="email" placeholder="Your email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <textarea
        className="field h-36 resize-y py-2 sm:col-span-2"
        placeholder="Your message"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />
      <button type="submit" disabled={sending} className="btn btn-primary btn-md sm:col-span-2 sm:justify-self-start">
        {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />} Send message
      </button>
    </form>
  );
}

const InfoPage = () => {
  const { slug = "" } = useParams();
  const page = PAGES[slug];
  if (!page) return <Navigate to="/404" replace />;

  return (
    <PageShell>
      <main className="container-x max-w-3xl py-10">
        <nav className="mb-4 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-brand">Home</Link>
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
              <a href="tel:+261346610839" className="btn btn-outline btn-md"><Phone className="h-4 w-4 text-brand" /> Call us</a>
              <a href="mailto:support@emarket.com" className="btn btn-outline btn-md"><Mail className="h-4 w-4 text-brand" /> Email us</a>
              <a href="https://maps.google.com/?q=Analakely+Antananarivo" target="_blank" rel="noreferrer" className="btn btn-outline btn-md">
                <MapPin className="h-4 w-4 text-brand" /> Find us
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
    </PageShell>
  );
};

export default InfoPage;
