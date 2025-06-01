import { Link, useLocation } from "react-router";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  AudioLines,
  Cat,
  HomeIcon,
  LayoutTemplate,
  PawPrint,
  PersonStanding,
  Send,
} from "lucide-react";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export default function NavBar() {
  const iconRef = useRef<SVGSVGElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useGSAP(
    () => {
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
          "navItems",
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
          },
        )
        .fromTo(
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
        )
        .to(
          iconRef.current,
          {
            y: 0,
            scale: 1,
            duration: 1.5,
            ease: "back.inOut",
          },
          "navItems+=1",
        )
        .to(
          buttonRef.current,
          { opacity: 1, y: 0, duration: 1, ease: "back.out" },
          "navItems+=1.9dcxxxxxxxxxxxxxxxxxxxxx",
        );

      SplitText.create("#logo", {
        type: "chars",
        autoSplit: true,
        onSplit: (self) => {
          gsap.from(self.chars, {
            delay: 2.2,
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
    { scope: headerRef },
  );

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 z-9999 w-full overflow-hidden bg-linear-to-b from-background via-background/30 to-transparent font-mukta"
      >
        <div className="flex items-center justify-between px-5 py-2">
          {/* logo */}
          <div className="flex flex-1 items-center justify-start md:gap-2">
            <Cat ref={iconRef} className="relative h-10 w-10 text-shineText" />
            <p
              id="logo"
              className="text-lg font-semibold text-text md:text-2xl"
            >
              LoneCatz
            </p>
          </div>
          {/* nav md++ */}
          <nav
            ref={navRef}
            className="hidden rounded-lg bg-surface/20 p-3 backdrop-blur-xs md:flex"
          >
            <ul ref={listRef} className="flex gap-10">
              <NavElement text="Home" to="/" />
              <NavElement text="About" to="/about" />
              <NavElement text="Projects" to="/project" />
              <NavElement text="Contact" to="/contact" />
            </ul>
          </nav>

          {/* audio */}
          <div className="flex flex-1 justify-end">
            <button
              ref={buttonRef}
              className="hover:bg-darkbg rounded-full p-1"
            >
              <AudioLines className="size-6 text-text md:size-8" />
            </button>
          </div>
        </div>
        {/* nav mobile */}
        <nav className="bg-darkbg/90 fixed bottom-0 left-0 flex w-full overflow-hidden backdrop-blur-xs md:hidden">
          <ul className="flex w-full gap-10 px-10">
            <NavMobile text="Home" icon={<HomeIcon />} to="/" />
            <NavMobile text="About" icon={<PersonStanding />} to="/about" />
            <NavMobile text="project" icon={<LayoutTemplate />} to="/project" />
            <NavMobile text="contact" icon={<Send />} to="/contact" />
          </ul>
        </nav>
        <div className="fixed top-20 left-5 z-9999 flex items-center justify-center rounded-xl bg-text p-5 shadow">
          <h1 className="text-center text-2xl text-background">
            still under construction :)
          </h1>
        </div>
      </header>
    </>
  );
}

const NavElement = ({ text, to }: { text: string; to: string }) => {
  const active = useLocation().pathname === to;
  return (
    <li
      className={`flex cursor-pointer items-center justify-center gap-2 ${
        active
          ? "highlight-text font-bold text-shineText/80"
          : "font-light text-text"
      }`}
    >
      {active && <PawPrint className="w-5 text-shineText" />}
      <Link to={to}>{text}</Link>
    </li>
  );
};

const NavMobile = ({
  text,
  icon,
  to,
}: {
  text: string;
  icon: React.ReactNode;
  to: string;
}) => {
  const active = useLocation().pathname === to;
  return (
    <li className="flex-grow cursor-pointer select-none">
      <Link to={to}>
        <div
          className={`${
            active ? "text-shineText" : "text-text"
          } flex flex-col items-center justify-center py-3`}
        >
          {icon}
          {text}
        </div>
      </Link>
    </li>
  );
};
