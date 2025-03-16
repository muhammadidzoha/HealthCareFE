import { ProfileInfo } from "./ProfileInfo";

export const ProfileNutrition = () => {
  return (
    <div className="mt-6 border p-4 rounded-xl">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold">Nutrition Information</h1>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <ProfileInfo label={"Weight"} value={"70 kg"} />
        <ProfileInfo label={"Height"} value={"170 cm"} />
        <ProfileInfo label={"BMI"} value={"24.2"} />
        <ProfileInfo label={"Nutrition Status"} value={"Normal"} />
      </div>
    </div>
  );
};
