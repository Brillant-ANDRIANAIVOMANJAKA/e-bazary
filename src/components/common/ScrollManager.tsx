import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * - Lien avec ancre (/#deals) : defile jusqu'a la section une fois rendue.
 * - Changement de page : remonte en haut.
 * - Simple changement de filtre (?category=, ?sort=...) : garde la position.
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 });
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    let tries = 0;
    const timer = window.setInterval(() => {
      const el = document.getElementById(id);
      if (el || ++tries > 30) {
        window.clearInterval(timer);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);
    return () => window.clearInterval(timer);
  }, [pathname, hash]);

  return null;
}
