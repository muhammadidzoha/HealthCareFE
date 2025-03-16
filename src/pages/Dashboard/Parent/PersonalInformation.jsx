import React from "react";
import { ProfileInfo } from "./ProfileInfo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const PersonalInformation = () => {
  return (
    <div className="mt-6 border p-4 rounded-xl">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold">Personal Information</h1>
        <Button variant="outline" asChild>
          <Link to="create">Edit</Link>
        </Button>
      </div>
      <div className="grid grid-cols-2 mt-4">
        <div className="flex flex-col gap-6">
          <ProfileInfo label={"Nama Lengkap"} value={"Ripan Renaldi"} />

          <ProfileInfo
            label={"Email Address"}
            value={"ripanrenaldi25@gmail.com"}
          />

          <ProfileInfo label={"Tanggal Lahir"} value={"25 April 2002"} />

          <ProfileInfo label={"Nomor Telepon"} value={"08123456789"} />
        </div>
        <div className="flex flex-col gap-6">
          <ProfileInfo label={"Pendidikan"} value={"D3"} />
          <ProfileInfo label={"Jenis Kelamin"} value={"Laki-laki"} />
          <ProfileInfo label={"Relation"} value={"Ayah"} />
          <ProfileInfo
            label={"Tempat Tinggal"}
            value={
              "Komplek Permata Biru Blok G-2 No. 46 Kecamatan Cileunyi kabupaten bandung"
            }
          />
        </div>
      </div>
    </div>
  );
};
