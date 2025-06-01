import { PawPrint } from "lucide-react";
import ProjectDetail from "../../element/ProjectDetail";
import ProjectList from "../../element/ProjectList";
import jsIcon from "../../../assets/tech_icon/js.svg";
import reactIcon from "../../../assets/tech_icon/reactjs.svg";
import tailwindIcon from "../../../assets/tech_icon//tailwindcss.svg";
import firebaseIcon from "../../../assets/tech_icon/firebase.svg";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";

const projects = [
  {
    name: "whangsaff",
    category: "Development & Design",
    year: "2025",
    // desktop
    images: [
      "/projects/whangsaff/chatPage.png",
      "/projects/whangsaff/chatbotPage.png",
      "/projects/whangsaff/loginPage.png",
    ],
    description:
      "WhangSaff is a real-time chat application built with React, Tailwind CSS, and Firebase. It allows users to chat with friends or interact with a built-in chatbot. Designed with a clean and minimal user interface, WhangSaff provides a smooth messaging experience in a lightweight environment.",
    techStack: [
      {
        icon: jsIcon,
        title: "JavaScript",
      },
      {
        icon: reactIcon,
        title: "React",
      },
      {
        icon: tailwindIcon,
        title: "TailwindCSS",
      },
      {
        icon: firebaseIcon,
        title: "Firebase",
      },
    ],
    // mobile
    logo: "/projects/whangsaff/chatPage.png",
    bgClass: "bg-shineText",
    shadowClass: "shadow-cyan/50",
  },
];

gsap.registerPlugin(ScrollTrigger, SplitText);
export default function ProjectSection() {
  const containerSmRef = useRef<HTMLDivElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);

  useGSAP(
    () => {
      if (!containerSmRef.current) return;

      ScrollTrigger.create({
        trigger: containerSmRef.current,
        start: "center center",
        end: () => `+=${containerSmRef.current?.offsetHeight}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: true,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });

      SplitText.create("#header-text", {
        type: "chars",
        autoSplit: true,
        onSplit: (self) => {
          return gsap.from(self.chars, {
            autoAlpha: 0,
            y: 20,
            stagger: 0.05,
            ease: "back.out",
            scrollTrigger: {
              trigger: "#header-text",
              start: "center bottom",
            },
            onComplete: () => {
              self.revert();
            },
          });
        },
      });
    },
    { scope: containerSmRef },
  );
  return (
    <section
      ref={containerSmRef}
      className="w-full px-5 pt-30 pb-20 font-mukta text-text sm:my-20 sm:px-50"
    >
      <div>
        <h3 className="highlight-text flex w-fit items-center gap-3 font-mukta text-lg font-semibold text-shineText/90 sm:text-2xl">
          <PawPrint className="w-5 text-shineText sm:w-7" /> projects
        </h3>
        <p
          id="header-text"
          className="mt-3 text-start font-parkinsans text-3xl font-semibold tracking-wide sm:text-4xl"
        >
          my recent projects
        </p>
      </div>
      {/* project sm++ */}
      <div className="mt-10 hidden w-full flex-row-reverse overflow-hidden rounded-lg sm:flex">
        {/* projectlist */}
        <ul className="flex flex-col justify-between text-text">
          {/* project */}
          {projects.map((project, index) => {
            return (
              <ProjectList
                key={index}
                projectName={project.name}
                bgClass={project.bgClass}
                active={index === 0}
                containerOffSet={scrollProgress * 100}
              />
            );
          })}
        </ul>
        {/* details project */}
        <div className="flex-1">
          <ProjectDetail
            name={projects[0].name}
            images={projects[0].images}
            category={projects[0].category}
            year={projects[0].year}
            description={projects[0].description}
            techStack={projects[0].techStack}
          />
        </div>
      </div>

      {/* project mobile */}
      <div>
        <ul className="mt-10 flex flex-col gap-20 sm:hidden">
          {projects.map((project, index) => {
            return (
              <li key={index} className="border-b border-text/30 text-text">
                <div className="group w-full cursor-pointer">
                  {/* img */}
                  <div
                    className={`flex w-full items-center justify-center overflow-hidden rounded-xl p-2 shadow-md duration-300 group-hover:scale-105 group-hover:shadow-lg ${project.shadowClass} ${project.bgClass}`}
                  >
                    <img
                      src={project.logo}
                      className="rounded-lg shadow-xl"
                      alt=""
                    />
                  </div>
                  {/* text */}
                  <div className="mt-5 flex flex-col gap-1 tracking-wide">
                    <h3 className="text-xl font-semibold">{project.name}</h3>
                    <div className="flex justify-between text-base text-subtext">
                      <p>{project.category}</p>
                      <p>{project.year}</p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
