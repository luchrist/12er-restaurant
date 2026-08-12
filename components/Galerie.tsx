import { galleryItems } from "@/lib/gallery-data";

const fallbackImages = [
  { src: "/assets/gallery-1.webp", alt: "Rustikaler Gastraum mit Holztischen und Bar" },
  { src: "/assets/gallery-2.webp", alt: "Außenansicht des Gebäudes mit gemütlichem Außenbereich" },
  { src: "/assets/gallery-3.webp", alt: "Klassisches Gericht aus der Küche" },
  { src: "/assets/gallery-4.webp", alt: "Schnitzel mit Pommes frites" },
  { src: "/assets/gallery-5.webp", alt: "Bratkartoffeln mit Zwiebelfleisch" },
];

const images = galleryItems.length >= 5 ? galleryItems.slice(0, 5) : fallbackImages;

export function Galerie() {
  return (
    <section className="bg-creme py-32 md:py-44">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-3">
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
              <span className="marker" />
              <span>Einblicke</span>
            </div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="break-words font-display text-[32px] leading-[1.05] tracking-tight text-ink sm:text-[40px] md:text-[64px] lg:text-[78px]">
              Von der Terrasse
              <br />
              <span className="italic text-wald-500">an den Tisch.</span>
            </h2>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-12 gap-4 md:gap-6">
          {/* Large image: 7 cols, spans 2 rows */}
          <div className="col-span-12 md:col-span-7 md:row-span-2">
            <div className="group relative aspect-[4/3] overflow-hidden rounded-sm bg-ink/5 md:aspect-auto md:h-full">
              <img
                src={images[0].src}
                alt={images[0].alt}
                className="h-full w-full object-cover transition-transform duration-700 ease-out md:group-hover:scale-[1.03]"
              />
            </div>
          </div>

          {/* Right top image */}
          <div className="col-span-12 md:col-span-5">
            <div className="group relative aspect-[3/2] overflow-hidden rounded-sm bg-ink/5">
              <img
                src={images[1].src}
                alt={images[1].alt}
                className="h-full w-full object-cover transition-transform duration-700 ease-out md:group-hover:scale-[1.03]"
              />
            </div>
          </div>

          {/* Right bottom image */}
          <div className="col-span-12 md:col-span-5">
            <div className="group relative aspect-[3/2] overflow-hidden rounded-sm bg-ink/5">
              <img
                src={images[2].src}
                alt={images[2].alt}
                className="h-full w-full object-cover transition-transform duration-700 ease-out md:group-hover:scale-[1.03]"
              />
            </div>
          </div>

          {/* Bottom row: 2 equal images */}
          {images.slice(3).map((img) => (
            <div
              key={img.src}
              className="col-span-6 md:col-span-6"
            >
              <div className="group relative aspect-[3/2] overflow-hidden rounded-sm bg-ink/5">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out md:group-hover:scale-[1.03]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
