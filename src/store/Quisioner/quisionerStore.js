import { create } from "zustand";
if (!JSON.parse(localStorage.getItem("USER_BOOLEAN_RESPONSE"))) {
  localStorage.setItem("USER_BOOLEAN_RESPONSE", JSON.stringify([]));
}

if (!JSON.parse(localStorage.getItem("USER_SCALE_RESPONSE"))) {
  localStorage.setItem("USER_SCALE_RESPONSE", JSON.stringify([]));
}

const userBooleanResponseLocalStorage = JSON.parse(
  localStorage.getItem("USER_BOOLEAN_RESPONSE")
);

const userScaleResponseLocalStorage = JSON.parse(
  localStorage.getItem("USER_SCALE_RESPONSE")
);

export const quisionerStore = create((set) => ({
  userChoose: {
    questionId: -1,
    optionId: -1,
    score: 0,
    booleanValue: null,
    scaleValue: 0,
  },
  userBooleanResponse: {
    questionId: -1,
    booleanValue: null,
    score: 0,
  },
  userScaleResponse: {
    questionId: -1,
    scaleValue: 0,
    score: 0,
  },
  userBooleanResponses:
    userBooleanResponseLocalStorage.length > 0
      ? userBooleanResponseLocalStorage
      : [],
  useScaleResponses:
    userScaleResponseLocalStorage.length > 0
      ? userScaleResponseLocalStorage
      : [],
}));
