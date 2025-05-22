import Lenis from "lenis";
import { create } from "zustand";

type ScrollStore = {
  lenis: Lenis | null;
  isScrollBar: string;
  setLenis: (lenis: Lenis) => void;
  openScrollBar: () => void;
  closeScrollBar: () => void;
};

export const useScrollStore = create<ScrollStore>((set, get) => ({
  lenis: null,
  isScrollBar: "overflow-hidden",

  setLenis: (lenis: Lenis) => set({ lenis }),
  openScrollBar: () => {
    set({ isScrollBar: "overflow-y-scroll" });
    const lenis = get().lenis;
    if (lenis) lenis.start();
  },
  closeScrollBar: () => {
    set({ isScrollBar: "overflow-hidden" });
    const lenis = get().lenis;
    if (lenis) lenis.stop();
  },
}));
