import { Link } from "react-router-dom";
import { Truck, ShieldCheck, Gift, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: Truck, title: "Free Delivery", text: "On Orders Over Ar 4900", to: "/page/shipping" },
  { icon: ShieldCheck, title: "Order Protection", text: "Secured Information", to: "/page/privacy" },
  { icon: Gift, title: "Promotion Gift", text: "Special Offers!", to: "/page/help" },
  { icon: RefreshCw, title: "Money Back", text: "Return over 30 Days", to: "/page/returns" },
];

export function FeatureStrip() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {features.map((f, i) => (
        <motion.div
          key={f.title}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          whileHover={{ y: -2 }}
        >
          <Link
            to={f.to}
            className="group flex h-full items-center gap-3 rounded-md border border-border bg-card p-4 transition hover:border-brand hover:shadow-lg"
          >
            <f.icon className="h-8 w-8 shrink-0 text-brand transition-transform group-hover:scale-110" />
            <div>
              <p className="text-sm font-bold group-hover:text-brand">{f.title}</p>
              <p className="text-xs text-muted-foreground">{f.text}</p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
