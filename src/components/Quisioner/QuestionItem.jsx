import React from "react";
import { BooleanQuestion } from "./BooleanQuestion";

export const QuestionItem = ({ id, question, options, type, index = 1 }) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-gray-500 font-semibold">Question {index}</h1>
      {type === "BOOLEAN" ||
        (type === "MULTIPLE_CHOICE" && options?.length === 2 && (
          <BooleanQuestion
            id={id}
            question={question}
            options={options}
            type={type}
          />
        ))}
    </div>
  );
};
