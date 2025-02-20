import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import LandingPageLayout from "./layouts/LandingPageLayout";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AuthLayout from "./layouts/AuthLayout";
import SignIn from "./pages/Auth/SignIn";
import HomeLayout from "./layouts/HomeLayout";
import HomeParentLayout from "./layouts/HomeParentLayout";
import HomeInstitutionLayout from "./layouts/HomeInstitutionLayout";
import Home from "./pages/Homepage/Home/Home";
import SignUp from "./pages/Auth/SignUp";
import HomeParent from "./pages/Homepage/Parent/HomeParent";
import Category from "./pages/Homepage/Home/Category";
import Question from "./pages/Homepage/Home/Question";
import Admin from "./pages/Homepage/Home/Admin";
import Institution from "./pages/Homepage/Home/Institution";

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
          <Route path="/dashboard" element={<HomeLayout />}>
            <Route index element={<Home />} />
            <Route path="kategori" element={<Category />} />
            <Route path="pertanyaan" element={<Question />} />
            <Route path="admin" element={<Admin />} />
            <Route path="instansi" element={<Institution />} />
          </Route>
          <Route path="/dashboard/parent" element={<HomeParentLayout />}>
            <Route index element={<HomeParent />} />
          </Route>
          <Route
            path="/dashboard/institution"
            element={<HomeInstitutionLayout />}
          ></Route>
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
