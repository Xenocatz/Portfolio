import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import NightCity from "../parallax/NightCity";
import Midnight from "../parallax/Midnight";
import UnderWater from "../parallax/Underwater";

gsap.registerPlugin(useGSAP);
export default function WelcomeSection() {
  const nightCityRef = useRef<HTMLDivElement>(null);
  const midnightRef = useRef<HTMLDivElement>(null);
  const UnderwaterRef = useRef<HTMLDivElement>(null);
  const asset1Ref = useRef<HTMLDivElement>(null);
  const asset2Ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.set(
      [
        nightCityRef.current,
        UnderwaterRef.current,
        midnightRef.current,
        asset1Ref.current,
        asset2Ref.current,
      ],
      {
        opacity: 0,
        yPercent: 270,
        scaleY: 1.2,
      }
    )
      .addLabel("start")
      .to(
        [
          nightCityRef.current,
          asset1Ref.current,
          UnderwaterRef.current,
          asset2Ref.current,
          midnightRef.current,
        ],
        {
          opacity: 1,
          duration: 0.5,
          ease: "power4.out",
        },
        "start+=3"
      )
      .to(
        nightCityRef.current,
        {
          willChange: "transform",
          yPercent: 50,
          scaleY: 1,
          duration: 4,
          ease: "power4.out",
        },
        "start+=3"
      )
      .to(
        asset1Ref.current,
        {
          willChange: "transform",
          yPercent: -60,
          scaleY: 1,
          duration: 4,
          ease: "power4.out",
        },
        "start+=3"
      )
      .to(
        UnderwaterRef.current,
        {
          willChange: "transform",
          yPercent: 0,
          scaleY: 1,
          duration: 4,
          ease: "power4.out",
        },
        "start+=3"
      )
      .to(
        asset2Ref.current,
        {
          willChange: "transform",
          yPercent: -200,
          scaleY: 1,
          duration: 5,
          ease: "power4.out",
        },
        "start+=3"
      )
      .to(
        midnightRef.current,
        {
          willChange: "transform",
          yPercent: -80,
          scaleY: 1,
          duration: 5,
          ease: "power4.out",
        },
        "start+=2.5"
      )
      .fromTo(
        textRef.current,
        {
          opacity: 0,
          scale: 0.5,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power1.out",
        },
        "start+=3.5"
      )
      .fromTo(
        Array.from(subtextRef.current?.children || []),
        { opacity: 0, y: -10 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.3,
          duration: 0.5,
          ease: "power1.out",
        },
        "start+=4"
      );
  });
  return (
    <div className="h-screen relative flex justify-center items-center">
      {/* welcome text */}
      <div className="mt-6 flex flex-col h-1/3 w-1/2 justify-center items-center gap-5">
        <h1
          ref={textRef}
          className="text-5xl font-base font-mukta text-aliceBlue text-center"
        >
          Where Code <br />
          Meets Creativity
        </h1>
        <div
          ref={subtextRef}
          className="text-aliceBlue/80 text-lg font-light font-mukta w-1/2 text-center"
        >
          <p>A developer’s journey of turning ideas into interactive</p>
          <p>realities. Innovating at the intersection of design, </p>
          <p>development, and digital magic.</p>
        </div>
      </div>

      {/* city */}
      <div
        ref={nightCityRef}
        className="w-75 h-100 bg-[#0C1C25] absolute rounded-lg shadow-2xl left-20 z-10 overflow-hidden"
      >
        <NightCity />
      </div>

      {/* midnight */}
      <div
        ref={midnightRef}
        className="w-100 h-130 bg-cyan-500 absolute rounded-lg shadow-2xl left-1/2 -translate-x-1/2 overflow-hidden brightness-80"
      >
        <Midnight />
      </div>

      {/* underwater */}
      <div
        ref={UnderwaterRef}
        className="w-75 h-100 bg-cyan-500/50 absolute rounded-lg shadow-2xl right-20 z-10 overflow-hidden brightness-90"
      >
        <UnderWater />
      </div>

      {/* asset 1 */}
      <div
        ref={asset1Ref}
        className="w-50 h-80 bg-red-500/50 absolute rounded-lg shadow-2xl left-80 brightness-50 overflow-hidden"
      ></div>

      {/* asset 2  */}
      <div
        ref={asset2Ref}
        className="w-50 h-50 bg-cyan-500/50 absolute rounded-lg shadow-2xl right-0 brightness-50 overflow-hidden"
      ></div>
    </div>
  );
}
