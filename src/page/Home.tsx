import jsIcon from "../assets/tech_icon/js.svg";
import reactIcon from "../assets/tech_icon/reactjs.svg";
import tailwindIcon from "../assets/tech_icon//tailwindcss.svg";
import firebaseIcon from "../assets/tech_icon/firebase.svg";
import { Github, Grab, Instagram, Linkedin, PawPrint } from "lucide-react";
import WelcomeSection from "../Component/Layout/WelcomeSection";
import ProjectList from "../Component/element/ProjectList";
import ProjectDetail from "../Component/element/ProjectDetail";
import { Link } from "react-router";
import BgNightOcean from "../Component/element/BgNightOcean";

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
    bgClass: "bg-cyan",
    shadowClass: "shadow-cyan/50",
  },
];

export default function Home() {
  return (
    <>
      <WelcomeSection />
      <main className="flex w-full flex-col items-center justify-center py-5">
        {/* section 1 - herosection */}
        <section className="relative max-h-screen w-6/7 overflow-hidden rounded bg-surface/50 px-5 py-5 sm:mt-30 sm:px-10">
          <BgNightOcean />

          {/* content */}
          <div className="relative z-10">
            <p className="mb-5 flex gap-2 font-mukta text-lg text-text sm:mb-10 sm:text-2xl">
              <Grab className="text-cyan" /> yo, Faiz here.
            </p>
            <h1 className="font-parkinsans text-4xl font-semibold text-text sm:max-w-2/3 sm:text-6xl">
              crafted with <span className="text-cyan">logic</span> and a sense
              of <span className="text-cyan">purpose</span>. ready to turn your
              ideas into <span className="text-cyan">reality</span>.
            </h1>

            <p className="mt-5 max-w-3/4 justify-self-end text-end font-mukta text-sm text-subtext sm:mt-30 sm:max-w-2/3 sm:text-base">
              From the simplest HTML tag to complex React logic. <br /> I create
              web experiences that feel intuitive and purposeful.
            </p>
            <button className="mt-10 flex cursor-pointer justify-self-end rounded-full bg-aliceBlue/90 px-4 py-2 font-mukta text-sm font-semibold text-black duration-200 hover:bg-cyan-500 sm:px-5 sm:py-3 sm:text-base">
              know me better
            </button>
          </div>
        </section>

        {/* section 2 - about*/}
        <section className="mt-10 flex w-6/7 flex-col items-start justify-center py-5 font-mukta text-text sm:mt-30 sm:px-10">
          <div>
            <h3 className="highlight-text mb-5 flex items-center gap-3 font-mukta text-lg font-semibold text-cyan-500/80 sm:text-2xl">
              <PawPrint className="w-5 text-cyan sm:w-7" /> about me
            </h3>
          </div>
          <div className="flex w-full flex-col overflow-hidden rounded-lg shadow-2xl outline-1 outline-text/30 sm:flex-row">
            {/* text kiri */}
            <div className="flex flex-1 flex-col items-center justify-center rounded-r-lg px-5 py-5">
              <p className="text-center font-thin sm:max-w-full sm:text-start sm:text-2xl sm:tracking-wide">
                Currently, I’m a 4th-semester Informatics Engineering student at
                Universitas Pamulang, continuously learning and building my way
                through the world of tech — one line of code at a time.
              </p>
              <p className="mt-5 text-center font-thin sm:mt-10 sm:max-w-full sm:text-start sm:text-2xl sm:tracking-wide">
                I turn ideas into interactive web experiences that feel natural
                and just make sense. With a strong foundation in front-end
                development and a love for crafting seamless user interfaces,
                I’m always exploring new ways to build web solutions that are
                fast, responsive, and easy to use. I enjoy working across the
                stack, especially with HTML, CSS, JavaScript, and React, while
                always keeping the user’s experience at heart.
              </p>
            </div>
            {/* gambar kanan */}
            <div className="flex-1 rounded-l-lg bg-blue-500">
              <img
                src="/3385452116_70876832253163_1745150276749.png"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* section 3 - project*/}
        <section className="w-full px-5 pt-30 pb-20 font-mukta text-text sm:my-20 sm:px-50">
          <div>
            <h3 className="highlight-text flex w-fit items-center gap-3 font-mukta text-lg font-semibold text-cyan-500/80 sm:text-2xl">
              <PawPrint className="sm:w-7text-cyan w-5" /> projects
            </h3>
            <p className="mt-3 text-start font-parkinsans text-3xl font-semibold tracking-wide sm:text-4xl">
              my recent projects
            </p>
          </div>
          {/* project sm++ */}
          <div className="mt-10 hidden w-full flex-row-reverse overflow-hidden rounded-lg border border-text/30 sm:flex">
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
                        <h3 className="text-xl font-semibold">
                          {project.name}
                        </h3>
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

        {/* section 4 - contact*/}
        <section className="my-15 px-5 sm:w-full sm:px-50">
          <div className="flex w-fit items-center justify-center gap-2 rounded-tl-xl rounded-tr-full bg-cyan/20 py-1 pr-5 pl-2">
            <p className="highlight-text font-mukta text-sm text-cyan/80 sm:text-base">
              Available for work
            </p>
          </div>
          {/* container */}
          <div className="flex flex-col items-center rounded-xl rounded-tl-none bg-surface py-5 sm:w-full sm:py-10">
            <h3 className="text-center font-parkinsans text-4xl leading-relaxed font-semibold tracking-wide text-text sm:w-3/5 sm:text-5xl">
              You imagine it, I’ll build it. Let’s get started.
            </h3>
            <Link
              to="/contact"
              className="mt-5 rounded-full bg-text px-5 py-3 font-semibold text-darkbg duration-200 hover:bg-cyan"
            >
              let's talk
            </Link>
          </div>
          {/* media */}
          <div className="sm:flex sm:flex-row-reverse sm:justify-between">
            <ul className="mt-5 flex justify-center gap-5 text-text">
              <Link
                to="https://github.com/Xenocatz"
                target="_blank"
                title="Github"
              >
                <Github />
              </Link>
              <Link
                to="https://www.linkedin.com/in/muhammad-faiz-670800313"
                target="_blank"
                title="Linkedin"
              >
                <Linkedin />
              </Link>
              <Link
                to="https://www.instagram.com/fzz.xnnt"
                target="_blank"
                title="Instagram"
              >
                <Instagram />
              </Link>
            </ul>
            <p className="mt-5 text-center text-subtext">
              &copy; 2025 Muhammad Faiz
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
