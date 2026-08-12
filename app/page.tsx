import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { DishCarousel } from "@/components/DishCarousel";
import { dishCarouselItems } from "@/lib/dish-carousel-data";
import { Marquee } from "@/components/Marquee";
import { Storia } from "@/components/Storia";
import { Menu } from "@/components/Menu";
import { Reviews } from "@/components/Reviews";
import { Visit } from "@/components/Visit";
import { Galerie } from "@/components/Galerie";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <main style={{ overflowX: "clip" }}>
      <Navbar />
      <Hero />
      {dishCarouselItems.length >= 3 && <DishCarousel items={dishCarouselItems} />}
      <Marquee />
      <Storia />
      <Menu />
      <Reviews />
      <Visit />
      <Galerie />
      <Footer />
    </main>
  );
}
