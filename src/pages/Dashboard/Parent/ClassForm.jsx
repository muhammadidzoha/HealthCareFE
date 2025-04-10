import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { SchoolCombobox } from "./SchoolCombobox";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getClassesWithCategories } from "@/lib/API/Parent/parentApi";
import { cn } from "@/lib/utils";
import { FormInputText } from "./FormInputText";
import { useFamilyFormStore } from "@/store/form/familyFormStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const ClassForm = ({
  studentClass,
  onInputChange = () => {},
  studentData,
}) => {
  const [school, setSchool] = useState({});
  const [classChoosed, setClassChoosed] = useState(null);
  const [classes, setClasses] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchClassWithCategories = async () => {
      if (Object.keys(school).length === 0) {
        return;
      }
      const { data } = await getClassesWithCategories(school.id);
      setClasses(data);
    };
    fetchClassWithCategories();
  }, [school.id, studentData?.schoolData?.id]);

  console.log({ studentData });

  return (
    <div className="flex flex-col p-4 border rounded-xl mt-4 gap-4">
      <h1 className="mb-4 font-semibold text-2xl text-slate-600">
        Data Sekolah
      </h1>
      <div>
        <FormInputText
          name={"nis"}
          placeholder={"0021234567"}
          title={"Nomor Induk Siswa"}
          onChange={(e) => onInputChange("nis", e.target.value)}
          value={studentData?.nis ?? ""}
          type="text"
        />
      </div>
      <div>
        <FormInputText
          name={"schoolYear"}
          placeholder={"2020/2021"}
          title={"Angkatan Siswa"}
          onChange={(e) => onInputChange("schoolYear", e.target.value)}
          value={studentData?.schoolYear ?? ""}
          type="text"
        />
      </div>
      <div>
        <Select
          name="semester"
          onValueChange={(value) => {
            onInputChange("semester", value);
            console.log({ value });
          }}
          value={studentData?.semester ?? ""}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Semester" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"1"}>1</SelectItem>
            <SelectItem value={"2"}>2</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <SchoolCombobox
          onInputChange={onInputChange}
          school={studentData?.schoolData ?? school ?? null}
          setSchool={setSchool}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-2/3 justify-between"
            >
              {classChoosed?.id
                ? `${classChoosed?.classNumber} - ${classChoosed?.classCategory}`
                : "Pilih Kelas"}
              <ChevronsUpDown className="w-full opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search framework..." className="h-9" />
              <CommandList>
                <CommandEmpty>Kelas Tidak Ditemukan</CommandEmpty>
                <CommandGroup>
                  {classes.map((classData) => (
                    <CommandItem
                      key={classData.id}
                      value={classData.id}
                      onSelect={(currentValue) => {
                        onInputChange("classId", +classData.id);
                        onInputChange("class", classData);
                        setClassChoosed((prevValue) =>
                          prevValue?.id === classData.id ? null : classData
                        );
                        setOpen(false);
                      }}
                    >
                      {classData?.classNumber} - {classData?.classCategory}
                      <Check
                        className={cn(
                          "ml-auto",
                          classChoosed?.id === classData.id
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
