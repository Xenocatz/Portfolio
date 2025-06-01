import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { Grab } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router";

gsap.registerPlugin(useGSAP, SplitText);
export default function HeroSection() {
  const heroText = useRef<HTMLDivElement | null>(null);
  const subText = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!heroText.current) return;
      SplitText.create(heroText.current, {
        type: "words",
        autoSplit: true,
        onSplit: (self) => {
          return gsap.from(self.words, {
            scrollTrigger: {
              trigger: heroText.current,
              toggleActions: "play none none none",
              start: "80% bottom",
            },
            autoAlpha: 0,
            y: -50,
            stagger: 0.1,
            ease: "back",
            onComplete: () => {
              self.revert();
            },
          });
        },
      });
    },
    { scope: heroText },
  );

  useGSAP(
    () => {
      SplitText.create(subText.current, {
        type: "lines",
        autoSplit: true,
        mask: "lines",
        onSplit: (self) => {
          gsap.from(self.lines, {
            scrollTrigger: {
              trigger: subText.current,
              toggleActions: "play none none none",
              start: "top 70%",
            },
            autoAlpha: 0,
            y: 50,
            stagger: 0.3,
            ease: "back.out",
            onComplete: () => {
              self.revert();
            },
          });
        },
      });
    },
    { scope: subText },
  );
  return (
    <section className="relative z-22 w-full overflow-hidden rounded px-5 py-5 sm:mt-35 sm:px-50">
      {/* content */}
      <div className="relative z-10 px-2">
        <div className="mb-5 flex gap-2 font-mukta text-lg text-text sm:mb-10 sm:text-2xl">
          <Grab className="grabIcon-animation text-shineText" />
          <p>yo, Faiz here</p>
        </div>

        <div
          ref={heroText}
          className="font-parkinsans text-3xl leading-tight font-semibold text-text sm:max-w-2/3 sm:text-6xl"
        >
          crafted with <span className="text-shineText">logic</span> and a sense
          of <span className="text-shineText">purpose</span>, ready to turn your
          ideas into <span className="text-shineText">reality</span>.
        </div>

        <div
          ref={subText}
          className="mt-5 max-w-5/7 justify-self-end text-end font-mukta text-sm text-subtext sm:mt-30 sm:max-w-2/3 sm:text-base"
        >
          From the simplest HTML tag to complex React logic. <br />I create web
          experiences that feel intuitive and purposeful.
        </div>
        <Link
          to={"about"}
          className="mt-10 flex cursor-pointer justify-self-end rounded-full bg-aliceBlue/80 px-4 py-2 font-mukta text-sm font-semibold text-black duration-200 hover:bg-aliceBlue sm:px-5 sm:py-3 sm:text-base"
        >
          know me better
        </Link>
      </div>
    </section>
  );
}
