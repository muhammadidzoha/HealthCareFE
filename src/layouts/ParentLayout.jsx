import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { userStore } from "@/store/users/userStore";
import { LayoutDashboard } from "lucide-react";
import { useEffect } from "react";
import { MdOutlineFamilyRestroom } from "react-icons/md";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function ParentLayout() {
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
  const { userLogin } = userStore();

  const data = {
    user: {
      username: JSON.parse(localStorage.getItem("user"))?.username,
      email: JSON.parse(localStorage.getItem("user"))?.email,
      avatar:
        `${import.meta.env.VITE_BASE_URL}public/${userLogin?.avatar}` ??
        import.meta.env.VITE_DEFAULT_AVATAR,
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
        url: "/dashboard/parent",
        icon: LayoutDashboard,
        isActive: location.pathname === "/dashboard/parent",
      },
      {
        title: "Keluarga",
        url: "/dashboard/parent/members",
        icon: MdOutlineFamilyRestroom,
        isActive: location.pathname === "/dashboard/parent/members",
      },
    ],
  };

  useEffect(() => {
    const data = {
      user: {
        username: JSON.parse(localStorage.getItem("user"))?.username,
        email: JSON.parse(localStorage.getItem("user"))?.email,
        avatar:
          `${import.meta.env.VITE_BASE_URL}public/${userLogin?.avatar}` ??
          import.meta.env.VITE_DEFAULT_AVATAR,
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
          url: "/dashboard/parent",
          icon: LayoutDashboard,
          isActive: location.pathname === "/dashboard/parent",
        },
        {
          title: "Keluarga",
          url: "/dashboard/parent/members",
          icon: MdOutlineFamilyRestroom,
          isActive: location.pathname === "/dashboard/parent/members",
        },
      ],
    };
  }, [userLogin]);

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
