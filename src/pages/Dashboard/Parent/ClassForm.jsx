import React, { useState } from "react";
import { SchoolCombobox } from "./SchoolCombobox";
import { Label } from "./Label";
import { Input } from "./Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const ClassForm = ({ studentClass, onInputChange = () => {} }) => {
  const [school, setSchool] = useState({});
  return (
    <div className="flex flex-col p-4 border rounded-xl mt-4 gap-4">
      <h1 className="mb-4 font-semibold text-2xl text-slate-600">
        Data Sekolah
      </h1>
      <div className="flex flex-col gap-2">
        <SchoolCombobox
          onInputChange={onInputChange}
          school={school}
          setSchool={setSchool}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Kelas</Label>
        <Select
          onValueChange={(value) => {
            onInputChange("class", +value);
          }}
          value={studentClass ?? ""}
        >
          <SelectTrigger className="w-2/3">
            <SelectValue placeholder="Pilih Kelas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={1}>1</SelectItem>
            <SelectItem value={2}>2</SelectItem>
            <SelectItem value={3}>3</SelectItem>
            <SelectItem value={4}>4</SelectItem>
            <SelectItem value={5}>5</SelectItem>
            <SelectItem value={6}>6</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
