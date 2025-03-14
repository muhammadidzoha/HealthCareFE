import Grid1 from "@/components/Dashboard/Admin/Home/Grid1";
import Grid2 from "@/components/Dashboard/Admin/Home/Grid2";
import { useSidebar } from "@/components/ui/sidebar";
import React from "react";

const Home = () => {
  const { open } = useSidebar();

  console.log(open);

  return (
    <div className="flex flex-1 flex-col gap-5 p-8 bg-[#f0f4fa]">
      <Grid1
        child1={
          <div>
            <h1>TEST</h1>
          </div>
        }
        child2={
          <div>
            <h1>TING</h1>
          </div>
        }
      />
      <Grid2 />
      <div className="min-h-[100vh] flex-1 rounded-xl bg-white mqd:min-h-min" />
    </div>
  );
};

export default Home;
