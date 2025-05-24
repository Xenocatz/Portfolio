import Lenis from "lenis";
import { create } from "zustand";

type ScrollStore = {
  lenis: Lenis | null;
  setLenis: (lenis: Lenis) => void;
  openScrollBar: () => void;
  closeScrollBar: () => void;
};

export const useScrollStore = create<ScrollStore>((set, get) => ({
  lenis: null,

  setLenis: (lenis: Lenis) => set({ lenis }),

  openScrollBar: () => {
    const lenis = get().lenis;

    if (lenis) lenis.start();
    console.log("lenis: ", lenis);
  },

  closeScrollBar: () => {
    const lenis = get().lenis;
    if (lenis) lenis.stop();
    console.log("lenis: ", lenis);
  },
}));
