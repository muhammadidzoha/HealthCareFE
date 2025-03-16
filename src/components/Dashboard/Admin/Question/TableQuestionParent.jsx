import { useState } from "react";
import { getAllQuestion } from "@/lib/API/Admin/Question/questionAPI";
import {
  Card,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
} from "@material-tailwind/react";
import useSWR from "swr";
import { Settings2 } from "lucide-react";
import { QuestionForm } from "./QuestionForm";

const TABLE_HEAD = ["No", "Pertanyaan", "Tipe", "Aksi"];
const ITEMS_PER_PAGE = 10; // Menampilkan 10 data per halaman

export function TableQuestionParent({ title }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const question = async () => {
    const response = await getAllQuestion(localStorage.getItem("accessToken"));
    return response.data.quisioners.find((q) => q.title === title);
  };

  console.log(selectedQuestion);

  const { data, error, isLoading } = useSWR(["questions", title], question);

  let groupedQuestions = [];
  let lastStratification = null;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const displayedQuestions = data?.questions?.slice(startIndex, endIndex) || [];

  console.log(displayedQuestions);

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
      <>
        <tr key={index} className="even:bg-[#f5f8ff] border">
          <td className="p-4 border" rowSpan={q.options?.length || 1}>
            <Typography
              variant="small"
              className="!font-medium !text-black text-center"
            >
              {startIndex + index + 1}
            </Typography>
          </td>
          <td
            className="p-4 max-w-xs whitespace-normal break-words border"
            rowSpan={q.options?.length || 1}
          >
            <Typography variant="small" className="!font-medium !text-black">
              {q.question}
            </Typography>
          </td>
          <td className="p-4 border" rowSpan={q.options?.length || 1}>
            <Typography variant="small" className="!font-medium !text-black">
              {q.type}
            </Typography>
          </td>
          {q.options?.length > 0 ? (
            <>
              <td className="p-4 border text-center">
                <Typography
                  variant="small"
                  className="!font-medium !text-black"
                >
                  1
                </Typography>
              </td>
              <td className="p-4 border">
                <Typography
                  variant="small"
                  className="!font-medium !text-black"
                >
                  {q.options[0].title}
                </Typography>
              </td>
              <td className="p-4 border">
                <Typography
                  variant="small"
                  className="!font-medium !text-black"
                >
                  {q.options[0].score}
                </Typography>
              </td>
              <td className="py-4 text-center" rowSpan={q.options?.length || 1}>
                <IconButton
                  className="!text-[#1b82e6] !min-w-[60px]"
                  onClick={() => {
                    setOpen(!open);
                    setSelectedQuestion(q);
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
              </td>
            </>
          ) : (
            <td colSpan={3} className="p-4 border text-center">
              <Typography variant="small" className="!font-medium !text-black">
                Tidak ada opsi
              </Typography>
            </td>
          )}
        </tr>
        {q.options?.slice(1).map((o, idx) => (
          <tr key={o.index} className="even:bg-[#f5f8ff] border">
            <td className="p-4 border text-center">
              <Typography variant="small" className="!font-medium !text-black">
                {idx + 2}
              </Typography>
            </td>
            <td className="p-4 border">
              <Typography variant="small" className="!font-medium !text-black">
                {o.title}
              </Typography>
            </td>
            <td className="p-4 border">
              <Typography variant="small" className="!font-medium !text-black">
                {o.score}
              </Typography>
            </td>
          </tr>
        ))}
      </>
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

  const totalPages = Math.ceil((data?.questions?.length || 0) / ITEMS_PER_PAGE);

  return (
    <Card className="h-full w-full overflow-scroll !shadow-none">
      <Dialog open={open} handler={() => setOpen(!open)}>
        <DialogHeader>Edit Pertanyaan</DialogHeader>
        <DialogBody>
          <QuestionForm />
        </DialogBody>
        <DialogFooter>
          <Button>Simpan</Button>
        </DialogFooter>
      </Dialog>
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            <th
              colSpan={2}
              className="bg-[#f5f8ff] p-4 text-black text-center border"
            >
              <Typography variant="small" className="font-bold leading-none">
                Pertanyaan
              </Typography>
            </th>
            <th
              rowSpan={2}
              className="bg-[#f5f8ff] p-4 text-black border text-center"
            >
              <Typography variant="small" className="font-bold leading-none">
                Tipe
              </Typography>
            </th>
            <th
              colSpan={4}
              className="bg-[#f5f8ff] p-4 text-black text-center border"
            >
              <Typography variant="small" className="font-bold leading-none">
                Opsi
              </Typography>
            </th>
          </tr>
          <tr>
            <th className="bg-[#f5f8ff] p-4 text-black border">
              <Typography variant="small" className="font-bold leading-none">
                Nomor
              </Typography>
            </th>
            <th className="bg-[#f5f8ff] p-4 text-black border">
              <Typography variant="small" className="font-bold leading-none">
                Title
              </Typography>
            </th>
            <th className="bg-[#f5f8ff] p-4 text-black border">
              <Typography variant="small" className="font-bold leading-none">
                Nomor
              </Typography>
            </th>
            <th className="bg-[#f5f8ff] p-4 text-black border">
              <Typography variant="small" className="font-bold leading-none">
                Title
              </Typography>
            </th>
            <th className="bg-[#f5f8ff] p-4 text-black border">
              <Typography variant="small" className="font-bold leading-none">
                Skor
              </Typography>
            </th>
            <th className="bg-[#f5f8ff] p-4 text-black border">
              <Typography variant="small" className="font-bold leading-none">
                Aksi
              </Typography>
            </th>
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
