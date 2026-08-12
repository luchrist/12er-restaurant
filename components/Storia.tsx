"use client";

import { motion } from "framer-motion";
import config from "@/config/restaurant";

const chapters = [
  {
    n: "01",
    title: "Gutbürgerlich mit Handschrift",
    body: "Cordon bleu, gut gefüllt und wirklich handmade. Der 12er Salat mit Hähnchenbrust und zarten Rindfleischstreifen. Schnitzel, Bratkartoffeln, Rahmsaucen. Küche, die nach etwas schmeckt und ein sehr gutes Preis-Leistungs-Verhältnis liefert."
  },
  {
    n: "02",
    title: "Direkt am Sportplatz Maaraue",
    body: "Gegenüber dem Freibad, mitten auf der Maaraue. Auf der Terrasse läuft an lauen Abenden Musik aus den 70ern und 80ern, im Sommer gibt es live Fußball, allerdings auf dem Platz, nicht im TV."
  },
  {
    n: "03",
    title: "Herzlich, kinderfreundlich, entspannt",
    body: "Kinderstühle, Kinderbesteck und Malsachen ohne Nachfragen. Gastgeberinnen und Gastgeber, die mitdenken, Sonderwünsche unkompliziert aufnehmen und zügig servieren. Ein Ort, an dem man gern regelmäßig für eine Kleinigkeit und ein frisches Bier vorbeikommt."
  }
];

export function Storia() {
  return (
    <section id="geschichte" className="relative bg-creme py-32 md:py-44">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Section header */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="md:col-span-3">
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
              <span className="marker" />
              <span>Geschichte</span>
            </div>
          </div>
          <div className="md:col-span-9">
            <h2 className="break-words font-display text-[32px] leading-[1.05] tracking-tight text-ink sm:text-[40px] md:text-[64px] lg:text-[78px]">
              Ehrliche Küche,
              <br />
              <span className="italic text-wald-500">herzlicher</span> Service.
            </h2>
            <p className="mt-8 max-w-[58ch] text-[17px] leading-relaxed text-ink/65">
              Das 12er Restaurant ist der Treffpunkt an der Maaraue in Wiesbaden. Gutbürgerlich gekocht, freundlich und flott serviert, mit Terrasse gegenüber dem Freibad und einer Karte, die Stammgäste seit Jahren wiederkommen lässt.
            </p>
          </div>
        </div>

        {/* Chapters */}
        <div className="mt-24 grid grid-cols-1 gap-x-12 gap-y-20 md:grid-cols-12">
          {chapters.map((ch, i) => (
            <motion.div
              key={ch.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ type: "spring", stiffness: 100, damping: 22, delay: i * 0.08 }}
              className={
                i === 0
                  ? "md:col-span-7 md:col-start-2"
                  : i === 1
                  ? "md:col-span-5 md:col-start-7"
                  : "md:col-span-6 md:col-start-3"
              }
            >
              <div className="flex items-baseline gap-4 border-t border-ink/15 pt-6">
                <span className="font-mono text-[12px] tracking-[0.2em] text-messing-500">
                  {ch.n}
                </span>
                <h3 className="break-words font-display text-[24px] leading-tight tracking-tight text-ink sm:text-[26px] md:text-[32px]">
                  {ch.title}
                </h3>
              </div>
              <p className="mt-4 max-w-[44ch] text-[15px] leading-relaxed text-ink/60">
                {ch.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
