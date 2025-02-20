import { Typography } from "@material-tailwind/react";
import React from "react";

const Cover = ({ title, children }) => {
  return (
    <div className="text-center">
      <Typography variant="h6">{title}</Typography>
      {children}
    </div>
  );
};

export default Cover;
