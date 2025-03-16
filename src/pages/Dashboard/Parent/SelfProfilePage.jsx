import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PersonalInformation } from "./PersonalInformation";
import { ProfileNutrition } from "./ProfileNutrition";

export const SelfProfilePage = () => {
  return (
    <div className="bg-white text-black rounded-xl p-4">
      <h1 className="font-semibold text-xl">Profile</h1>
      <hr />
      <div className="w-full border border p-4 rounded-xl mt-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Avatar className="size-20">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <h1 className="font-semibold">Ripan Renaldi</h1>
            <h1>ripanrenaldi25@gmail.com</h1>
            <p className="text-slate-500">Developer</p>
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
