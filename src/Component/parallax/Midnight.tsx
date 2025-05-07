import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import background from "../../assets/parallax/midnight/sky.png";
import rock from "../../assets/parallax/midnight/rocks.png";
import ground from "../../assets/parallax/midnight/ground_3.png";
import cloud1 from "../../assets/parallax/midnight/clouds_1.png";
import cloud2 from "../../assets/parallax/midnight/clouds_2.png";

gsap.registerPlugin(useGSAP);
interface Layer {
  src: string;
  depth: number;
  backgroundPosition?: string;
  classname?: string;
}

const layers: Layer[] = [
  {
    src: background,
    depth: 10,
    classname: "w-[350px] h-full sm:w-[700px] sm:h-[800px] -top-5 -left-5",
    backgroundPosition: "center center",
  },
  {
    src: rock,
    depth: 30,
    classname:
      "w-[350px] h-[200px] sm:w-[600px] sm:h-[350px] bottom-0 -left-5 sm:left-0",
    backgroundPosition: "center",
  },
  {
    src: ground,
    depth: 10,
    classname:
      "w-[350px] h-[200px] sm:w-[500px] sm:h-[300px] -bottom-1 -left-5",
    backgroundPosition: "center",
  },
  {
    src: cloud1,
    depth: 8,
    classname: "w-[350px] h-full sm:w-[400px] sm:h-[300px] top-0 -left-5",
    backgroundPosition: "center",
  },
  {
    src: cloud2,
    depth: 10,
    classname: "w-[350px] h-full sm:w-[400px] sm:h-[300px] top-0",
    backgroundPosition: "center",
  },
];
export default function Midnight() {
  const containerRef = useRef<HTMLElement | null>(null);
  const layerRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!layerRef.current) return;
      const { clientX } = e;
      const { left, width } = containerRef.current.getBoundingClientRect();
      const x = (clientX - left - width / 2) / width;

      layerRef.current.forEach((layer, index) => {
        if (layer) {
          gsap.to(layer, {
            x: x * layers[index].depth,
            ease: "power1.out",
            duration: 0.3,
          });
        }
      });
      gsap.to([".dog-idle"], {
        x: x * 10,
        ease: "power1.out",
        duration: 0.3,
      });
    };

    const container = containerRef.current;
    container?.addEventListener("mousemove", handleMouseMove);

    return () => {
      container?.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative h-full w-full">
      {layers.map((layer, index) => (
        <div
          ref={(el) => {
            layerRef.current[index] = el as HTMLDivElement;
          }}
          key={index}
          className={`absolute bg-cover bg-no-repeat ${layer.classname}`}
          style={{
            backgroundImage: `url(${layer.src})`,
            backgroundPosition: layer.backgroundPosition,
          }}
        />
      ))}
      <div className="sprite dog-attack step-4 bottom-10 left-45 hidden scale-150 brightness-70 sm:absolute" />
    </section>
  );
}
