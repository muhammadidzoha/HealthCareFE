import { useState } from "react";
import { getAllQuestion } from "@/lib/API/Admin/Question/questionAPI";
import { Card, Typography, Button } from "@material-tailwind/react";
import useSWR from "swr";

const TABLE_HEAD = ["No", "Pertanyaan", "Tipe"];
const ITEMS_PER_PAGE = 10; // Menampilkan 10 data per halaman

export function TableQuestionParent({ title }) {
  const [currentPage, setCurrentPage] = useState(1);

  const question = async () => {
    const response = await getAllQuestion(localStorage.getItem("accessToken"));
    return response.data.quisioners.find((q) => q.title === title);
  };

  const { data, error, isLoading } = useSWR(["questions", title], question);

  console.log(data);

  // Hitung indeks data yang akan ditampilkan berdasarkan halaman aktif
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const displayedQuestions = data?.questions?.slice(startIndex, endIndex) || [];

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
  } else if (displayedQuestions.length > 0) {
    tableContent = displayedQuestions.map((q, index) => (
      <tr key={index} className="even:bg-[#f5f8ff]">
        <td className="p-4">
          <Typography variant="small" className="!font-medium !text-black">
            {startIndex + index + 1}
          </Typography>
        </td>
        <td className="p-4 max-w-xs whitespace-normal break-words">
          <Typography variant="small" className="!font-medium !text-black">
            {q.question}
          </Typography>
        </td>
        <td className="p-4">
          <Typography variant="small" className="!font-medium !text-black">
            {q.type}
          </Typography>
        </td>
      </tr>
    ));
  } else {
    tableContent = (
      <tr>
        <td colSpan={TABLE_HEAD.length} className="p-4 text-center">
          <Typography variant="small" className="text-black !font-normal">
            Tidak ada pertanyaan tersedia
          </Typography>
        </td>
      </tr>
    );
  }

  // Pagination Controls
  const totalPages = Math.ceil((data?.questions?.length || 0) / ITEMS_PER_PAGE);

  return (
    <Card className="h-full w-full overflow-scroll !shadow-none">
      <div>
        <h1>test</h1>
      </div>
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center py-4">
          <Button
            size="sm"
            className="!bg-[#1b82e6]"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Sebelumnya
          </Button>
          <Typography variant="small">
            Halaman {currentPage} dari {totalPages}
          </Typography>
          <Button
            size="sm"
            className="!bg-[#1b82e6]"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            Berikutnya
          </Button>
        </div>
      )}
    </Card>
  );
}
