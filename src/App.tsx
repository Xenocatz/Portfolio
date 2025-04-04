import { useEffect, useRef, useState } from "react";
import LogoMain from "./Component/Layout/LogoMain";
import NavBar from "./Component/Layout/NavBar";
import Lenis from "lenis";
import { Outlet } from "react-router";
import gsap from "gsap";

function App() {
  const [isIntro, setIsIntro] = useState(
    sessionStorage.getItem("intro") !== "false"
  );
  const scrollerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem("intro") === null) {
      sessionStorage.setItem("intro", "true");
    }

    const timeout = setTimeout(() => {
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
            };
            rafId = requestAnimationFrame(raf);
          }
        },
      });
    }, 3000);

    let rafId: number;

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(rafId);
      lenisRef.current?.destroy();
    };
  }, []);

  console.log("isIntro : ", isIntro);

  return (
    <>
      <main className="bg-radial-[at_50%_-50%] from-darkBlue to-darkbgblue to-90% h-screen pr-[5px] ">
        <div
          ref={scrollerRef}
          className={`relative h-full custom-scrollbar ${
            isIntro ? "overflow-hidden" : "overflow-y-scroll"
          }`}
        >
          {isIntro ? (
            <div
              id="intro"
              className="absolute top-0 right-0 flex flex-col h-screen w-full gap-10 justify-center items-center"
            >
              <LogoMain />
            </div>
          ) : (
            <>
              <NavBar scrollerRef={scrollerRef} />
              <Outlet />
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
