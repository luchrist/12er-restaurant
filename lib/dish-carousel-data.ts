export interface DishCarouselItem {
  name: string;
  description: string;
  price?: string;
  image: string;
  alt: string;
}

// Populated by the content pipeline when ≥3 dish photos are available.
// Keep empty to hide the section; add items to show it.
export const dishCarouselItems: DishCarouselItem[] = [
  {
    name: "Handmade Cordon bleu",
    description: "Paniertes Schnitzel, ehrlich gefüllt und in der Pfanne goldbraun gebraten. Dazu Pommes und ein Stück Zitrone.",
    image: "/assets/acquisition/dishes/schnitzel-mit-pommes-und-zitrone-01.jpg",
    alt: "Paniertes Schnitzel mit Pommes und Zitronenscheiben",
  },
  {
    name: "Jägerschnitzel",
    description: "Paniertes Schnitzel mit Champignons und cremiger Rahmsauce, dazu Pommes frites.",
    image: "/assets/acquisition/dishes/schnitzel-mit-pommes-und-rahmsauce-01.jpg",
    alt: "Schnitzel mit Rahmsauce und Pommes",
  },
  {
    name: "Knoblauchgarnelen",
    description: "In Öl gebratene Garnelen mit Kirschtomaten und Knoblauch, serviert mit frischem Brot zum Tunken.",
    image: "/assets/acquisition/dishes/knoblauchgarnelen-mit-brot-01.jpg",
    alt: "Knoblauchgarnelen mit Brot",
  },
  {
    name: "Entenkeule",
    description: "Knusprig gebratene Entenkeule mit Kartoffelklößen und dunkler Sauce. Ein Klassiker aus der Küche.",
    image: "/assets/acquisition/dishes/entenkeule-mit-kloen-und-soe-01.jpg",
    alt: "Entenkeule mit Klößen und dunkler Sauce",
  },
  {
    name: "Bratkartoffeln mit Zwiebelfleisch",
    description: "Goldbraune Bratkartoffeln und ein saftiges Stück Fleisch mit Röstzwiebeln, gekrönt von einem Stück Butter.",
    image: "/assets/acquisition/dishes/bratkartoffeln-mit-zwiebelfleisch-01.jpg",
    alt: "Bratkartoffeln mit Zwiebelfleisch und Röstzwiebeln",
  },
];
