import { getQuisionerById, reponseQuisioner } from "@/lib/API/Parent/parentApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { QuestionList } from "./QuestionList";
import { quisionerStore } from "@/store/Quisioner/quisionerStore";
import { toast } from "react-toastify";

export const ResponseQuisionerPage = () => {
  const [quisioners, setQuisioners] = useState();
  const {userBooleanResponses} = quisionerStore();
  const { id } = useParams();
  useEffect(() => {
    const fetchQuisioner = async () => {
      const { data } = await getQuisionerById(id);

      setQuisioners(data);
    };
    fetchQuisioner();
  }, []);

  const handleSubmit = async (type = "") => {
    if(type === "MULTIPLE_CHOICE" || type === "SCALE") {
      console.log({userBooleanResponses})
      console.log("Submit from multiple choice and scale");
      const { data } = await reponseQuisioner(id, userBooleanResponses);

      toast.success(`${data.message ?? "Data Berhasil Disimpan"}`, {
        onClose: () => {
            navigate('/dashboard/parent')
        },
        autoClose: 1500
    })
    }
  }
  console.log({ quisioners });
  return (
    <article className="p-4 relative h-full">
      {/* <QuestionList questions={quisioners?.questions ?? []} /> */}
      <QuestionList {...quisioners} onSubmit={handleSubmit}/>
    </article>
  );
};
