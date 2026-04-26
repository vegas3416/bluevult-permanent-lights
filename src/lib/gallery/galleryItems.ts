import heroImg from "@/assets/hero-lighting.jpg";
import outdoorImg from "@/assets/services-outdoor.jpg";

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
};

/**
 * Curated gallery images shipped with the site. Add more imports + entries as you get
 * permission to publish project photos. Facebook / Google albums are linked separately
 * on the Gallery page (no automatic sync without a backend + Meta API).
 */
export const GALLERY_ITEMS: GalleryItem[] = [
  {
    src: heroImg,
    alt: "Home with permanent roofline LED lighting at dusk",
    caption: "Roofline permanent LED — evening look",
  },
  {
    src: outdoorImg,
    alt: "Outdoor architectural and landscape lighting on a residential home",
    caption: "Outdoor lighting — curb appeal",
  },
];
