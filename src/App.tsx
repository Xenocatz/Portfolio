import { useEffect, useRef, useState } from "react";
import LogoMain from "./Component/Layout/LogoMain";
import NavBar from "./Component/Layout/NavBar";
import Lenis from "lenis";
import { Outlet } from "react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

function App() {
  const [isIntro, setIsIntro] = useState(
    sessionStorage.getItem("intro") !== "false",
  );
  const scrollerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem("intro") === null) {
      sessionStorage.setItem("intro", "true");
    }

    let rafId: number;

    sessionStorage.setItem("intro", "false");
    gsap.to("#intro", {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        setIsIntro(false);
        if (scrollerRef.current) {
          lenisRef.current = new Lenis({
            smoothWheel: true,
            lerp: 0.1,
            wrapper: scrollerRef.current,
          });
          const lenis = lenisRef.current;

          const raf = (time: number) => {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
            ScrollTrigger.refresh();
          };
          rafId = requestAnimationFrame(raf);
        }
      },
    });
    return () => {
      cancelAnimationFrame(rafId);
      lenisRef.current?.destroy();
    };
  }, []);

  return (
    <>
      <main
        ref={scrollerRef}
        className={`custom-scrollbar h-screen bg-background pr-[5px] ${
          isIntro ? "overflow-hidden" : "overflow-y-scroll"
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
              <Outlet />
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
