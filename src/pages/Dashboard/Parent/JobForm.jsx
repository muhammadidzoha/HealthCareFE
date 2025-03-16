import { FormInputText } from "./FormInputText";
import { Label } from "./Label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const JobForm = ({ jobTypeId, income, onInputChange = () => {} }) => {
  return (
    <div className="flex flex-col p-4 border rounded-xl mt-4 gap-4">
      <h1 className="mb-4 font-semibold text-2xl text-slate-600">
        Data Pekerjaan
      </h1>
      <div className="flex flex-col gap-2">
        <Label>Pekerjaan</Label>
        <Select
          onValueChange={(value) => {
            if (value === 1) {
              onInputChange("income", 0, "job");
            }
            onInputChange("jobTypeId", +value, "job");
          }}
          value={jobTypeId}
        >
          <SelectTrigger className="w-2/3">
            <SelectValue placeholder="Pekerjaan" />
          </SelectTrigger>
          <SelectContent>
            {/* <SelectItem value="TIDAK_BEKERJA_BURUH_SEJENISNYA">Tidak Bekerja / Buruh dan Sejenisnya</SelectItem>
                        <SelectItem value="PEKERJA_HONORER_KONTRAK">Pekerja Honorer / Kontrak</SelectItem>
                        <SelectItem value="PEGAWAI_NEGERI_KARYAWAN_SWASTA">Pegawai Negeri / Karyawan Swasta</SelectItem> */}
            <SelectItem value={1}>
              Tidak Bekerja / Buruh dan Sejenisnya
            </SelectItem>
            <SelectItem value={2}>Pekerja Honorer / Kontrak</SelectItem>
            <SelectItem value={3}>Pegawai Negeri / Karyawan Swasta</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {jobTypeId !== 1 && (
        <FormInputText
          name={"income"}
          onChange={({ target }) =>
            onInputChange(target.name, +target.value, "job")
          }
          title={"Gaji"}
          value={income}
          placeholder={"Masukkan gaji anda"}
        />
      )}
    </div>
  );
};
