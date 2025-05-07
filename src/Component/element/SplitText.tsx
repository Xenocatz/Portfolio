import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ReactNode, useMemo, useRef } from "react";

gsap.registerPlugin(useGSAP);
interface SplitTextProps {
  children: ReactNode;
  textClassName?: string;
  animationDuration: number;
  stagger: number;
  ease: string;
  delay: number;
}
export default function SplitText({
  children,
  textClassName,
  animationDuration,
  stagger,
  ease,
  delay,
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split("").map((char, index) => (
      <span className="inline-block" key={index}>
        {char}
      </span>
    ));
  }, [children]);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current.querySelectorAll(".inline-block"),
      {
        willChange: "opacity, transform",
        opacity: 0,
        x: 70,
        // scalex: 0.2,
        // scaley: 0.5,
        transformOrigin: "50% 0%",
      },
      {
        duration: animationDuration,
        ease: ease,
        opacity: 1,
        x: 0,
        // scaleY: 1,
        // scaleX: 1,
        stagger: stagger,
        delay: delay,
      },
    );
  }, [animationDuration, stagger, ease]);

  return (
    <div ref={containerRef} className={``}>
      <span
        className={`inline-block gap-2 leading-[1.5] text-text ${textClassName}`}
      >
        {splitText}
      </span>
    </div>
  );
}
