import { useEffect, useRef, useState } from "react";
import LogoMain from "./Component/Layout/LogoMain";
import gsap from "gsap";
import HeroSection from "./Component/Layout/HeroSection";
import WelcomeSection from "./Component/Layout/WelcomeSection";
import NavBar from "./Component/Layout/NavBar";

function App() {
  const [loading, setLoading] = useState(true);
  const loadingRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      gsap.to(loadingRef?.current, {
        opacity: 0,
        duration: 2,
        ease: "power1.inOut",
        onComplete: () => {
          setLoading(false);
          console.log("loading selesai");
        },
      });
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <>
      <main className="bg-radial-[at_50%_-50%] from-darkBlue to-darkbgblue to-90% h-screen pr-[5px] ">
        <div
          ref={scrollerRef}
          className={`relative h-full custom-scrollbar ${
            loading ? "overflow-hidden" : "overflow-y-auto"
          }`}
        >
          {/* loading page awal */}
          <div className="absolute top-0 right-0 flex flex-col h-screen w-full gap-10 justify-center items-center">
            {loading && <LogoMain />}
          </div>
          {/* NavBar */}
          <NavBar scrollerRef={scrollerRef} />
          {/* welcome section */}
          <WelcomeSection />
          {/* hero section */}
          <HeroSection />
        </div>
      </main>
    </>
  );
}

export default App;
