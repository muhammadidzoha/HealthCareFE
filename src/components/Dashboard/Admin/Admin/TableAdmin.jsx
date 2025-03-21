import { deleteUser, getAllUsers } from "@/lib/API/Admin/Admin/adminAPI";
import {
  Card,
  Dialog,
  DialogBody,
  DialogHeader,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { Settings2, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import FormEditAdmin from "./FormEditAdmin";

const TABLE_HEAD = ["No", "Nama", "Instansi", "Email", "No Telepon", "Aksi"];

export function TableAdmin() {
  const [open, setOpen] = useState(false);
  const [selectedEdit, setSelectedEdit] = useState(null);

  const admin = async () => {
    const response = await getAllUsers(localStorage.getItem("accessToken"));
    return response.data;
  };

  const { data, error, isLoading, mutate } = useSWR("admin", admin);

  const handleDelete = async (id) => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const handleLoading = delay(1000);

    toast.promise(
      handleLoading.then(() =>
        deleteUser(localStorage.getItem("accessToken"), id)
      ),
      {
        pending: "Loading...",
        success: {
          render(response) {
            return response.data.message;
          },
          onClose: () => mutate(null, { revalidate: true }),
        },
      }
    );
  };

  let tableContent;

  if (isLoading) {
    tableContent = [...Array(10)].map((_, index) => (
      <tr key={index}>
        <td className="p-4">
          <div className="h-[30px] w-full bg-gray-100 animate-pulse rounded"></div>
        </td>
        <td className="p-4">
          <div className="h-[30px] w-full bg-gray-100 animate-pulse rounded"></div>
        </td>
      </tr>
    ));
  } else if (data && data.length > 0) {
    tableContent = data.map((admin, index) => (
      <tr key={index} className="even:bg-[#f5f8ff]">
        <td className="p-4">
          <Typography variant="small" className="!font-medium !text-black">
            {index + 1}
          </Typography>
        </td>
        <td className="p-4">
          <Typography
            variant="small"
            className="!font-medium !text-black !capitalize"
          >
            {admin.username}
          </Typography>
        </td>
        <td className="p-4">
          <Typography variant="small" className="!font-medium !text-black">
            {admin.institution?.name ?? "Admin"}
          </Typography>
        </td>
        <td className="p-4">
          <Typography variant="small" className="!font-medium !text-black">
            {admin.email}
          </Typography>
        </td>
        <td className="p-4">
          <Typography variant="small" className="!font-medium !text-black">
            {admin.institution?.phone_number ?? "-"}
          </Typography>
        </td>
        <td className="py-4 px-2">
          <Typography
            as="div"
            variant="small"
            className="!font-medium !text-black"
          >
            <div className="flex items-center gap-4">
              <IconButton
                className="!text-[#1b82e6] !min-w-[60px]"
                variant="text"
                onClick={() => {
                  setOpen(!open);
                  setSelectedEdit(admin);
                }}
              >
                <div className="flex items-center gap-2">
                  <Settings2 size={14} />
                  <Typography
                    variant="small"
                    className="!font-normal !capitalize"
                  >
                    Edit
                  </Typography>
                </div>
              </IconButton>
              <IconButton
                className="!text-[#f07d82] !min-w-[80px]"
                variant="text"
                onClick={() => handleDelete(admin.id)}
              >
                <div className="flex items-center gap-2">
                  <Trash2 size={14} />
                  <Typography
                    variant="small"
                    className="!font-normal !capitalize"
                  >
                    Delete
                  </Typography>
                </div>
              </IconButton>
            </div>
          </Typography>
        </td>
      </tr>
    ));
  } else {
    tableContent = (
      <tr>
        <td colSpan={TABLE_HEAD.length} className="p-4 text-center">
          <Typography variant="small" className="text-black !font-normal">
            Tidak ada kategori tersedia
          </Typography>
        </td>
      </tr>
    );
  }

  return (
    <Card className="h-full w-full overflow-scroll !shadow-none">
      <Dialog
        open={open}
        handler={() => setOpen(!open)}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>
          <Typography variant="h5">Edit Instansi</Typography>
        </DialogHeader>
        <DialogBody>
          {selectedEdit ? (
            <FormEditAdmin
              a={selectedEdit}
              setOpen={setOpen}
              mutateAdmin={mutate}
            />
          ) : (
            <Typography>Memuat data...</Typography>
          )}
        </DialogBody>
      </Dialog>
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="bg-[#f5f8ff] p-4 text-black">
                <Typography variant="small" className="font-bold leading-none">
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    </Card>
  );
}
