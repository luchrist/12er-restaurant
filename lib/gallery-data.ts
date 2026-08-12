export interface GalleryItem {
  src: string;
  alt: string;
}

// Populated by the content pipeline from /assets/acquisition/restaurant and /assets/acquisition/dishes.
// Exactly 5 items are required to render the curated gallery; an empty array falls back to template defaults.
export const galleryItems: GalleryItem[] = [
  {
    src: "/assets/acquisition/restaurant/gedeckter-tisch-im-restaurant-01.jpg",
    alt: "Gedeckter Tisch mit Gerichten und Getränken auf der Terrasse",
  },
  {
    src: "/assets/acquisition/restaurant/restaurant-auenansicht-mit-terrasse-02.jpg",
    alt: "Außenansicht des 12er Restaurants mit Terrasse und Sonnenschirmen",
  },
  {
    src: "/assets/acquisition/restaurant/uberdachte-restaurant-terrasse-01.jpg",
    alt: "Überdachte Terrasse mit Tischen und Stühlen, umgeben von Grün",
  },
  {
    src: "/assets/acquisition/restaurant/schnitzel-mit-pommes-und-bier-01.jpg",
    alt: "Schnitzel mit Pommes, Röstzwiebeln und einem Glas Weißbier auf dem Holztisch",
  },
  {
    src: "/assets/acquisition/dishes/hahnchen-mit-pilzen-und-bratkartoffeln-01.jpg",
    alt: "Hähnchen mit Pilzen, Bratkartoffeln und frischem Salat",
  },
];
