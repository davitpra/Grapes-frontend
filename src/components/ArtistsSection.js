import ArtistGrid from "./ArtistGrid";
import { useScroll, useTransform } from "framer-motion";

export function ArtistsSection() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [400, 700], [0, 1]);
  const y = useTransform(scrollY, [100, 700], [50, 0]);

  return (
    <section aria-labelledby="artists-heading" className="relative bg-black" id="artists">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 lg:pt-0">
        <h2
          id="artists-heading"
          className="flex pb-10 text-4xl font-bold tracking-tight text-white text-center pt-16"
        >
          Artists
        </h2>
        <ArtistGrid />
      </div>
    </section>
  );
}
