import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import moon from "../../assets/parallax/night_city/2.png";
import cloud1 from "../../assets/parallax/night_city/4.png";
import cloud2 from "../../assets/parallax/night_city/5.png";
import city1 from "../../assets/parallax/night_city/city1.png";
import city2 from "../../assets/parallax/night_city/city2.png";
import city3 from "../../assets/parallax/night_city/city3.png";
import city4 from "../../assets/parallax/night_city/city4.png";

gsap.registerPlugin(useGSAP);
interface Layer {
  src: string;
  className: string;
  depth: number;
  backgroundPosition?: string;
}

const layers: Layer[] = [
  {
    src: moon,
    className: "top-0 left-0 w-[576px] h-[324px]",
    depth: 2,
    backgroundPosition: "-200px center",
  },
  {
    src: cloud1,
    className: "top-10 left-10 w-[350px] h-[197px]",
    depth: 10,
    backgroundPosition: "center -50px",
  },
  {
    src: cloud2,
    className: "top-20 right-10 w-[350px] h-[197px]",
    depth: 30,
    backgroundPosition: "center 50px",
  },
  {
    src: city1,
    className: "bottom-0 -left-5 w-[350px] h-[324px]",
    depth: 5,
    backgroundPosition: "center",
  },
  {
    src: city2,
    className: "bottom-0 -left-5 w-[350px] h-[324px]",
    depth: 10,
    backgroundPosition: "center",
  },
  {
    src: city3,
    className: "bottom-0 -left-5 w-[350px] h-[324px]",
    depth: 15,
    backgroundPosition: "center",
  },
  {
    src: city4,
    className: "-bottom-5 -left-5 w-[350px] h-[324px]",
    depth: 10,
    backgroundPosition: "center",
  },
];

export default function NightCity() {
  const containerRef = useRef<HTMLElement | null>(null);
  const layersRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!layersRef.current) return;

      const { clientX, clientY } = e;
      const { width, height, left, top } =
        containerRef.current.getBoundingClientRect();
      const x = (clientX - left - width / 2) / width;
      const y = (clientY - top - height / 2) / height;

      layersRef.current.forEach((layer, index) => {
        if (layer) {
          gsap.to(layer, {
            x: x * layers[index].depth,
            y: y * layers[index].depth,
            ease: "power1.out",
            duration: 0.3,
          });
        }
      });
    };

    const handleMouseLeave = () => {
      layersRef.current.forEach((layer) => {
        if (layer) {
          gsap.to(layer, {
            x: 0,
            y: 0,
            ease: "power1.out",
            duration: 0.5,
          });
        }
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
    <section ref={containerRef} className="relative w-full h-full ">
      {layers.map((layer, index) => (
        <div
          key={index}
          ref={(el) => {
            layersRef.current[index] = el as HTMLDivElement;
          }}
          className={`absolute bg-no-repeat bg-cover ${layer.className}`}
          style={{
            backgroundImage: `url(${layer.src})`,
            backgroundPosition: layer.backgroundPosition,
          }}
        />
      ))}
    </section>
  );
}
