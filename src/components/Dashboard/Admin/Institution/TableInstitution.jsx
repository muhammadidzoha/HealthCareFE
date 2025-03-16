import {
  deleteInstitution,
  getAllInstitution,
} from "@/lib/API/Admin/Institution/institutionAPI";
import {
  Card,
  Dialog,
  DialogBody,
  DialogHeader,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import useSWR from "swr";
import FormEditInstitution from "./FormEditInstitution";
import { Settings2, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

const TABLE_HEAD = [
  "No",
  "Nama",
  "Alamat",
  "Provinsi",
  "Kota/Kabupaten",
  "Aksi",
];

export function TableInstituion() {
  const [open, setOpen] = useState(false);
  const [selectedEdit, setSelectedEdit] = useState(null);

  const institution = async () => {
    const response = await getAllInstitution(
      localStorage.getItem("accessToken")
    );
    return response.data;
  };

  const { data, error, isLoading, mutate } = useSWR(
    "institutions",
    institution
  );

  const handleDelete = async (id) => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const handleLoading = delay(1000);

    toast.promise(
      handleLoading.then(() =>
        deleteInstitution(localStorage.getItem("accessToken"), id)
      ),
      {
        pending: "Loading...",
        success: {
          render(response) {
            return response.data.message;
          },
          onClose: () => mutate(),
        },
        error: {
          render(response) {
            return response.data.message;
          },
        },
      },
      {
        pauseOnFocusLoss: false,
        pauseOnHover: false,
        autoClose: 2000,
      }
    );
  };

  console.log(data);

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
    tableContent = data.map((i, index) => (
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
            {i.name}
          </Typography>
        </td>
        <td className="p-4">
          <Typography
            variant="small"
            className="!font-medium !text-black !capitalize"
          >
            {i.address}
          </Typography>
        </td>
        <td className="p-4">
          <Typography variant="small" className="!font-medium !text-black">
            {i.province?.name}
          </Typography>
        </td>
        <td className="p-4">
          <Typography variant="small" className="!font-medium !text-black">
            {i.city?.name}
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
                onClick={() => {
                  setOpen(!open);
                  setSelectedEdit(i);
                }}
                variant="text"
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
                onClick={() => handleDelete(i.id)}
                variant="text"
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
            Tidak ada instansi tersedia
          </Typography>
        </td>
      </tr>
    );
  }

  return (
    <Card className="h-full w-full overflow-scroll !shadow-none">
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
      {/* Dialog Edit */}
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
            <FormEditInstitution
              i={selectedEdit}
              setOpen={setOpen}
              mutateAdmin={mutate}
            />
          ) : (
            <Typography>Memuat data...</Typography>
          )}
        </DialogBody>
      </Dialog>

      {/* Dialog Delete */}
    </Card>
  );
}
