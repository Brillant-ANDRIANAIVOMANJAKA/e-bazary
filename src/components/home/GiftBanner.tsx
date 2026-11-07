import { useState } from "react";
import { Gift, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const CODE = "Brillant2026";

export function GiftBanner() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CODE);
    } catch {
      /* presse-papiers indisponible : le code reste affiche */
    }
    setCopied(true);
    toast.success(`Coupon ${CODE} copied — use it at checkout for 10% off`);
    window.setTimeout(() => setCopied(false), 2500);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-6 flex flex-col items-center justify-between gap-3 rounded-md border border-border bg-secondary p-4 sm:flex-row"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-brand-foreground">
          <Gift className="h-5 w-5" />
        </div>
        <p className="text-sm">
          <span className="font-bold">Gift Special</span> — Wrap new offers / gift every single day on Weekends — New Coupon code:{" "}
          <span className="font-bold text-brand">Brillant2026</span>
        </p>
      </div>
      <button type="button" onClick={copy} className="btn btn-primary btn-sm shrink-0">
        {copied ? <><Check className="h-3.5 w-3.5" /> Copied</> : <><Copy className="h-3.5 w-3.5" /> Get Coupon</>}
      </button>
    </motion.div>
  );
}
