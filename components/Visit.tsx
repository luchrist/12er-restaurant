"use client";

import { motion } from "framer-motion";
import config from "@/config/restaurant";

function isTodayInIndices(indices: number[]) {
  return indices.includes(new Date().getDay());
}

type HoursRow = { label: string; hours: string; dayIndices: number[] };

function groupHours(hours: typeof config.openingHours): HoursRow[] {
  const groups: HoursRow[] = [];
  let i = 0;
  while (i < hours.length) {
    let j = i + 1;
    while (j < hours.length && hours[j].hours === hours[i].hours) j++;
    const span = hours.slice(i, j);
    const dayIndices = span.flatMap((d) => d.dayIndices);
    const label =
      span.length === 1
        ? span[0].day
        : `${span[0].day.slice(0, 2)} – ${span[span.length - 1].day.slice(0, 2)}`;
    groups.push({ label, hours: span[0].hours, dayIndices });
    i = j;
  }
  return groups;
}

export function Visit() {
  const mobileRows = groupHours(config.openingHours);

  return (
    <section id="besuch" className="relative bg-bone py-32 md:py-44">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-3">
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
              <span className="marker" />
              <span>Besuch</span>
            </div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="break-words font-display text-[32px] leading-[1.05] tracking-tight text-ink sm:text-[40px] md:text-[64px] lg:text-[78px]">
              Tisch reservieren,
              <br />
              <span className="italic text-wald-500">einkehren.</span>
            </h2>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-12 gap-x-6 gap-y-16 md:gap-x-10">
          {/* Hours: grouped on mobile, full list on desktop */}
          <div className="col-span-12 md:col-span-7">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
              Öffnungszeiten
            </div>

            {/* Mobile: grouped */}
            <ul className="mt-6 divide-y divide-ink/12 md:hidden">
              {mobileRows.map((row) => {
                const today = isTodayInIndices(row.dayIndices);
                return (
                  <li
                    key={row.label}
                    className="flex items-center justify-between gap-4 py-4"
                  >
                    <span className="flex shrink-0 items-center gap-3 font-display text-[20px] tracking-tight text-ink">
                      {today && (
                        <motion.span
                          aria-label="Heute geöffnet"
                          className="block h-[7px] w-[7px] rounded-full bg-wald-500"
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity }}
                        />
                      )}
                      {row.label}
                    </span>
                    <span
                      className={`min-w-0 break-words text-right font-mono text-[11px] tracking-[0.05em] sm:text-[12px] ${
                        today ? "text-ink" : "text-ink/55"
                      }`}
                    >
                      {row.hours}
                    </span>
                  </li>
                );
              })}
            </ul>

            {/* Desktop: full list */}
            <ul className="mt-6 hidden divide-y divide-ink/12 md:block">
              {config.openingHours.map((d) => {
                const today = isTodayInIndices(d.dayIndices);
                return (
                  <li
                    key={d.day}
                    className="flex items-center justify-between py-4"
                  >
                    <span className="flex items-center gap-3 font-display text-[22px] tracking-tight text-ink">
                      {today && (
                        <motion.span
                          aria-label="Heute geöffnet"
                          className="block h-[7px] w-[7px] rounded-full bg-wald-500"
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity }}
                        />
                      )}
                      {d.day}
                    </span>
                    <span
                      className={`font-mono text-[13px] tracking-[0.05em] ${
                        today ? "text-ink" : "text-ink/55"
                      }`}
                    >
                      {d.hours}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact + Address */}
          <div className="col-span-12 md:col-span-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
              Adresse
            </div>
            <p className="mt-6 break-words font-display text-[24px] leading-tight tracking-tight text-ink sm:text-[28px] md:text-[34px]">
              {config.address.street}
              <br />
              {config.address.city}
              <br />
              <span className="text-ink/50">{config.address.country}</span>
            </p>

            <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
              <div className="min-w-0">
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/45">Telefon</div>
                <a
                  href={`tel:${config.contact.phone.replace(/\s/g, "")}`}
                  className="mt-2 block break-all font-mono text-[14px] text-ink hover:text-wald-500"
                >
                  {config.contact.phone}
                </a>
              </div>
              {config.contact.email && (
                <div className="min-w-0">
                  <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/45">E-Mail</div>
                  <a
                    href={`mailto:${config.contact.email}`}
                    className="mt-2 block break-all font-mono text-[14px] text-ink hover:text-wald-500"
                  >
                    {config.contact.email}
                  </a>
                </div>
              )}
              {config.contact.instagram && (
                <div className="min-w-0">
                  <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/45">Instagram</div>
                  <a
                    href={`https://instagram.com/${config.contact.instagram.replace("@", "")}`}
                    className="mt-2 block break-all font-mono text-[14px] text-ink hover:text-wald-500"
                  >
                    {config.contact.instagram}
                  </a>
                </div>
              )}
            </div>

            <a
              href="/reservierung"
              className="group relative mt-12 inline-flex items-center gap-3 overflow-hidden rounded-full bg-wald-500 px-7 py-4 font-mono text-[12px] uppercase tracking-[0.22em] text-bone transition-transform active:scale-[0.98]"
            >
              <span className="relative z-10">Tisch reservieren</span>
              <span className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">&rarr;</span>
              <span className="absolute inset-0 origin-left scale-x-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
