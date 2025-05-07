export default function ProjectList({
  projectName,
  projectLogo,
  bgClass,
  year,
  category,
  index,
  active,
}: {
  projectName: string;
  projectLogo?: string;
  bgClass?: string;
  active?: boolean;
  year: string;
  category: string;
  index: number;
}) {
  return (
    <li className="flex flex-grow overflow-hidden">
      <div
        className={`flex w-full items-center gap-3 py-5 pr-10 pl-5 ${active ? "bg-transparent" : "bg-surface"}`}
      >
        <h3 className="text-xl">{projectName}</h3>
      </div>
      <div
        className={`w-2 ${
          active ? `${bgClass}` : "bg-text/30"
        } h-fill rounded-full`}
      />
    </li>
  );
}
