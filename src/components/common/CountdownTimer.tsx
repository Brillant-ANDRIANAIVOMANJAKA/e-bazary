import { useEffect, useState } from "react";

function pad(n: number) { return n.toString().padStart(2, "0"); }

export function CountdownTimer({ targetMs = 1000 * 60 * 60 * 12 }: { targetMs?: number }) {
  const [end] = useState(() => Date.now() + targetMs);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const diff = Math.max(0, end - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  const cells = [
    { v: pad(days), l: "DAYS" },
    { v: pad(hours), l: "HRS" },
    { v: pad(mins), l: "MIN" },
    { v: pad(secs), l: "SEC" },
  ];

  return (
    <div className="flex items-center gap-1.5 sm:gap-2" role="timer" aria-label="Offer ends in">
      {cells.map((c) => (
        <div key={c.l} className="flex h-11 w-11 flex-col sm:h-12 sm:w-12 items-center justify-center rounded bg-primary text-primary-foreground">
          <span className="text-base font-bold leading-none tabular-nums">{c.v}</span>
          <span className="mt-0.5 text-[9px] opacity-70">{c.l}</span>
        </div>
      ))}
    </div>
  );
}
