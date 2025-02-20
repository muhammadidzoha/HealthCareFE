import { Typography } from "@material-tailwind/react";
import React from "react";
import ColourfulText from "../ui/colourful-text";

const Title = () => {
  return (
    <div>
      <Typography
        variant="h1"
        color="blue"
        className="block text-3xl font-bold text-gray-800 sm:text-4xl lg:text-5xl lg:leading-tight"
      >
        Sehatkan hidup dengan{" "}
        <Typography variant="h1" className="font-bold text-3xl lg:text-5xl">
          <ColourfulText text="Gizi Seimbang." />
        </Typography>
      </Typography>
      <Typography variant="paragraph" className="mt-3 text-lg text-gray-800">
        Pantau asupan gizi dengan mudah, dapatkan rekomendasi nutrisi yang
        tepat, dan wujudkan gaya hidup sehat untuk Anda dan keluarga.
      </Typography>
    </div>
  );
};

export default Title;
