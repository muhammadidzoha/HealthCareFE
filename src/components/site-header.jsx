import { SidebarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import DynamicBreadcrumb from "./Dashboard/DynamicBreadcrumb";
import { NavUser } from "./nav-user";

export function SiteHeader({ onClick, data }) {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="flex sticky top-0 z-50 w-full items-center bg-background shadow-md">
      <div className="flex h-[--header-height] w-full items-center gap-2 px-4">
        <Button
          className="h-8 w-8 md:hidden"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>
        {/* <Separator orientation="vertical" className="mr-2 h-4 !bg-gray-300" /> */}
        <DynamicBreadcrumb />
        <NavUser onClick={onClick} user={data.user} />
      </div>
    </header>
  );
}
