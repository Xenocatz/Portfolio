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
    classname: "w-[700px] h-[800px] -top-5 -left-5",
    backgroundPosition: "center center",
  },
  {
    src: rock,
    depth: 30,
    classname: "w-[600px] h-[350px] bottom-0",
    backgroundPosition: "center",
  },
  {
    src: ground,
    depth: 10,
    classname: "w-[500px] h-[300px] -bottom-1 -left-5",
    backgroundPosition: "center",
  },
  {
    src: cloud1,
    depth: 8,
    classname: "w-[400px] h-[300px] top-0",
    backgroundPosition: "center",
  },
  {
    src: cloud2,
    depth: 10,
    classname: "w-[400px] h-[300px] top-0",
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

    const handleMouseLeave = () => {
      layerRef.current.forEach((layer) => {
        gsap.to(layer, {
          x: 0,
          ease: "power1.out",
          duration: 0.5,
        });
      });
    };
    const container = containerRef.current;
    container?.addEventListener("mousemove", handleMouseMove);
    container?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container?.removeEventListener("mousemove", handleMouseMove);
      container?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-full">
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
      <div className="absolute bottom-10 scale-150 left-45 sprite dog-idle step-4 brightness-70" />
    </section>
  );
}
