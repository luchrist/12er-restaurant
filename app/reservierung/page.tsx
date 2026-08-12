"use client";

import { FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import config from "@/config/restaurant";

/** Parse "17:30 – 23:00 Uhr" into { start, end } */
function parseRange(range: string) {
  const cleaned = range.replace(/Uhr/gi, "").trim();
  const [start, end] = cleaned.split(/[–-]/).map((s) => s.trim());
  return { start, end };
}

/** Generate 30-min time slots between start and end (last slot 1h before close) */
function generateSlots(start: string, end: string): string[] {
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  const startMin = sh * 60 + sm;
  let endMin = eh * 60 + em;
  if (endMin <= startMin) endMin += 24 * 60;
  const lastSlot = endMin - 60;
  const slots: string[] = [];
  for (let m = startMin; m <= lastSlot; m += 30) {
    const h = Math.floor(m / 60) % 24;
    const min = m % 60;
    slots.push(`${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`);
  }
  return slots;
}

/** Get available time slots for a given date string (YYYY-MM-DD) */
function getSlotsForDate(dateStr: string): string[] | null {
  if (!dateStr) return null;
  const i = new Date(dateStr + "T00:00:00").getDay();
  const entry = config.openingHours.find((d) => d.dayIndices.includes(i));
  if (!entry || entry.hours === "Ruhetag" || /geschlossen/i.test(entry.hours)) return [];

  const ranges = entry.hours.split(",").map((r) => r.trim());
  const allSlots: string[] = [];
  for (const range of ranges) {
    const { start, end } = parseRange(range);
    if (start && end) allSlots.push(...generateSlots(start, end));
  }
  return allSlots;
}

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

export default function ReservierungPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);

  const timeSlots = useMemo(() => getSlotsForDate(selectedDate), [selectedDate]);
  const isClosed = timeSlots !== null && timeSlots.length === 0;
  const groupedHours = useMemo(() => groupHours(config.openingHours), []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    const data = {
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      date: fd.get("date"),
      time: fd.get("time"),
      guests: fd.get("guests"),
      message: fd.get("message"),
    };

    await fetch("/api/reservierung", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setLoading(false);
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-bone">
      {/* Header */}
      <header className="border-b border-ink/10">
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
          <a href="/" className="group flex items-center gap-3">
            <img
              src="/assets/logo-mark.png"
              alt={`${config.name} Logo`}
              className="h-20 w-auto md:h-28"
            />
            <span className="hidden font-display text-[18px] tracking-tight text-ink sm:block md:text-[20px]">
              {config.name}
            </span>
          </a>
          <a
            href="/"
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55 transition-colors hover:text-ink"
          >
            &larr; Zurück
          </a>
        </nav>
      </header>

      <div className="mx-auto max-w-[1400px] px-6 py-12 md:px-10 md:py-24">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          {/* Left label */}
          <div className="md:col-span-3">
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
              <span className="block h-[6px] w-[6px] rotate-45 bg-wald-500" />
              <span>Reservierung</span>
            </div>
          </div>

          {/* Heading */}
          <div className="md:col-span-9">
            <h1 className="break-words font-display text-[28px] leading-[1.05] tracking-tight text-ink sm:text-[36px] md:text-[58px] lg:text-[68px]">
              Ihr Tisch
              <br />
              <span className="italic text-wald-500">wartet.</span>
            </h1>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-16 md:mt-20 md:grid-cols-12">
          {/* Form */}
          <div className="md:col-span-7">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="break-words font-display text-[28px] tracking-tight text-ink md:text-[36px]">
                  Vielen Dank.
                </h2>
                <p className="mt-4 max-w-md text-[16px] leading-relaxed text-ink/70">
                  Wir haben Ihre Anfrage erhalten und melden uns in Kürze per
                  E-Mail oder Telefon zur Bestätigung.
                </p>
                <a
                  href="/"
                  className="mt-8 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.22em] text-wald-500 transition-colors hover:text-ink"
                >
                  &larr; Zur Startseite
                </a>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <Field label="Name" name="name" type="text" required />
                  <Field label="E-Mail" name="email" type="email" required />
                  <Field label="Telefon" name="phone" type="tel" required />
                  <div>
                    <label
                      htmlFor="guests"
                      className="mb-2 block font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55"
                    >
                      Personen
                    </label>
                    <input
                      id="guests"
                      name="guests"
                      type="number"
                      min={1}
                      defaultValue={2}
                      required
                      className="w-full border-b border-ink/20 bg-transparent py-3 font-display text-[16px] tracking-tight text-ink outline-none transition-colors focus:border-wald-500 md:text-[20px]"
                    />
                  </div>

                  {/* Date */}
                  <div>
                    <label
                      htmlFor="date"
                      className="mb-2 block font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55"
                    >
                      Datum
                    </label>
                    <input
                      id="date"
                      name="date"
                      type="date"
                      required
                      min={today}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full border-b border-ink/20 bg-transparent py-3 font-display text-[16px] tracking-tight text-ink outline-none transition-colors focus:border-wald-500 md:text-[20px]"
                    />
                    {isClosed && (
                      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-weinrot-500">
                        Ruhetag, bitte anderen Tag wählen
                      </p>
                    )}
                  </div>

                  {/* Time dropdown */}
                  <div>
                    <label className="mb-2 block font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
                      Uhrzeit
                    </label>
                    <select
                      name="time"
                      required
                      disabled={!timeSlots || isClosed}
                      className="w-full appearance-none border-b border-ink/20 bg-transparent py-3 font-display text-[16px] tracking-tight text-ink outline-none transition-colors focus:border-wald-500 disabled:text-ink/30 md:text-[20px]"
                    >
                      {!selectedDate ? (
                        <option value="">Zuerst Datum wählen</option>
                      ) : isClosed ? (
                        <option value="">&mdash;</option>
                      ) : (
                        <>
                          <option value="">&mdash;</option>
                          {timeSlots!.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot} Uhr
                            </option>
                          ))}
                        </>
                      )}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
                    Nachricht <span className="normal-case tracking-normal text-ink/35">(optional)</span>
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    className="w-full resize-none border-b border-ink/20 bg-transparent py-3 font-display text-[16px] tracking-tight text-ink outline-none transition-colors focus:border-wald-500 md:text-[20px]"
                    placeholder="Allergien, Anlass, besondere Wünsche ..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || isClosed}
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-wald-500 px-7 py-4 font-mono text-[12px] uppercase tracking-[0.22em] text-bone transition-transform active:scale-[0.98] disabled:opacity-60"
                >
                  <span className="relative z-10">
                    {loading ? "Wird gesendet ..." : "Reservierung anfragen"}
                  </span>
                  <span className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">
                    &rarr;
                  </span>
                  <span className="absolute inset-0 origin-left scale-x-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                </button>
              </form>
            )}
          </div>

          {/* Sidebar info */}
          <div className="md:col-span-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
              Öffnungszeiten
            </div>
            <ul className="mt-6 divide-y divide-ink/12">
              {groupedHours.map((row) => {
                const today2 = isTodayInIndices(row.dayIndices);
                return (
                  <li key={row.label} className="flex items-center justify-between gap-4 py-3">
                    <span className="flex shrink-0 items-center gap-2 font-display text-[18px] tracking-tight text-ink">
                      {today2 && (
                        <span className="block h-[6px] w-[6px] rounded-full bg-wald-500" />
                      )}
                      {row.label}
                    </span>
                    <span className="min-w-0 break-words text-right font-mono text-[11px] tracking-[0.05em] text-ink/55 sm:text-[12px]">
                      {row.hours}
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-12">
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
                Kontakt
              </div>
              <p className="mt-4 font-mono text-[13px] leading-relaxed text-ink/70">
                Für größere Gruppen oder kurzfristige Reservierungen
                rufen Sie uns gerne direkt an.
              </p>
              <a
                href={`tel:${config.contact.phone.replace(/\s/g, "")}`}
                className="mt-3 block break-all font-mono text-[14px] text-ink hover:text-wald-500"
              >
                {config.contact.phone}
              </a>
              {config.contact.email && (
                <a
                  href={`mailto:${config.contact.email}`}
                  className="mt-1 block break-all font-mono text-[14px] text-ink hover:text-wald-500"
                >
                  {config.contact.email}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  name,
  type,
  required,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full border-b border-ink/20 bg-transparent py-3 font-display text-[16px] tracking-tight text-ink outline-none transition-colors focus:border-wald-500 md:text-[20px]"
      />
    </div>
  );
}
