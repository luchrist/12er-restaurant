"use client";

import { motion } from "framer-motion";

const words = [
  "Cordon bleu",
  "12er Salat",
  "Bratkartoffeln",
  "Apfelweinschorle",
  "Handmade",
  "Terrasse am Sportplatz",
  "Herzlicher Service",
  "Direkt an der Maaraue"
];

export function Marquee() {
  const row = [...words, ...words];
  return (
    <section className="relative border-y border-ink/10 bg-bone py-8" style={{ overflow: "clip" }}>
      <motion.div
        className="flex w-max gap-16 whitespace-nowrap pr-16 will-change-transform"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 38, ease: "linear", repeat: Infinity }}
      >
        {row.map((w, i) => (
          <span
            key={i}
            className="flex items-center gap-6 font-display text-[42px] leading-none tracking-tight text-ink/85 md:text-[64px]"
          >
            {w}
            <span className="block h-2 w-2 rounded-full bg-messing-500" />
          </span>
        ))}
      </motion.div>
    </section>
  );
}
