import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { LayoutDashboard } from "lucide-react";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function InstitutionLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken") || !localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    window.location.reload();
  };

  const data = {
    user: {
      username: JSON.parse(localStorage.getItem("user"))?.username,
      email: JSON.parse(localStorage.getItem("user"))?.email,
      avatar: "https://docs.material-tailwind.com/img/face-2.jpg",
      onClick: handleLogout,
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
        url: "/dashboard/school",
        icon: LayoutDashboard,
        isActive: location.pathname === "/dashboard/school",
      },
    ],
  };

  return (
    <div className="[--header-height:calc(theme(spacing.14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader onClick={data.user.onClick} data={data} />
        <div className="flex flex-1">
          <AppSidebar data={data} />
          <SidebarInset className="bg-[#f0f4fa] overflow-scroll">
            <Outlet />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
