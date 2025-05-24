import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import SplitText from "../element/SplitText";
import { Cat } from "lucide-react";

gsap.registerPlugin(useGSAP);

export default function LogoMain() {
  const iconRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      iconRef.current,
      {
        opacity: 0,
        scale: 0.5,
        x: 200,
      },
      {
        opacity: 1,
        duration: 0.5,
        scale: 1,

        ease: "power1.out",
      },
      0,
    )
      .to(iconRef.current, {
        x: 0,
        duration: 1,
        ease: "back.inOut",
      })
      .fromTo(
        iconRef.current,
        {
          rotate: -120,
        },
        {
          rotate: 0,
          duration: 2.5,
          ease: "back.out",
        },
        0,
      )
      .to(
        containerRef.current,
        {
          opacity: 0,
          duration: 1,
          ease: "power1.out",
        },
        "+=2.5",
      );
  }, []);

  return (
    <div ref={containerRef} className="flex items-center justify-center gap-4">
      {/* icon */}
      <Cat
        ref={iconRef}
        className="relative h-10 w-10 text-shineText md:h-14 md:w-14"
      />

      {/* text */}
      <SplitText
        textClassName="text-6xl font-mukta font-base"
        animationDuration={0.5}
        stagger={0.05}
        delay={1}
        ease="back.out"
      >
        LoneCatz
      </SplitText>
    </div>
  );
}
