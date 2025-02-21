import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import LandingPageLayout from "./layouts/LandingPageLayout";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AuthLayout from "./layouts/AuthLayout";
import SignIn from "./pages/Auth/SignIn";
import Home from "./pages/Dashboard/Admin/Home";
import SignUp from "./pages/Auth/SignUp";
import HomeParent from "./pages/Dashboard/Parent/HomeParent";
import Category from "./pages/Dashboard/Admin/Category";
import Question from "./pages/Dashboard/Admin/Question";
import Admin from "./pages/Dashboard/Admin/Admin";
import Institution from "./pages/Dashboard/Admin/Institution";
import AdminLayout from "./layouts/AdminLayout";
import ParentLayout from "./layouts/ParentLayout";
import InstitutionLayout from "./layouts/InstitutionLayout";
import HealthCareLayout from "./layouts/HealthCareLayout";

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
            <Route path="pertanyaan" element={<Question />} />
            <Route path="admin" element={<Admin />} />
            <Route path="instansi" element={<Institution />} />
            <Route path="parent" element={<ParentLayout />}></Route>
            <Route path="institution" element={<InstitutionLayout />}></Route>
            <Route path="health-care" element={<HealthCareLayout />}></Route>
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
