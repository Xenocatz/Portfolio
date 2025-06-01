import WelcomeSection from "../Component/Layout/home/WelcomeSection";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import HeroSection from "../Component/Layout/home/HeroSection";
import AboutSection from "../Component/Layout/home/AboutSection";
import ProjectSection from "../Component/Layout/home/ProjectSection";
import ContactSection from "../Component/Layout/home/ContactSection";

gsap.registerPlugin(useGSAP);
export default function Home() {
  return (
    <>
      <WelcomeSection />
      <main className="relative z-25 flex w-full flex-col items-center justify-center bg-background py-5">
        {/* section 1 - herosection */}
        <HeroSection />

        {/* section 2 - about*/}
        <AboutSection />

        {/* section 3 - project*/}
        <ProjectSection />

        {/* section 4 - contact*/}
        <ContactSection />
      </main>
    </>
  );
}
