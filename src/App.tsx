import { useState } from "react";
import LogoMain from "./Component/Layout/LogoMain";
import NavBar from "./Component/Layout/NavBar";
import { Outlet } from "react-router";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function App() {
  const [isIntro, setIsIntro] = useState(
    sessionStorage.getItem("intro") !== "false",
  );

  useGSAP(() => {
    ScrollSmoother.create({
      smooth: 1,
      effects: true,
    });

    if (sessionStorage.getItem("intro") === null) {
      sessionStorage.setItem("intro", "true");
    }

    if (!isIntro) return;
    gsap.to("#intro", {
      duration: 0.5,
      delay: 2.5,
      onComplete: () => {
        sessionStorage.setItem("intro", "false");
        setIsIntro(false);
      },
    });
  }, []);

  return (
    <>
      {!isIntro && <NavBar />}
      <main id="smooth-wrapper" className="relative overflow-hidden">
        <div id="smooth-content" className="relative overflow-hidden">
          {isIntro ? (
            <div
              id="intro"
              className="absolute top-0 right-0 flex h-screen w-full items-center justify-center bg-background"
            >
              <LogoMain />
            </div>
          ) : (
            <>
              <Outlet />
            </>
          )}
        </div>
      </main>
      <div className="fixed bottom-0 left-0 h-10 w-full bg-gradient-to-b from-transparent to-background"></div>
    </>
  );
}

export default App;
