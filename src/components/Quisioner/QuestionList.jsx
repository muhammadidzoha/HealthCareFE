import React, { useEffect, useState } from "react";
import { QuestionItem } from "./QuestionItem";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useSearchParams } from "react-router-dom";

export const QuestionList = ({ questions = [], title, onSubmit = () => {} }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = +searchParams.get("q");
  const [progressValue, setProgressValue] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setProgressValue(Math.ceil((currentPage / questions.length) * 100));
  }, [searchParams.get("q")]);

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-md rounded-md w-2/4 p-4">
      <Progress
        value={progressValue}
        className="text-white [&>*]:!bg-[#00C758] mb-4"
      />

      <h1 className="mb-7 text-xl text-center font-bold">{title}</h1>
      <QuestionItem {...questions[currentIndex]} index={currentIndex + 1} />

      <form className="flex mt-6 gap-4 justify-between" onSubmit={(e) => {
        e.preventDefault();
        console.log({questions})
        onSubmit(searchParams.get("type"))
      }}>
        <Button
          className="max-w-24"
          variant="outline"
          onClick={() => {
            if (currentPage > 1) {
              setSearchParams(prevValue => ({
                ...Object.fromEntries(prevValue.entries()),
                  q: +searchParams.get("q") - 1,
              }));
              setCurrentIndex((prevValue) => prevValue - 1);
            }
          }}
          type="button"
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          className="max-w-24 min-w-24 bg-[#1b82e6]"
          onClick={() => {
            if (currentPage !== questions.length) {
              setSearchParams(prevValue => ({
                ...Object.fromEntries(prevValue.entries()),
                  q: +searchParams.get("q") + 1,
              }));
              setCurrentIndex((prevValue) => prevValue + 1);
            }
          }}
          type={currentPage === questions.length ? "submit" : "button"}
        >
          {currentPage === questions.length ? "Submit" : "Next"}
        </Button>
      </form>
    </div>
  );
};
