import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { Github, Instagram, Linkedin } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router";

gsap.registerPlugin(SplitText);
export default function ContactSection() {
  const containerTextRef = useRef<HTMLDivElement>(null);
  const containerMediaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerTextRef.current) return;
      SplitText.create("#header-text", {
        type: "chars",
        autoSplit: true,
        reduceWhiteSpace: true,
        smartWrap: true,
        onSplit: (self) => {
          return gsap.from(self.chars, {
            autoAlpha: 0,
            y: 10,
            stagger: 0.05,
            ease: "back.inOut",
            scrollTrigger: {
              trigger: containerTextRef.current,
              toggleActions: "play none none reverse",
              start: "top bottom",
              end: "bottom top",
            },
          });
        },
      });
    },
    { scope: containerTextRef },
  );

  useGSAP(
    () => {
      if (!containerMediaRef.current) return;
      gsap.from(".media", {
        autoAlpha: 0,
        y: 10,
        stagger: 0.5,
        duration: 1,
        ease: "back.inOut",
        scrollTrigger: {
          trigger: containerMediaRef.current,
          toggleActions: "play none none reverse",
          start: "top bottom",
          end: "bottom top",
        },
      });
    },
    { scope: containerMediaRef },
  );
  return (
    <section className="my-15 px-5 sm:w-full sm:px-50">
      <div className="flex w-fit items-center justify-center gap-2 rounded-tl-xl rounded-tr-full bg-lime-400/30 py-1 pr-5 pl-2">
        <p className="highlight-text font-mukta text-sm text-shineText/80 sm:text-base">
          Available for work
        </p>
      </div>
      {/* container */}
      <div
        ref={containerTextRef}
        className="flex flex-col items-center rounded-xl rounded-tl-none bg-surface py-5 sm:w-full sm:py-10"
      >
        <h3
          id="header-text"
          className="text-center font-parkinsans text-4xl leading-relaxed font-semibold tracking-wide text-text sm:w-3/5 sm:text-5xl"
        >
          You imagine it, I’ll build it. Let’s get started.
        </h3>
        <Link
          to="/contact"
          className="text-darkbg mt-5 rounded-full bg-text/90 px-5 py-3 font-semibold duration-200 hover:bg-text"
        >
          let's talk
        </Link>
      </div>
      {/* media */}
      <div
        ref={containerMediaRef}
        className="sm:flex sm:flex-row-reverse sm:justify-between"
      >
        <div className="mt-5 flex justify-center gap-5 text-text">
          <Link
            to="https://github.com/Xenocatz"
            target="_blank"
            title="Github"
            className="media"
          >
            <Github />
          </Link>
          <Link
            to="https://www.linkedin.com/in/muhammad-faiz-670800313"
            target="_blank"
            title="Linkedin"
            className="media"
          >
            <Linkedin />
          </Link>
          <Link
            to="https://www.instagram.com/fzz.xnnt"
            target="_blank"
            title="Instagram"
            className="media"
          >
            <Instagram />
          </Link>
        </div>
        <p className="mt-5 text-center text-subtext">
          &copy; 2025 Muhammad Faiz
        </p>
      </div>
    </section>
  );
}
