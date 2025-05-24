import IconWrapper from "./IconWrapper";
import Carousel from "./Carousel";

export default function ProjectDetail({
  name,
  description,
  category,
  year,
  images,
  techStack,
}: {
  name: string;
  description: string;
  category: string;
  year: string;
  images: string[];
  techStack: { icon: string; title: string }[];
}) {
  return (
    <div className="flex h-full w-full gap-5 p-5">
      {/* foto project */}
      <div className="w-4/6 overflow-hidden rounded-lg shadow-md">
        <Carousel images={images} />
      </div>
      {/* desc project */}
      <div className="mt-5 flex w-2/6 flex-col justify-between">
        <div>
          <div>
            <h3 className="text-2xl font-semibold">{name}</h3>
            <span className="text-sm text-text/50">
              <p>{category}</p>
              <p>{year}</p>
            </span>
          </div>
          <p>{description}</p>
        </div>
        {/* technology */}
        <div className="flex gap-2">
          {techStack?.map((item, index) => (
            <IconWrapper key={index} icon={item.icon} tittle={item.title} />
          ))}
        </div>
      </div>
    </div>
  );
}
