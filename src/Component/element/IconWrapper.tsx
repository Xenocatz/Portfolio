import gsap from "gsap";
import { useRef } from "react";

export default function IconWrapper({
  icon,
  tittle,
  borderColor = "border-text/30",
  textColor = "text-subtext",
}: {
  icon: string;
  tittle?: string;
  borderColor?: string;
  textColor?: string;
}) {
  const tittleRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const handleMouseEnter = () => {
    gsap.to(tittleRef.current, {
      opacity: 1,
      y: -45,
      x: 10,
      rotate: 10,
      scale: 1.2,
      duration: 0.5,
      ease: "back.out",
    });
    gsap.to(wrapperRef.current, {
      scale: 1.2,
      duration: 0.5,
      ease: "back.out",
    });
  };
  const handleMouseLeave = () => {
    gsap.to(tittleRef.current, {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 0.2,
      rotate: 0,
      duration: 0.5,
      ease: "power2.out",
    });
    gsap.to(wrapperRef.current, {
      scale: 1,
      duration: 0.5,
      ease: "power4.out",
    });
  };
  return (
    <>
      <div className="relative">
        <div
          ref={tittleRef}
          className={`absolute top-0 z-5 rounded-full border ${borderColor} bg-darkbg p-1 px-2 opacity-0`}
        >
          <p className={`text-xs ${textColor}`}>{tittle}</p>
        </div>

        <div
          ref={wrapperRef}
          className="relative z-10 rounded-2xl border border-text/30 bg-darkbg p-2"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img src={icon} className="w-7" />
        </div>
      </div>
    </>
  );
}
