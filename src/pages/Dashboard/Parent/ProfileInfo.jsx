import React from "react";

export const ProfileInfo = ({ label, value }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-slate-500 font-semibold">{label}</label>
      <h1>{value}</h1>
    </div>
  );
};
