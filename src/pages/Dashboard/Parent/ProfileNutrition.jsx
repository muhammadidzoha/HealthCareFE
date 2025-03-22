import { userStore } from "@/store/users/userStore";
import { ProfileInfo } from "./ProfileInfo";

export const ProfileNutrition = () => {
  const { userLogin } = userStore();
  return (
    <div className="mt-6 border p-4 rounded-xl">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold">Nutrition Information</h1>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {!!userLogin && userLogin.nutrition.length > 0 && (
          <>
            <ProfileInfo
              label={"Weight"}
              value={userLogin?.nutrition[0]?.weight ?? "-"}
            />
            <ProfileInfo
              label={"Height"}
              value={userLogin?.nutrition[0]?.height ?? "-"}
            />
            <ProfileInfo
              label={"BMI"}
              value={userLogin?.nutrition[0]?.bmi ?? "-"}
            />
            <ProfileInfo
              label={"Nutrition Status"}
              value={userLogin?.nutrition[0]?.nutrition_status?.status ?? "-"}
            />
          </>
        )}
        {!userLogin && (
          <>
            <ProfileInfo label={"Weight"} value={"-"} />
            <ProfileInfo label={"Height"} value={"-"} />
            <ProfileInfo label={"BMI"} value={"-"} />
            <ProfileInfo label={"Nutrition Status"} value={"-"} />
          </>
        )}
      </div>
    </div>
  );
};
