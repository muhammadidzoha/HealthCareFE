import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import DevelopmentLayout from "./components/Dashboard/Admin/Question/DevelopmentLayout";
import EducationLayout from "./components/Dashboard/Admin/Question/EducationLayout";
import HabitsLayout from "./components/Dashboard/Admin/Question/HabitsLayout";
import KnowledgeLayout from "./components/Dashboard/Admin/Question/KnowledgeLayout";
import LevelLayout from "./components/Dashboard/Admin/Question/LevelLayout";
import ManagementLayout from "./components/Dashboard/Admin/Question/ManagementLayout";
import ServicesLayout from "./components/Dashboard/Admin/Question/ServicesLayout";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { ResponseQuisionerPage } from "./components/Quisioner/ResponseQuisionerPage";
import AdminLayout from "./layouts/AdminLayout";
import AuthLayout from "./layouts/AuthLayout";
import HealthCareLayout from "./layouts/HealthCareLayout";
import InstitutionLayout from "./layouts/InstitutionLayout";
import LandingPageLayout from "./layouts/LandingPageLayout";
import ParentLayout from "./layouts/ParentLayout";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Admin from "./pages/Dashboard/Admin/Admin";
import Category from "./pages/Dashboard/Admin/Category";
import Home from "./pages/Dashboard/Admin/Home";
import Institution from "./pages/Dashboard/Admin/Institution";
import Question from "./pages/Dashboard/Admin/Question";
import HomeHealthCare from "./pages/Dashboard/HealthCare/HomeHealthCare";
import HomeInstitution from "./pages/Dashboard/Institution/HomeInstitution";
import { AddProfilePage } from "./pages/Dashboard/Parent/AddProfilePage";
import { FamilyFormPage } from "./pages/Dashboard/Parent/FamilyFormPage/FamilyFormPage";
import { ParentHomePage as HomeParent } from "./pages/Dashboard/Parent/HomeParent";
import { SelfProfilePage } from "./pages/Dashboard/Parent/SelfProfilePage";
import { MembersPage } from "./pages/Dashboard/Parent/Member/MembersPage";
import { ProfileFormPage } from "./pages/Dashboard/Parent/FamilyFormPage/ProfileFormPage";

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
            <Route
              path="profile/create"
              element={<ProfileFormPage buttonType={"SUBMIT"} />}
            />
            <Route
              path="profile/edit"
              element={
                <ProfileFormPage buttonType={"SUBMIT"} action="update" />
              }
            />
            <Route path="create" element={<FamilyFormPage />} />
            <Route
              path="quisioners/:id/response"
              element={<ResponseQuisionerPage />}
            />
            <Route path="members" element={<MembersPage />} />
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
