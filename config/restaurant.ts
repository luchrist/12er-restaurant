// Bridge file: re-exports factory-generated data in the shape components expect.
// The factory writes lib/restaurant.ts, lib/reviews-data.ts, and lib/menu-data.ts.
// This file maps those into a single config object so component imports stay clean.

import { restaurant } from "@/lib/restaurant";
import { reviewsData } from "@/lib/reviews-data";
import { menuCategories } from "@/lib/menu-data";

export type OpeningHoursEntry = {
  day: string;
  hours: string;
  /** JS Date.getDay() indices (0 = Sonntag … 6 = Samstag) this row covers. */
  dayIndices: number[];
};

export type ReviewExcerpt = {
  name: string;
  rating: number;
  date: string;
  text: string;
};

export type MenuItemConfig = {
  name: string;
  description: string;
  price: string;
};

export type MenuCategoryConfig = {
  category: string;
  subtitle: string;
  items: MenuItemConfig[];
};

export type RestaurantConfigBridge = {
  name: string;
  tagline: string;
  intro: string;
  address: {
    street: string;
    city: string;
    country: string;
  };
  contact: {
    phone: string;
    email: string;
    instagram: string;
  };
  openingHours: OpeningHoursEntry[];
  reviews: {
    rating: number;
    count: number;
    source: string;
    excerpts: ReviewExcerpt[];
  };
  menu: MenuCategoryConfig[];
  socialMedia: typeof restaurant.socialMedia;
  legal: typeof restaurant.legal;
  mapsUrl: string;
};

const config: RestaurantConfigBridge = {
  name: restaurant.name,
  tagline: restaurant.tagline,
  intro: "12er Restaurant an der Maaraue in Wiesbaden. Gutbürgerliche Küche mit Handschrift: handmade Cordon bleu, der beliebte 12er Salat und ein gespritzter Apfelwein auf der Terrasse direkt am Sportplatz.",
  address: {
    street: restaurant.address.street,
    city: restaurant.address.cityLine,
    country: "Deutschland",
  },
  contact: {
    phone: restaurant.phone,
    email: restaurant.email,
    instagram: restaurant.socialMedia.hidden.instagram
      ? ""
      : restaurant.socialMedia.instagram,
  },
  openingHours: restaurant.hours.map((h) => {
    // Parse out which German weekdays appear in the verbose label
    // (e.g. "Montag, Dienstag, Mittwoch, Donnerstag & Freitag" → Mo–Fr).
    // Mo-first ordering for contiguity detection; JS getDay() indices for matching.
    const NAMES = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];
    const SHORT = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
    const JS_INDEX = [1, 2, 3, 4, 5, 6, 0]; // map Mo-first slot → JS getDay()

    const present = NAMES.map((name, i) => (h.day.includes(name) ? i : -1)).filter((i) => i >= 0);
    const dayIndices = present.map((i) => JS_INDEX[i]);

    let label: string;
    if (present.length === 0) {
      label = h.day;
    } else if (present.length === 1) {
      label = h.day; // single day — keep the original (e.g. "Samstag")
    } else {
      // Contiguous (e.g. [0,1,2,3,4] = Mo–Fr) → range. Otherwise list.
      const contiguous = present.every((v, idx) => idx === 0 || v === present[idx - 1] + 1);
      label = contiguous
        ? `${SHORT[present[0]]} – ${SHORT[present[present.length - 1]]}`
        : present.map((i) => SHORT[i]).join(", ");
    }

    return {
      day: label,
      hours: h.closed ? "Ruhetag" : h.time,
      dayIndices,
    };
  }),
  reviews: {
    rating: reviewsData.overallRating,
    count: reviewsData.totalRatings,
    source: "Google",
    excerpts: reviewsData.reviews.map((r) => ({
      name: r.author,
      rating: r.rating,
      date: r.time,
      text: r.text,
    })),
  },
  menu: menuCategories.map((c) => ({
    category: c.label,
    subtitle: c.intro || "",
    items: c.items.map((i) => ({
      name: i.name,
      description: i.description || "",
      price: i.price,
    })),
  })),
  socialMedia: restaurant.socialMedia,
  legal: restaurant.legal,
  mapsUrl: restaurant.mapsUrl,
};

export default config;
