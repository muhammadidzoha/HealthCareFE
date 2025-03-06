import React from "react";

const Home = () => {
  return (
    <div className="flex flex-1 flex-col gap-8 p-8 bg-[#f0f4fa]">
      {/* <Grid1 /> */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white">1</div>
        <div className="bg-white col-span-2 row-span-2">2</div>
        <div className="bg-white">3</div>
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-white md:min-h-min" />
    </div>
  );
};

export default Home;
