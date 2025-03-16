import { create } from "zustand";

export const userStore = create((set) => ({
  familyMembers: [],
  setFamilyMembers: (familyMembers) => {
    set((state) => ({
      familyMembers,
    }));
  },
}));
