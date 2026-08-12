"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { type DishCarouselItem } from "@/lib/dish-carousel-data";

export function DishCarousel({ items }: { items: DishCarouselItem[] }) {
  const ref = useRef<HTMLDivElement>(null);

  const scrollToIndex = useCallback(
    (index: number) => {
      const el = ref.current;
      if (!el || items.length <= 1) return;
      const card = el.querySelector<HTMLElement>("[data-card]");
      const step = (card?.offsetWidth ?? 300) + 24;
      const next = (index + items.length) % items.length;
      el.scrollTo({ left: next * step, behavior: "smooth" });
    },
    [items.length]
  );

  const scroll = useCallback(
    (dir: -1 | 1) => {
      const el = ref.current;
      if (!el) return;
      const card = el.querySelector<HTMLElement>("[data-card]");
      const step = (card?.offsetWidth ?? 300) + 24;
      const current = Math.round(el.scrollLeft / step);
      scrollToIndex(current + dir);
    },
    [scrollToIndex]
  );

  useEffect(() => {
    if (items.length <= 1) return;
    const interval = setInterval(() => scroll(1), 4500);
    return () => clearInterval(interval);
  }, [items.length, scroll]);

  return (
    <section className="bg-bone py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/50">
              <span className="marker" />
              Aus der Küche
            </span>
            <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.2rem)] text-ink leading-tight tracking-tight">
              Handmade und bodenständig
            </h2>
          </div>
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll(-1)}
              aria-label="Zurück"
              className="h-11 w-11 rounded-full border border-ink/15 text-ink/60 hover:border-ink/40 hover:text-ink transition-all duration-200 flex items-center justify-center"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => scroll(1)}
              aria-label="Weiter"
              className="h-11 w-11 rounded-full border border-ink/15 text-ink/60 hover:border-ink/40 hover:text-ink transition-all duration-200 flex items-center justify-center"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M7 4L12 9L7 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={ref}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-2"
          style={{ scrollbarWidth: "none" }}
        >
          {items.map((dish) => (
            <div
              key={dish.name}
              data-card=""
              className="flex-none w-[80vw] md:w-[calc(33.333%-16px)] snap-start group"
            >
              <div className="overflow-hidden rounded-lg border border-ink/[0.08] h-full flex flex-col">
                <div className="relative h-72 overflow-hidden flex-none">
                  <Image
                    src={dish.image}
                    alt={dish.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 80vw, 33vw"
                  />
                </div>
                <div className="flex flex-col flex-1 p-5 bg-bone">
                  <h3 className="font-display text-xl text-ink leading-tight">{dish.name}</h3>
                  <p className="mt-2 text-sm text-ink/60 leading-relaxed flex-1">{dish.description}</p>
                  {dish.price && (
                    <p className="mt-4 font-mono text-sm text-ink/80">{dish.price}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-3 mt-6 md:hidden">
          <button
            onClick={() => scroll(-1)}
            aria-label="Zurück"
            className="h-10 w-10 rounded-full border border-ink/15 text-ink/60 flex items-center justify-center"
          >
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => scroll(1)}
            aria-label="Weiter"
            className="h-10 w-10 rounded-full border border-ink/15 text-ink/60 flex items-center justify-center"
          >
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M7 4L12 9L7 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
