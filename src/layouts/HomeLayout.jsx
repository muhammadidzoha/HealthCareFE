import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  Building,
  ChartBarStacked,
  CircleHelp,
  LayoutDashboard,
  LockKeyhole,
} from "lucide-react";
import { Outlet, useLocation } from "react-router-dom";

export default function HomeLayout() {
  const location = useLocation();

  const data = {
    user: {
      username: JSON.parse(localStorage.getItem("user"))?.username,
      email: JSON.parse(localStorage.getItem("user"))?.email,
      avatar: "https://docs.material-tailwind.com/img/face-2.jpg",
      // onClick: handleLogout,
    },
    teams: [
      {
        name: "Jalinan",
        logo: <img src="/logo.png" alt="logo" className="w-[25px]" />,
        subName: "Anak Sehat",
      },
    ],
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
        isActive: location.pathname === "/dashboard",
      },
      {
        title: "Kategori",
        url: "/dashboard/kategori",
        icon: ChartBarStacked,
        isActive: location.pathname === "/dashboard/kategori",
      },
      {
        title: "Pertanyaan",
        url: "/dashboard/pertanyaan",
        icon: CircleHelp,
        isActive: location.pathname.startsWith("/dashboard/pertanyaan"),
      },
      {
        title: "Admin",
        url: "/dashboard/admin",
        icon: LockKeyhole,
      },
      {
        title: "Instansi",
        url: "/dashboard/instansi",
        icon: Building,
      },
    ],
  };

  return (
    <div className="[--header-height:calc(theme(spacing.14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader data={data} />
        <div className="flex flex-1">
          <AppSidebar data={data} />
          <SidebarInset>
            <Outlet />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
