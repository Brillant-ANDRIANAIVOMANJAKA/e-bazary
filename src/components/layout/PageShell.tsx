import { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/common/BackToTop";
import { MobileNav } from "@/components/layout/MobileNav";

/**
 * Layout persistant de la SPA : l'en-tete et le pied de page restent montes,
 * seul le contenu de la route change (pas d'effet "rechargement").
 */
export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background pb-16 md:pb-0">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
      <BackToTop />
      <MobileNav />
    </div>
  );
}

export function PageTitle({ title, subtitle }: { title: string; subtitle?: ReactNode }) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-extrabold">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
