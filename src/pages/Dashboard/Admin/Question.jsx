import { getAllCategory } from "@/lib/API/Admin/Category/categoryAPI";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import useSWR from "swr";

const Question = () => {
  const links = [
    "",
    "level",
    "education",
    "habit",
    "service",
    "development",
    "management",
  ];

  const category = async () => {
    const response = await getAllCategory(localStorage.getItem("accessToken"));

    return response.data.map((title, index) => ({
      id: index + 1,
      title,
      url: links[index] || "",
    }));
  };

  const { data, error, isLoading } = useSWR("categories", category);

  let categoryContent;

  if (isLoading) {
    categoryContent = [...Array(7)].map((_, index) => (
      <div key={index} className="animate-pulse w-[200px] h-5 bg-gray-300" />
    ));
  } else if (data && data.length > 0) {
    categoryContent = data.map((category, index) => (
      <NavLink
        key={index}
        to={`${category.url}`}
        end={category.url === ""}
        className={({ isActive }) =>
          `relative text-[#1b82e6] font-medium text-sm
          after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-3 after:w-1/2 after:h-[3px] after:bg-[#1b82e6] 
          after:origin-left after:scale-x-0 after:transition-transform after:duration-300 
          ${isActive ? "after:scale-x-100" : "text-[#9e9e9e]"}`
        }
      >
        {category.title}
      </NavLink>
    ));
  } else {
    categoryContent = (
      <Typography variant="small" className="text-black !font-normal">
        Tidak ada kategori tersedia
      </Typography>
    );
  }

  return (
    <div className="p-10">
      <Card>
        <Typography variant="h5" className="mx-6 mt-5 !text-black">
          List Pertanyaan
        </Typography>
        <div className="mx-6 mt-5 flex items-center flex-wrap gap-5">
          {categoryContent}
        </div>
        <CardBody className="!p-6">
          <Outlet />
        </CardBody>
      </Card>
    </div>
  );
};

export default Question;
