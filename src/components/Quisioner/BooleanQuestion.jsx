import { quisionerStore } from "@/store/Quisioner/quisionerStore";
import React, { useState } from "react";
import { FaThumbsUp } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";

export const BooleanQuestion = ({ id, question, options, type, index = 1 }) => {
  const { userChoose } = quisionerStore();
  console.log({ userChoose });
  return (
    <section>
      <h1 className="font-bold text-lg mb-4">{question}?</h1>
      <div className="flex gap-5 justify-center">
        {options.length > 0 ? (
          options.map((option) => (
            <button
              className={`bg-gray-200 size-24 rounded-lg flex flex-col justify-center items-center gap-2 hover:bg-gray-300 transition-colors duration-300 relative  ${
                userChoose.optionId === option.id && "!bg-[#1b82e6] text-white"
              }`}
              onClick={() =>
                quisionerStore.setState({
                  userChoose: {
                    questionId: id,
                    optionId: option.id,
                    score: option.score,
                  },
                })
              }
            >
              <FaThumbsUp className="text-[#04ff00] size-10" />
              <p className="text-sm font-semibold">{option.title}</p>
            </button>
          ))
        ) : (
          <h1>Tidak ada Opsi </h1>
        )}
      </div>
    </section>
  );
};
