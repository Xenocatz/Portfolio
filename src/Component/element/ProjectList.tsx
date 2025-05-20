export default function ProjectList({
  projectName,
  bgClass,
  active,
}: {
  projectName: string;
  bgClass?: string;
  active?: boolean;
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
