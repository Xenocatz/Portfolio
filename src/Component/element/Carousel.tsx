import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

export default function Carousel({ images }: { images: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentIndex = useRef(0);
  const [offsets, setOffsets] = useState<number[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const itemsCounts = images.length;

  const startAutoPlay = () => {
    intervalRef.current = setInterval(() => {
      const nextIndex = (currentIndex.current + 1) % itemsCounts;
      currentIndex.current = nextIndex;
      setActiveIndex(nextIndex);
      gsap.to(containerRef.current, {
        x: -offsets[nextIndex] + offsets[0],
        duration: 1,
        ease: "power1.inOut",
      });
    }, 4000);
  };

  // nentuin offsets setelah semua gambar dimuat
  useEffect(() => {
    const handleLoad = () => {
      const position = imageRefs.current.map((image) => image?.offsetLeft || 0);
      setOffsets(position);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  useEffect(() => {
    if (offsets.length === 0) return;
    startAutoPlay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [offsets]);

  const goToIndex = (index: number) => {
    if (!containerRef.current || index === currentIndex.current) return;

    if (intervalRef.current) clearInterval(intervalRef.current);
    startAutoPlay();

    currentIndex.current = index;
    setActiveIndex(index);

    gsap.to(containerRef.current, {
      x: -offsets[index] + offsets[0],
      duration: 1,
      ease: "power1.inOut",
    });
  };

  return (
    <div className="relative">
      <div ref={containerRef} className="mx-auto flex max-w-fit">
        {images.map((image, i) => (
          <img
            key={i}
            ref={(el) => {
              imageRefs.current[i] = el;
            }}
            src={image}
            alt={`Image ${i}`}
            className="h-full max-h-[345px] w-full"
          />
        ))}
      </div>
      {/* pointer */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
        {images.map((_, i) => (
          <span
            key={i}
            onClick={() => goToIndex(i)}
            className={`${
              i === activeIndex ? "bg-shineText" : "bg-text/30"
            } h-2 w-2 cursor-pointer rounded-full`}
          ></span>
        ))}
      </div>
    </div>
  );
}
