import { TableCategory } from "@/components/Dashboard/Admin/Category/TableCategory";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import React from "react";

const Category = () => {
  return (
    <div className="p-10">
      <Card>
        <Typography variant="h5" className="mx-6 mt-5 !text-black">
          Kategori
        </Typography>
        <CardBody className="!p-6">
          <TableCategory />
        </CardBody>
      </Card>
    </div>
  );
};

export default Category;
