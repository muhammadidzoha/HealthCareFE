import { TableAdmin } from "@/components/Dashboard/Admin/Admin/TableAdmin";
import {
  Button,
  Card,
  CardBody,
  Input,
  Typography,
} from "@material-tailwind/react";
import React from "react";

const Admin = () => {
  return (
    <div className="p-10">
      <Card>
        <div className="flex items-center justify-between">
          <Typography variant="h5" className="mx-6 mt-5 !text-black">
            Admin
          </Typography>
          <div className="flex items-center gap-5 mx-6 mt-5">
            <Input label="Search" />
            <Button fullWidth className="!bg-[#f07d82]">
              Tambah Admin
            </Button>
          </div>
        </div>
        <CardBody className="!p-6">
          <TableAdmin />
        </CardBody>
      </Card>
    </div>
  );
};

export default Admin;
