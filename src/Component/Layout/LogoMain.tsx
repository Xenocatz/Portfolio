import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import SplitText from "../element/SplitText";

gsap.registerPlugin(useGSAP);

export default function LogoMain() {
  const iconRef = useRef<HTMLImageElement>(null);
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
      0
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
        0
      )
      .to(
        containerRef.current,
        {
          opacity: 0,
          duration: 1,
          ease: "power1.out",
        },
        "+=2.5"
      );
  }, []);

  return (
    <div ref={containerRef} className="flex gap-4 justify-center items-center">
      {/* icon */}
      <img
        ref={iconRef}
        className="relative w-30 h-30"
        src="/logoCat.png"
        alt="icon"
      />

      {/* text */}
      <SplitText
        textClassName="text-6xl font-mukta font-base"
        animationDuration={0.5}
        stagger={0.1}
        delay={1}
        ease="back.out"
      >
        LoneCatz
      </SplitText>
    </div>
  );
}
