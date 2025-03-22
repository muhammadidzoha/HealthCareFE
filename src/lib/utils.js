import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getInitials = (name) => {
  name
    .split(" ")
    .map((n) => n[0])
    .join("");
};

export const mapMemberPayload = (familyData) => ({
  fullName: familyData.profile.fullName,
  birthDate: new Date(familyData.selfBirthDate),
  education: familyData.profile.education.toUpperCase(),
  relation: familyData.profile.relation,
  gender: familyData.profile.gender,
  ...(familyData.profile.phoneNumber && {
    phoneNumber: familyData.profile.phoneNumber,
  }),
  residence: {
    status: familyData.residence.status,
    address: familyData.residence.address,
    description: familyData.residence.description,
  },
  job: {
    jobTypeId: familyData.job.jobTypeId,
    income: familyData.job.income,
  },
  ...(!!familyData.institutionId && {
    institutionId: familyData.institutionId,
  }),
  nutrition: {
    height: familyData.nutrition.height,
    weight: familyData.nutrition.weight,
    birth_weight: familyData.nutrition.birth_weight,
  },
  ...(familyData.class && {
    class: `${familyData.class}`,
  }),
});

export const formatBirthDate = (date) => {
  if(!date) {
    return "-";
  }
  return new Date(date).toISOString().split("T")[0];
}