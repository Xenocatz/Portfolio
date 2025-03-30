import { useEffect, useRef, useState } from "react";
import LogoMain from "./Component/Layout/LogoMain";
import gsap from "gsap";
import Home from "./page/Home";
import NavBar from "./Component/Layout/NavBar";
import Lenis from "lenis";

function App() {
  const [loading, setLoading] = useState(true);
  const loadingRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      gsap.to(loadingRef?.current, {
        opacity: 0,
        duration: 2,
        ease: "power1.inOut",
        onComplete: () => {
          setLoading(false);
          if (scrollerRef.current) {
            let lenis = lenisRef.current;
            lenis = new Lenis({
              smoothWheel: true,
              lerp: 0.1,
              wrapper: scrollerRef.current,
            });

            function raf(time: number) {
              lenis?.raf(time);
              requestAnimationFrame(raf);
            }
            requestAnimationFrame(raf);
          }
        },
      });
    }, 2000);
    return () => {
      clearTimeout(timeout);
      lenisRef.current?.destroy();
    };
  }, []);

  return (
    <>
      <main className="bg-radial-[at_50%_-50%] from-darkBlue to-darkbgblue to-90% h-screen pr-[5px] ">
        <div
          ref={scrollerRef}
          className={`relative h-full custom-scrollbar ${
            loading ? "overflow-hidden" : "overflow-y-scroll"
          }`}
        >
          {/* loading page awal */}
          <div className="absolute top-0 right-0 flex flex-col h-screen w-full gap-10 justify-center items-center">
            {loading && <LogoMain />}
          </div>
          {/* NavBar */}
          <NavBar scrollerRef={scrollerRef} />
          {/* Home */}
          <Home />
        </div>
      </main>
    </>
  );
}

export default App;
