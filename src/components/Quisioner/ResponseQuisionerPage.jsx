import { getQuisionerById } from "@/lib/API/Parent/parentApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { QuestionList } from "./QuestionList";

export const ResponseQuisionerPage = () => {
  const dummy = [
    {
      id: 1,
      quisioner_id: 1,
      question: "Anak Sekolah yang sehat adalah yang memiliki badan gemuk",
      type: "MULTIPLE_CHOICE",
      created_at: "2025-03-15T17:49:32.740Z",
      updated_at: "2025-03-15T17:49:32.740Z",
      is_required: true,
      options: [
        {
          id: 1,
          question_id: 1,
          title: "Benar",
          score: 0,
          created_at: "2025-03-15T17:49:32.770Z",
        },
        {
          id: 2,
          question_id: 1,
          title: "Salah",
          score: 1,
          created_at: "2025-03-15T17:49:32.770Z",
        },
      ],
    },
  ];
  const [quisioners, setQuisioners] = useState();
  const { id } = useParams();
  useEffect(() => {
    const fetchQuisioner = async () => {
      const { data } = await getQuisionerById(id);
      console.log({ data });

      setQuisioners(data);
    };
    fetchQuisioner();
  }, []);
  console.log({ quisioners });
  return (
    <article className="p-4 relative h-full">
      {/* <QuestionList questions={quisioners?.questions ?? []} /> */}
      <QuestionList {...quisioners} />
    </article>
  );
};
