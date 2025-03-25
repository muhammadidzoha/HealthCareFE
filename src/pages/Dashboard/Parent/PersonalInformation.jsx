import React from "react";
import { ProfileInfo } from "./ProfileInfo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { userStore } from "@/store/users/userStore";
import { formatBirthDate } from "@/lib/utils";

export const PersonalInformation = () => {
  const { userLogin } = userStore();
  return (
    <div className="mt-6 border p-4 rounded-xl">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold">Personal Information</h1>
        <Button variant="outline" asChild>
          <Link to="edit">Edit</Link>
        </Button>
      </div>
      <div className="grid grid-cols-2 mt-4">
        <div className="flex flex-col gap-6">
          <ProfileInfo
            label={"Nama Lengkap"}
            value={userLogin?.full_name ?? "-"}
          />

          <ProfileInfo
            label={"Email Address"}
            value={userLogin?.family?.user?.email ?? "-"}
          />

          <ProfileInfo
            label={"Tanggal Lahir"}
            value={formatBirthDate(userLogin?.birth_date)}
          />

          <ProfileInfo
            label={"Nomor Telepon"}
            value={userLogin?.phone_number ?? "-"}
          />
        </div>
        <div className="flex flex-col gap-6">
          <ProfileInfo
            label={"Pendidikan"}
            value={userLogin?.education ?? "-"}
          />
          <ProfileInfo
            label={"Jenis Kelamin"}
            value={userLogin?.gender ?? "-"}
          />
          <ProfileInfo label={"Relation"} value={userLogin?.relation ?? "-"} />
          <ProfileInfo
            label={"Tempat Tinggal"}
            value={userLogin?.residence?.address ?? "-"}
          />
        </div>
      </div>
    </div>
  );
};
