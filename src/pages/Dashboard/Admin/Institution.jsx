import FormAddInstitution from "@/components/Dashboard/Admin/Institution/FormAddInstitution";
import { TableInstituion } from "@/components/Dashboard/Admin/Institution/TableInstitution";
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

const Institution = () => {
  const [open, setOpen] = useState(false);
  const { mutate } = useSWR("institutions");

  return (
    <div className="p-10">
      <Card>
        <div className="flex items-center justify-between">
          <Typography variant="h5" className="mx-6 mt-5 !text-black">
            Instansi
          </Typography>
          <div className="flex items-center mx-6 mt-5">
            <Button
              fullWidth
              className="!bg-[#f07d82] !text-xs !font-normal"
              onClick={() => setOpen(!open)}
            >
              Tambah Instansi
            </Button>
            <Dialog open={open} handler={() => setOpen(!open)}>
              <DialogHeader>
                <Typography variant="h6" className="!text-black">
                  Tambah Instansi
                </Typography>
              </DialogHeader>
              <DialogBody>
                <FormAddInstitution setOpen={setOpen} mutateAdmin={mutate} />
              </DialogBody>
            </Dialog>
          </div>
        </div>
        <CardBody className="!p-6">
          <TableInstituion />
        </CardBody>
      </Card>
    </div>
  );
};

export default Institution;
