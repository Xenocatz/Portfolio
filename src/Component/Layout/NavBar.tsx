import { Link, useLocation } from "react-router";
import SplitText from "../element/SplitText";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FileUser, PawPrint } from "lucide-react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(useGSAP, ScrollTrigger);
type ScrollerProps = { scrollerRef: React.RefObject<HTMLDivElement | null> };

export default function NavBar({ scrollerRef }: ScrollerProps) {
  const iconRef = useRef<HTMLImageElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.set(headerRef.current, { opacity: 0 })
      .set(navRef.current, { opacity: 0.5, scaleX: 0 })
      .set(buttonRef.current, { opacity: 0, y: 10 })
      .to(headerRef.current, { opacity: 1 })
      .addLabel("navItems")
      .to(
        navRef.current,
        {
          willChange: "opacity, transform",
          opacity: 1,
          scaleX: 1,
          duration: 1,
          ease: "back.inOut",
        },
        "navItems"
      )
      .fromTo(
        listRef.current?.children || [],
        {
          opacity: 0,
          y: 10,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "back.inOut",
        }
      )
      .fromTo(
        iconRef.current,
        {
          opacity: 0,
          scale: 0.5,
          x: 50,
        },
        {
          opacity: 1,
          duration: 0.5,
          scale: 1,

          ease: "power1.out",
        },
        "navItems+=0.5"
      )
      .to(iconRef.current, { x: 0, duration: 1, ease: "back.inOut" }, "<+=0.5")
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
        "navItems+=0.5"
      )
      .to(
        buttonRef.current,
        { opacity: 1, y: 0, duration: 1, ease: "back.out" },
        "navItems+=1.9"
      );
  }, []);
  useGSAP(() => {
    if (scrollerRef.current) {
      gsap.to(headerRef.current, {
        paddingRight: 300,
        paddingLeft: 300,
        duration: 1,
        ease: "power1.inOut",
        scrollTrigger: {
          scroller: scrollerRef.current,
          trigger: headerRef.current,
          start: "300% 30%",
          end: "300% top",
          scrub: 0.5,
        },
      });
    }
  }, [scrollerRef.current]);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 w-full font-mukta  z-9999"
      >
        <div className="py-2 flex justify-between items-center  px-5">
          {/* logo */}
          <div className="flex gap-2 justify-center items-center">
            <img
              ref={iconRef}
              className="relative w-16 h-16"
              src="/logoCat.png"
              alt="icon"
            />
            <SplitText
              textClassName="text-2xl font-mukta font-base"
              animationDuration={0.5}
              stagger={0.1}
              delay={2}
              ease="back.out"
            >
              LoneCatz
            </SplitText>
          </div>
          <nav
            ref={navRef}
            className="bg-black/10 backdrop-blur-xs p-3 border-x-2 border-cyan-700/80 rounded"
          >
            <ul ref={listRef} className="flex gap-10">
              <NavElement text="Home" to="/" />
              <NavElement text="About" to="/about" />
              <NavElement text="Projects" to="/project" />
              <NavElement text="Contact" to="/contact" />
            </ul>
          </nav>
          {/* download resume */}
          <button
            ref={buttonRef}
            className="relative group p-[2px] cursor-pointer"
          >
            <div className="relative bg-gray-800 p-2 flex gap-2 justify-center items-center rounded-lg border border-cyan-700/50 text-cyan-400/80 highlight-text ">
              <FileUser className="inline-block" />
              download resume
            </div>
          </button>
        </div>
      </header>
    </>
  );
}

const NavElement = ({ text, to }: { text: string; to: string }) => {
  const active = useLocation().pathname === to;
  return (
    <li
      className={`cursor-pointer flex gap-2 justify-center items-center ${
        active
          ? "text-cyan-400/70 highlight-text font-bold"
          : "text-aliceBlue/80 font-light"
      }`}
    >
      {active && <PawPrint className="w-5 text-cyan-500" />}
      <Link to={to}>{text}</Link>
    </li>
  );
};
