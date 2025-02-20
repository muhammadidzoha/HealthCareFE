import Grid1 from "@/components/Homepage/Home/Grid1";
import React from "react";

const Home = () => {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!localStorage.getItem("accessToken") || !localStorage.getItem("user")) {
  //     navigate("/");
  //   }
  // }, [navigate]);

  // const handleLogout = () => {
  //   localStorage.removeItem("accessToken");
  //   localStorage.removeItem("user");
  //   window.location.reload();
  // };

  return (
    <div className="flex flex-1 flex-col gap-8 p-8 bg-[#f0f4fa]">
      <Grid1 />
      <div className="min-h-[100vh] flex-1 rounded-xl bg-white md:min-h-min" />
    </div>
  );
};

export default Home;
