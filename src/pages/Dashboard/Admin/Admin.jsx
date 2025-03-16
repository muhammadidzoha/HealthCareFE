import FormAddAdmin from "@/components/Dashboard/Admin/Admin/FormAddAdmin";
import { TableAdmin } from "@/components/Dashboard/Admin/Admin/TableAdmin";
import {
  Button,
  Card,
  CardBody,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
} from "@material-tailwind/react";
import React, { useState } from "react";
import useSWR from "swr";

const Admin = () => {
  const [open, setOpen] = useState(false);
  const { mutate } = useSWR("admin");

  return (
    <div className="p-10">
      <Card className="">
        <div className="flex items-center justify-between">
          <Typography variant="h5" className="mx-6 mt-5 !text-black">
            Admin
          </Typography>
          <div className="flex flex-row items-center mx-6 mt-5">
            <Button
              fullWidth
              className="!bg-[#f07d82] !text-xs !font-normal"
              onClick={() => setOpen(!open)}
            >
              Tambah Admin
            </Button>
            <Dialog open={open} handler={() => setOpen(!open)}>
              <DialogHeader className="!p-0 !px-4 !pt-4 ">
                <Typography variant="h6" className="!text-black">
                  Tambah Admin
                </Typography>
              </DialogHeader>
              <DialogBody>
                <FormAddAdmin setOpen={setOpen} mutateAdmin={mutate} />
              </DialogBody>
            </Dialog>
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
