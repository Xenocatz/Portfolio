import { useEffect, useRef, useState } from "react";
import LogoMain from "./Component/Layout/LogoMain";
import NavBar from "./Component/Layout/NavBar";
import Lenis from "lenis";
import { Outlet } from "react-router";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useScrollStore } from "./store/scrollStore";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const isScrollBar = useScrollStore((state) => state.isScrollBar);
  const setLenis = useScrollStore((state) => state.setLenis);

  const [isIntro, setIsIntro] = useState(
    sessionStorage.getItem("intro") !== "false",
  );
  const scrollerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem("intro") === null) {
      sessionStorage.setItem("intro", "true");
    }

    if (!scrollerRef.current) return;

    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.1,
      wrapper: scrollerRef.current,
    });

    setLenis(lenis);
    lenisRef.current = lenis;
    lenis.stop();

    ScrollTrigger.scrollerProxy(scrollerRef.current, {
      scrollTop(value) {
        if (value !== undefined) {
          lenis.scrollTo(value);
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: scrollerRef.current.style.transform ? "transform" : "fixed",
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      ScrollTrigger.update();
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    gsap.to("#intro", {
      opacity: 0,
      duration: 0.5,
      delay: 2.5,
      onComplete: () => {
        sessionStorage.setItem("intro", "false");
        setIsIntro(false);
        lenis.start();
        ScrollTrigger.refresh();
      },
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <main
      ref={scrollerRef}
      className={`custom-scrollbar relative h-screen bg-background pr-[5px] ${
        isIntro ? "overflow-hidden" : isScrollBar
      }`}
    >
      <div className="relative h-full">
        {isIntro ? (
          <div
            id="intro"
            className="absolute top-0 right-0 flex h-screen w-full flex-col items-center justify-center gap-10"
          >
            <LogoMain />
          </div>
        ) : (
          <>
            <NavBar />
            <Outlet context={{ scrollerRef }} />
          </>
        )}
      </div>
    </main>
  );
}

export default App;
