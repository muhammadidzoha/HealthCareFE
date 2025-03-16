import React from "react";
import { Label } from "./Label";
import { Input } from "./Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormInputText } from "./FormInputText";

export const ResidenceForm = ({
  residenceStatus = "",
  address = "",
  description = "",
  onInputChange,
  isResidenceSame,
  children,
}) => {
  return (
    <div className="flex flex-col p-4 border rounded-xl mt-4 gap-4">
      <h1 className="mb-4 font-semibold text-2xl text-slate-600">
        Data Tempat Tinggal
      </h1>
      <div className="flex flex-col gap-2">
        <Label>Status Tempat Tinggal</Label>
        <Select
          onValueChange={(status) =>
            onInputChange("status", status, "residence")
          }
          value={
            isResidenceSame
              ? JSON.parse(localStorage.getItem("formInput")).residence.status
              : residenceStatus
          }
          disabled={isResidenceSame}
        >
          <SelectTrigger className="w-2/3">
            <SelectValue placeholder="Status tempat tinggal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="OWN">Milik Sendiri</SelectItem>
            <SelectItem value="RENT">Sewa / Kontrak</SelectItem>
            <SelectItem value="OTHER">Bersama orang tua / numpang</SelectItem>
          </SelectContent>
        </Select>
        {/* {residenceStatus === "OTHER" && (
                    <Input type="text" placeholder="Status tempat tinggal" className="w-2/3" value={description} onChange={({ target }) => onInputChange(target.name, target.value, 'residence')} name="description" />
                )} */}
      </div>
      <FormInputText
        name={"address"}
        onChange={({ target }) =>
          onInputChange(target.name, target.value, "residence")
        }
        title={"Alamat"}
        value={
          isResidenceSame
            ? JSON.parse(localStorage.getItem("formInput")).residence.address
            : address
        }
        placeholder={"Masukkan alamat anda"}
        type="textarea"
        isDisabled={isResidenceSame}
      />
      {children}
    </div>
  );
};
