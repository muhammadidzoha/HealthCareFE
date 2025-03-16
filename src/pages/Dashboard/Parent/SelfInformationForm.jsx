import { FormInputText } from "./FormInputText";
import { Label } from "./Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const SelfInformationForm = ({
  date,
  setDate,
  education,
  gender,
  relation,
  fullName,
  onInputChange,
  phoneNumber = "",
}) => {
  return (
    <div className="flex flex-col p-4 border rounded-xl">
      <h1 className="mt-6 mb-4 font-semibold text-2xl text-slate-600 ">
        Biodata
      </h1>
      <div className="flex flex-col gap-8">
        <FormInputText
          name={"fullName"}
          onChange={({ target }) =>
            onInputChange(target.name, target.value, "profile")
          }
          title={"Nama Lengkap"}
          value={fullName}
          placeholder={"Masukkan nama lengkap"}
          type="text"
        />

        <div className="flex flex-col gap-2">
          <Label>Tanggal Lahir</Label>
          <input
            type="date"
            name="selfBirthDate"
            onChange={setDate}
            value={date}
            className="border px-2 py-2 rounded-md w-2/3"
          />
          {/* <DatePickerInput date={date} setDate={setDate} /> */}
        </div>
        <div className="flex flex-col gap-2">
          <Label>Pendidikan</Label>
          <Select
            onValueChange={(education) =>
              onInputChange("education", education, "profile")
            }
            value={education}
          >
            <SelectTrigger className="w-2/3">
              <SelectValue placeholder="Pendidikan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sd">SD</SelectItem>
              <SelectItem value="smp">SMP</SelectItem>
              <SelectItem value="sma">SMA</SelectItem>
              <SelectItem value="d3">D3</SelectItem>
              <SelectItem value="s1">S1</SelectItem>
              <SelectItem value="s2">S2</SelectItem>
              <SelectItem value="s3">S3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Jenis Kelamin</Label>
          <Select
            onValueChange={(value) => onInputChange("gender", value, "profile")}
            value={gender}
          >
            <SelectTrigger className="w-2/3">
              <SelectValue placeholder="Jenis Kelamin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="L">Laki Laki</SelectItem>
              <SelectItem value="P">Perempuan</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Hubungan</Label>
          <Select
            onValueChange={(value) =>
              onInputChange("relation", value, "profile")
            }
            value={relation}
          >
            <SelectTrigger className="w-2/3">
              <SelectValue placeholder="Hubungan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="IBU">Ibu</SelectItem>
              <SelectItem value="AYAH">Ayah</SelectItem>
              <SelectItem value="ANAK">Anak </SelectItem>
            </SelectContent>
          </Select>
        </div>
        {relation !== "ANAK" && (
          <FormInputText
            name={"phoneNumber"}
            onChange={({ target }) =>
              onInputChange(target.name, target.value, "profile")
            }
            title={"Nomor Telepon"}
            value={phoneNumber}
            placeholder={"Masukkan Nomor Telepon"}
            type="text"
          />
        )}
      </div>
    </div>
  );
};
