import { getAllUsers } from "@/lib/API/Admin/Admin/adminAPI";
import { Card, Typography } from "@material-tailwind/react";
import useSWR from "swr";

const TABLE_HEAD = ["No", "Email", "Role", "Action"];

export function TableAdmin() {
  const admin = async () => {
    const response = await getAllUsers(localStorage.getItem("accessToken"));
    return response.data;
  };

  const { data, error, isLoading } = useSWR("admin", admin);

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
          <Typography variant="small" className="!font-medium !text-black">
            {admin.email}
          </Typography>
        </td>
        <td className="p-4">
          <Typography variant="small" className="!font-medium !text-black">
            {admin.role?.name}
          </Typography>
        </td>
        <td className="p-4">
          <Typography variant="small" className="!font-medium !text-black">
            Edit
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
