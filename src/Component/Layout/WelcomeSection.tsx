import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import NightCity from "../parallax/NightCity";
import Midnight from "../parallax/Midnight";
import UnderWater from "../parallax/Underwater";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollStore } from "../../store/scrollStore";

gsap.registerPlugin(useGSAP, ScrollTrigger);
export default function WelcomeSection() {
  // store
  const openScrollBar = useScrollStore((state) => state.openScrollBar);
  const closeScrollBar = useScrollStore((state) => state.closeScrollBar);

  // hooks
  const nightCityRef = useRef<HTMLDivElement>(null);
  const midnightRef = useRef<HTMLDivElement>(null);
  const UnderwaterRef = useRef<HTMLDivElement>(null);
  const asset1Ref = useRef<HTMLDivElement>(null);
  const asset2Ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (
      nightCityRef.current &&
      UnderwaterRef.current &&
      midnightRef.current &&
      asset1Ref.current &&
      asset2Ref.current &&
      textRef.current &&
      subtextRef.current
    ) {
      const tl = gsap.timeline({});
      tl.add(() => {
        console.log("scrollbar closed");
        closeScrollBar();
      })
        .set(
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
          },
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
          "start+=0.5",
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
          "start+=0.5",
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
          "start+=0.5",
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
          "start+=0.5",
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
          "start+=0.5",
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
          "start",
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
          "start+=1",
        )
        .fromTo(
          Array.from(subtextRef.current.children),
          { opacity: 0, y: -10 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.3,
            duration: 0.5,
            ease: "power1.out",
          },
          "start+=1.5",
        )
        .add(() => {
          openScrollBar();
          console.log("scrollbar open");
        }, "start+=3");
    }
  }, []);

  return (
    <div
      id="home"
      className="relative flex h-screen items-center justify-center bg-radial-[at_50%_-50%] from-zinc-800 to-background to-60% text-lime-50/50"
    >
      {/* welcome text */}
      <div className="mt-6 flex h-1/3 flex-col items-center justify-center sm:w-1/2 sm:gap-5">
        <h1
          ref={textRef}
          className="font-base z-20 text-center font-mukta text-4xl text-text sm:text-5xl"
        >
          Where Code <br />
          Meets Creativity
        </h1>
        {/* subtext sm++ */}
        <div
          ref={subtextRef}
          className="z-20 text-center font-mukta text-base font-light text-subtext sm:w-1/2"
        >
          <p>A developer’s journey of turning ideas into interactive</p>
          <p>realities. Innovating at the intersection of design, </p>
          <p>development, and digital magic.</p>
        </div>
      </div>

      {/* city */}
      <div
        ref={nightCityRef}
        className="absolute -left-10 z-10 h-60 w-40 overflow-hidden rounded-lg bg-[#0C1C25] shadow-2xl brightness-30 sm:left-20 sm:h-100 sm:w-75 sm:brightness-80"
      >
        <NightCity />
      </div>

      {/* midnight */}
      <div
        ref={midnightRef}
        className="absolute left-1/2 z-21 h-100 w-full max-w-75 -translate-x-1/2 overflow-hidden rounded-lg bg-cyan-500 shadow-2xl brightness-80 sm:h-130 sm:w-100 sm:max-w-full"
      >
        <Midnight />
      </div>

      {/* underwater */}
      <div
        ref={UnderwaterRef}
        className="absolute -right-10 z-10 h-50 w-30 overflow-hidden rounded-lg bg-cyan-500/50 shadow-2xl brightness-30 sm:right-20 sm:h-100 sm:w-75 sm:brightness-90"
      >
        <UnderWater />
      </div>

      {/* asset 1 */}
      <div
        ref={asset1Ref}
        className="absolute left-80 hidden h-80 w-50 overflow-hidden rounded-lg bg-red-500/50 shadow-2xl brightness-50 sm:block"
      ></div>

      {/* asset 2  */}
      <div
        ref={asset2Ref}
        className="absolute right-0 hidden h-50 w-50 overflow-hidden rounded-lg bg-cyan-500/50 shadow-2xl brightness-50 sm:block"
      ></div>
    </div>
  );
}
