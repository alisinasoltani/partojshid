import Link from "next/link";
import { ArrowLeft } from "lucide-react";


const ProjectButton = ({ href, onClick }: { href: string, onClick: () => void }) => {
  return (
    <button
      className="flex flex-row items-center gap-1 md:gap-2 rounded-full bg-[#5E55FF] px-4 py-1.5 text-[10px] md:text-sm text-white transition-transform hover:scale-105"
      onClick={onClick}
    >
      <Link href={href ?? "#"} className="irsans_med">مشاهده بیشتر</Link>
      <ArrowLeft size={16} />
    </button>
  );
};

export default ProjectButton;