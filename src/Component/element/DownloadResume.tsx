import { FileUser } from "lucide-react";

export default function DownloadResume() {
  return (
    <button className="group relative cursor-pointer p-[2px]">
      <div className="highlight-text relative flex items-center justify-center gap-2 rounded-lg border border-cyan-700/50 bg-gray-800 p-2 text-cyan-400/80">
        <FileUser className="inline-block" />
        download resume
      </div>
    </button>
  );
}
