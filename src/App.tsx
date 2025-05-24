import { useEffect, useRef, useState } from "react";
import LogoMain from "./Component/Layout/LogoMain";
import NavBar from "./Component/Layout/NavBar";
import { Outlet } from "react-router";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useScrollStore } from "./store/scrollStore";
import ReactLenis, { LenisRef, useLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const setLenis = useScrollStore((state) => state.setLenis);

  const [isIntro, setIsIntro] = useState(
    sessionStorage.getItem("intro") !== "false",
  );
  // ref
  const lenisRef = useRef<LenisRef | null>(null);

  useLenis((lenis) => {
    setLenis(lenis);
  });

  useEffect(() => {
    if (sessionStorage.getItem("intro") === null) {
      sessionStorage.setItem("intro", "true");
    }

    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    gsap.to("#intro", {
      duration: 0.5,
      delay: 2.5,
      onComplete: () => {
        sessionStorage.setItem("intro", "false");
        lenisRef.current?.lenis?.start();
        setIsIntro(false);
      },
    });

    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <>
      <ReactLenis root options={{ autoRaf: false, lerp: 0.1 }} ref={lenisRef} />
      <main className="relative bg-background">
        <div className="relative">
          {isIntro ? (
            <div
              id="intro"
              className="absolute top-0 right-0 flex h-screen w-full items-center justify-center bg-background"
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
