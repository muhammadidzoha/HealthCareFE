import { create } from "zustand";

export const quisionerStore = create((set) => ({
  userChoose: {
    questionId: -1,
    optionId: -1,
    score: 0,
  },
}));
