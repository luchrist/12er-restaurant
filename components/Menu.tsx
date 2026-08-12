"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import config from "@/config/restaurant";

export function Menu() {
  const categories = config.menu;
  const [active, setActive] = useState(0);
  const current = categories[active];

  if (!categories.length) return null;

  return (
    <section id="speisekarte" className="relative bg-ink py-32 text-bone md:py-44">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-3">
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-bone/55">
              <span className="block h-[6px] w-[6px] rounded-full bg-wald-400" />
              <span>Speisekarte</span>
            </div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="break-words font-display text-[32px] leading-[1.05] tracking-tight sm:text-[40px] md:text-[64px] lg:text-[78px]">
              Gutbürgerlich.
              <span className="italic text-messing-300"> Handmade.</span>
              <br />
              Herzlich.
            </h2>
          </div>
        </div>

        {/* Category rail */}
        <div className="mt-20 flex flex-wrap items-end gap-x-6 gap-y-4 border-b border-bone/15 pb-6 md:gap-x-10">
          {categories.map((c, i) => {
            const isActive = i === active;
            return (
              <button
                key={c.category}
                onClick={() => setActive(i)}
                className="group relative flex items-baseline gap-2 pb-2 transition-opacity md:gap-3"
              >
                <span
                  className={`font-mono text-[11px] tracking-[0.22em] transition-colors ${
                    isActive ? "text-messing-400" : "text-bone/40"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`font-display text-[18px] tracking-tight transition-colors md:text-[28px] ${
                    isActive ? "text-bone" : "text-bone/45 group-hover:text-bone/80"
                  }`}
                >
                  {c.category}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="menu-underline"
                    className="absolute -bottom-[7px] left-0 right-0 h-[2px] bg-messing-500"
                    transition={{ type: "spring", stiffness: 220, damping: 28 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Items */}
        <div className="mt-12 grid grid-cols-12 gap-x-10 gap-y-12">
          <div className="col-span-12 md:col-span-3">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone/45">
              {String(active + 1).padStart(2, "0")} / {String(categories.length).padStart(2, "0")}
            </div>
            <p className="mt-4 break-words font-display text-[24px] leading-tight tracking-tight sm:text-[28px] md:text-[34px]">
              {current.subtitle}
            </p>
          </div>

          <div className="col-span-12 md:col-span-9">
            <AnimatePresence mode="wait">
              <motion.ul
                key={current.category}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
                }}
                className="divide-y divide-bone/10"
              >
                {current.items.map((item) => (
                  <motion.li
                    key={item.name}
                    variants={{
                      hidden: { opacity: 0, y: 14 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { type: "spring", stiffness: 130, damping: 22 }
                      }
                    }}
                    className="grid grid-cols-12 items-baseline gap-4 py-7"
                  >
                    <h3 className="col-span-12 break-words font-display text-[20px] tracking-tight text-bone sm:text-[22px] md:col-span-4 md:text-[26px]">
                      {item.name}
                    </h3>
                    <p className="col-span-12 max-w-[60ch] text-[14px] leading-relaxed text-bone/55 md:col-span-7">
                      {item.description}
                    </p>
                    <span className="col-span-12 font-mono text-[14px] tracking-[0.05em] text-messing-300 md:col-span-1 md:text-right">
                      {item.price}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
