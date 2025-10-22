import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";
import { InstagramIcon } from "../icons/InstagramIcon";
import { DocsIcon } from "../icons/DocsIcon";
import { PdfIcon } from "../icons/PdfIcon";
import { LinkIcon } from "../icons/LinkIcon";

interface SidebarProps {
  setFilter: (filter: string | null) => void;
}

export function Sidebar({ setFilter }: SidebarProps) {
  return (
    // Sidebar hidden on mobile
    <div className="hidden md:flex flex-col h-screen bg-gray-300 border-r w-72 fixed left-0 top-0 pl-4">
      <div className="flex gap-2 items-center pt-2 pb-6 -ml-2">
        <Logo />
        <div className="font-bold text-2xl text-indigo-600">Brainly</div>
      </div>
      <div className="mt-2 flex flex-col gap-2">
        <SidebarItem text="All" onClick={() => setFilter(null)} />
        <SidebarItem text="Twitter" icon={<TwitterIcon />} onClick={() => setFilter("twitter")} />
        <SidebarItem text="YouTube" icon={<YoutubeIcon />} onClick={() => setFilter("youtube")} />
        <SidebarItem text="Instagram" icon={<InstagramIcon />} onClick={() => setFilter("instagram")} />
        <SidebarItem text="Google Docs" icon={<DocsIcon />} onClick={() => setFilter("gdocs")} />
        <SidebarItem text="PDF" icon={<PdfIcon />} onClick={() => setFilter("pdf")} />
        <SidebarItem text="Links" icon={<LinkIcon />} onClick={() => setFilter("link")} />
      </div>
    </div>
  );
}