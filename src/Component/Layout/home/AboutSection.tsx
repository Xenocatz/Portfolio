import { PawPrint } from "lucide-react";
import BgNightOcean from "../../element/BgNightOcean";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);
export default function AboutSection() {
  const containerTextRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!containerTextRef.current) return;
      gsap.from("#line", {
        scaleY: 0,
        duration: 2,
        ease: "power3.inOut",
        transformOrigin: "top",
        scrollTrigger: {
          trigger: containerTextRef.current,
          start: "80% bottom",
        },
      });

      SplitText.create(".font-base", {
        type: "words",
        autoSplit: true,
        reduceWhiteSpace: true,
        smartWrap: true,
        onSplit: (self) => {
          return gsap.from(self.words, {
            autoAlpha: 0.5,
            y: 10,
            stagger: 0.1,
            ease: "back.inOut",
            scrollTrigger: {
              trigger: containerTextRef.current,
              start: "top bottom",
              end: "80% center",
              scrub: 2,
            },
          });
        },
      });
    },
    { scope: containerTextRef },
  );

  return (
    <section className="mt-10 flex w-full flex-col items-start justify-center p-5 font-mukta text-text sm:mt-35 sm:px-50">
      <div>
        <h3 className="highlight-text font-base mb-5 flex items-center gap-3 font-mukta text-xl text-shineText/90 sm:text-2xl">
          <PawPrint className="w-5 text-shineText sm:w-7" />
          <span>about me</span>
        </h3>
      </div>
      <div className="flex w-full flex-col overflow-hidden rounded-r-lg shadow-2xl sm:flex-row">
        {/* text kiri */}
        <div
          ref={containerTextRef}
          className="relative flex flex-1 flex-col items-center justify-center rounded-r-lg px-5 py-5"
        >
          <div
            id="line"
            className="absolute top-0 left-0 h-full border-l-2 border-text/80"
          ></div>
          <p className="font-base sm:max-w-full sm:text-2xl sm:tracking-wide">
            Currently, I’m a 4th-semester Informatics Engineering student at
            Universitas Pamulang, continuously learning and building my way
            through the world of tech — one line of code at a time.
          </p>
          <p className="font-base mt-5 sm:mt-10 sm:max-w-full sm:text-2xl sm:tracking-wide">
            I turn ideas into interactive web experiences that feel natural and
            just make sense. With a strong foundation in front-end development
            and a love for crafting seamless user interfaces, I’m always
            exploring new ways to build web solutions that are fast, responsive,
            and easy to use. I enjoy working across the stack, especially with
            HTML, CSS, JavaScript, and React, while always keeping the user’s
            experience at heart.
          </p>
        </div>
        {/* gambar kanan */}
        <div className="bg-tranparent relative flex-1 rounded-l-lg">
          <BgNightOcean />
        </div>
      </div>
    </section>
  );
}
