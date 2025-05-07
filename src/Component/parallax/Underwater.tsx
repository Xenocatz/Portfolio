import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import background from "../../assets/parallax/underwater/1.png";
import rock from "../../assets/parallax/underwater/4.png";
import ground from "../../assets/parallax/underwater/5.png";
import karang from "../../assets/parallax/underwater/6.png";

gsap.registerPlugin(useGSAP);

interface Layer {
  src: string;
  depth: number;
  backgroundPosition: string;
  classname: string;
}

const layers: Layer[] = [
  {
    src: background,
    depth: 30,
    backgroundPosition: " center",
    classname: "w-[350px] h-[400px] -top-5",
  },
  {
    src: rock,
    depth: 20,
    backgroundPosition: " center",
    classname: "w-[350px] h-[200px] -bottom-0",
  },
  {
    src: ground,
    depth: 10,
    backgroundPosition: " center",
    classname: "w-[350px] h-[200px] -bottom-0",
  },
  {
    src: karang,
    depth: 5,
    backgroundPosition: " center",
    classname: "w-[350px] h-[200px] bottom-0",
  },
];

export default function Underwater() {
  const containerRef = useRef<HTMLTableSectionElement>(null);
  const layersRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!layersRef.current) return;

      const { clientX } = e;
      const { left, width } = containerRef.current.getBoundingClientRect();

      const x = (clientX - left - width / 2) / width;

      layersRef.current.forEach((layer, index) => {
        gsap.to(layer, {
          x: x * layers[index].depth,
          ease: "power1.out",
          duration: 0.3,
        });
      });
      gsap.to([".squid-idle", ".fish-idle"], {
        x: x * 20,
        ease: "power1.out",
        duration: 0.3,
      });
    };

    const container = containerRef.current;
    container?.addEventListener("mousemove", handleMouseMove);

    return () => {
      container?.removeEventListener("mousemove", handleMouseMove);
    };
  });
  return (
    <section ref={containerRef} className="relative w-full h-full">
      {layers.map((layer, index) => (
        <div
          key={index}
          ref={(el) => {
            layersRef.current[index] = el as HTMLDivElement;
          }}
          className={`absolute bg-cover bg-no-repeat -left-5 ${layer.classname}`}
          style={{
            backgroundImage: `url(${layer.src})`,
            backgroundPosition: layer.backgroundPosition,
          }}
        />
      ))}
      <div className="hidden sm:absolute top-1/2 left-1/3 sprite squid-idle step-6" />
      <div className="hidden sm:absolute top-1/2 right-1/3 sprite fish-idle step-4" />
    </section>
  );
}
