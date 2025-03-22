import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PersonalInformation } from "./PersonalInformation";
import { ProfileNutrition } from "./ProfileNutrition";
import { userStore } from "@/store/users/userStore";
import { getMembersBelongToUser } from "@/lib/API/Parent/parentApi";
import { getInitials } from "@/lib/utils";

export const SelfProfilePage = () => {
  const {userLogin} = userStore();
  console.log({userLogin})
  useEffect(() => {
    const fecthUserLogin = async () => {
      const {data} = await getMembersBelongToUser();
      if(data.length > 0) {
        userStore.setState(prevState => ({...prevState, userLogin: data[0]}))
      }
    }
    // fecthUserLogin();
  }, [])
  return (
    <div className="bg-white text-black rounded-xl p-4">
      <h1 className="font-semibold text-xl">Profile</h1>
      <hr />
      <div className="w-full border p-4 rounded-xl mt-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Avatar className="size-20">
            <AvatarImage src={userLogin?.avatar ?? import.meta.env.VITE_DEFAULT_AVATAR} />
            <AvatarFallback>{getInitials(userLogin?.full_name ?? '')}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <h1 className="font-semibold">{userLogin?.full_name ?? "-"}</h1>
            <h1>{userLogin?.family?.user?.email ?? "-"}</h1>
            <p className="text-slate-500">{userLogin?.job?.job_type?.name ?? "-"}</p>
          </div>
        </div>

        <div>
          <Button variant="outline" asChild>
            <Link to="">Edit</Link>
          </Button>
        </div>
      </div>

      <PersonalInformation />

      <ProfileNutrition />
    </div>
  );
};
