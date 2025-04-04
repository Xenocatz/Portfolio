import { Grab } from "lucide-react";
import WelcomeSection from "../Component/Layout/WelcomeSection";

export default function Home() {
  return (
    <>
      <WelcomeSection />
      <main className="flex justify-center items-center w-full  py-5">
        {/* section 1 */}
        <section className="bg-darkPurple/10 max-h-screen rounded py-5 px-10 w-6/7 mt-30">
          <p className="text-aliceBlue flex gap-2 font-mukta text-2xl mb-10">
            <Grab className="text-cyan-500" /> yo, Faiz here.
          </p>
          <h1 className="text-aliceBlue text-6xl font-semibold font-parkinsans max-w-2/3">
            crafted with <span className="text-cyan-500">logic</span> and a
            sense of <span className="text-cyan-500">purpose</span>. ready to
            turn your ideas into <span className="text-cyan-500">reality</span>.
          </h1>
          <p className="text-aliceBlue/80 mt-10 max-w-2/3 justify-self-end font-mukta">
            From the simplest HTML tag to complex React logic. <br /> I create
            web experiences that feel intuitive and purposeful.
          </p>
          <button className="text-black py-3 px-5 rounded-full bg-aliceBlue/90 mt-10 justify-self-end font-mukta flex cursor-pointer hover:bg-cyan-500 duration-200">
            know me better
          </button>
        </section>
        {/* section 2 */}
      </main>
    </>
  );
}
