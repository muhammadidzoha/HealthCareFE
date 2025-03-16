import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import LandingPageLayout from "./layouts/LandingPageLayout";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AuthLayout from "./layouts/AuthLayout";
import SignIn from "./pages/Auth/SignIn";
import Home from "./pages/Dashboard/Admin/Home";
import SignUp from "./pages/Auth/SignUp";
// import HomeParent from "./pages/Dashboard/Parent/HomeParent";
import { ParentHomePage as HomeParent } from "./pages/Dashboard/Parent/HomeParent";
import Category from "./pages/Dashboard/Admin/Category";
import Question from "./pages/Dashboard/Admin/Question";
import Admin from "./pages/Dashboard/Admin/Admin";
import Institution from "./pages/Dashboard/Admin/Institution";
import AdminLayout from "./layouts/AdminLayout";
import ParentLayout from "./layouts/ParentLayout";
import InstitutionLayout from "./layouts/InstitutionLayout";
import HealthCareLayout from "./layouts/HealthCareLayout";
import HomeInstitution from "./pages/Dashboard/Institution/HomeInstitution";
import HomeHealthCare from "./pages/Dashboard/HealthCare/HomeHealthCare";
import KnowledgeLayout from "./components/Dashboard/Admin/Question/KnowledgeLayout";
import LevelLayout from "./components/Dashboard/Admin/Question/LevelLayout";
import EducationLayout from "./components/Dashboard/Admin/Question/EducationLayout";
import HabitsLayout from "./components/Dashboard/Admin/Question/HabitsLayout";
import ServicesLayout from "./components/Dashboard/Admin/Question/ServicesLayout";
import DevelopmentLayout from "./components/Dashboard/Admin/Question/DevelopmentLayout";
import ManagementLayout from "./components/Dashboard/Admin/Question/ManagementLayout";
import { SelfProfilePage } from "./pages/Dashboard/Parent/SelfProfilePage";
import { AddProfilePage } from "./pages/Dashboard/Parent/AddProfilePage";
import { ResponseQuisionerPage } from "./components/Quisioner/ResponseQuisionerPage";

function App() {
  const location = useLocation();
  const accessToken = localStorage.getItem("accessToken");
  const isAuthPage = location.pathname.startsWith("/auth");
  const isDashboardPage = location.pathname.startsWith("/dashboard");
  const hideHeaderFooter = isAuthPage || (isDashboardPage && accessToken);

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <main>
        {!hideHeaderFooter && <Header />}
        <Routes>
          <Route path="/" element={<Navigate to="/landing-page" replace />} />
          <Route path="/landing-page" element={<LandingPageLayout />} />
          <Route path="/dashboard" element={<AdminLayout />}>
            <Route index element={<Home />} />
            <Route path="kategori" element={<Category />} />
            <Route path="pertanyaan" element={<Question />}>
              <Route index element={<KnowledgeLayout />} />
              <Route path="level" element={<LevelLayout />} />
              <Route path="education" element={<EducationLayout />} />
              <Route path="habit" element={<HabitsLayout />} />
              <Route path="service" element={<ServicesLayout />} />
              <Route path="development" element={<DevelopmentLayout />} />
              <Route path="management" element={<ManagementLayout />} />
            </Route>
            <Route path="admin" element={<Admin />} />
            <Route path="instansi" element={<Institution />} />
          </Route>

          <Route path="/dashboard/school" element={<InstitutionLayout />}>
            <Route index element={<HomeInstitution />} />
          </Route>

          <Route path="/dashboard/parent" element={<ParentLayout />}>
            <Route index element={<HomeParent />} />
            <Route path="profile" element={<SelfProfilePage />} />
            <Route path="profile/create" element={<AddProfilePage />} />
            <Route
              path="quisioners/:id/response"
              element={<ResponseQuisionerPage />}
            />
          </Route>

          <Route path="/dashboard/health-care" element={<HealthCareLayout />}>
            <Route index element={<HomeHealthCare />} />
          </Route>

          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<SignIn />} />
            <Route path="register" element={<SignUp />} />
          </Route>
        </Routes>
      </main>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

export default App;
