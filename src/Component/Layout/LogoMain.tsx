import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { Cat } from "lucide-react";
import { SplitText } from "gsap/all";

gsap.registerPlugin(useGSAP);

export default function LogoMain() {
  const iconRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.fromTo(
        iconRef.current,
        {
          autoAlpha: 0,
          y: 10,
          scale: 0.5,
        },
        {
          autoAlpha: 1,
          y: -5,
          scale: 1.2,
          duration: 1.5,
          ease: "back.inOut",
        },
        "navItems+=0.5",
      ).to(
        iconRef.current,
        {
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "back.inOut",
        },
        "navItems+=1",
      );

      SplitText.create("#logo", {
        type: "chars",
        autoSplit: true,
        onSplit: (self) => {
          gsap.from(self.chars, {
            delay: 2,
            opacity: 0,
            y: 10,
            duration: 0.5,
            ease: "back.out",
            stagger: 0.05,
            onComplete: () => {
              self.revert();
            },
          });
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="flex items-center justify-center gap-4">
      {/* icon */}
      <Cat
        ref={iconRef}
        className="relative h-10 w-10 text-shineText md:h-14 md:w-14"
      />

      {/* text */}
      <p id="logo" className="text-2xl font-semibold text-text md:text-4xl">
        LoneCatz
      </p>
    </div>
  );
}
