import { quisionerStore } from "@/store/Quisioner/quisionerStore";
import React from "react";

import { RiEmotionSadLine } from "react-icons/ri";
import { RiEmotionNormalLine } from "react-icons/ri";
import { RiEmotionLaughLine } from "react-icons/ri";
import { RiEmotionLine } from "react-icons/ri";

export const ScaleQuestion = ({
  id,
  question,
  options,
  type,
  index = 1,
  order = "asc",
}) => {
  const {
    userScaleResponse,
    userScaleResponses,
    userBooleanResponse,
    userBooleanResponses,
  } = quisionerStore();

  const handleChooseAnswer = (id, optionId, score) => {
    quisionerStore.setState((prevState) => {
      const userBooleanResponses = [...prevState.userBooleanResponses];

      const isAlreadyAnswered = userBooleanResponses.findIndex(
        (answer) => answer.questionId === id
      );

      if (isAlreadyAnswered === -1) {
        userBooleanResponses.push({
          questionId: id,
          optionId: optionId,
          score: score,
        });
      } else if (isAlreadyAnswered !== -1) {
        userBooleanResponses[isAlreadyAnswered] = {
          questionId: id,
          optionId,
          score,
        };
      }

      return {
        userBooleanResponses,
        userBooleanResponse: {
          questionId: id,
          optionId: optionId,
          score,
        },
      };
    });
  };
  return (
    <section>
      <h1 className="font-bold text-lg mb-4">{question}?</h1>
      <div className="flex gap-5 justify-center">
        {options.length > 0 ? (
          options.map((option, index) => (
            <button
              className={`bg-gray-200 size-24 rounded-lg flex flex-col justify-center items-center gap-2 hover:bg-gray-300 transition-colors duration-300 text-[10px] font-semibold p-1 ${
                userBooleanResponse.optionId === option.id &&
                "!bg-[#1b82e6] text-white"
              }`}
              onClick={() => {
                handleChooseAnswer(id, option.id, option.score);
              }}
            >
              {index === 0 && <RiEmotionSadLine className="text-[#04ff00] size-10" />}
              {index === 1 && <RiEmotionNormalLine className="text-[#04ff00] size-10" />}
              {index === 2 && <RiEmotionLine className="text-[#04ff00] size-10" />}
              {index === 3 && <RiEmotionLaughLine className="text-[#04ff00] size-10" />}
              {option.title.toLowerCase()}
            </button>
          ))
        ) : (
          <h1>Tidak ada Opsi </h1>
        )}
      </div>
    </section>
  );
};
