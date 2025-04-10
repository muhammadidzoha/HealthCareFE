import React, { useState, useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
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
import axios from "axios";
import {
  getClassesWithCategories,
  getSchools,
} from "@/lib/API/Parent/parentApi";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
    id: 1,
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
    id: 2,
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
    id: 3,
  },
  {
    value: "remix",
    label: "Remix",
    id: 4,
  },
  {
    value: "astro",
    label: "Astro",
    id: 5,
  },
];

export function SchoolCombobox({ onInputChange, school, setSchool }) {
  const [open, setOpen] = React.useState(false);
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    const getAllSchools = async () => {
      const { data } = await getSchools();
      setSchools(data);
    };

    getAllSchools();
  }, []);
  console.log({ school });
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-2/3 justify-between"
        >
          {school.name || "Pilih Sekolah"}
          <ChevronsUpDown className="w-full opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>Sekolah Tidak Ditemukan</CommandEmpty>
            <CommandGroup>
              {schools.map((schoolData) => (
                <CommandItem
                  key={schoolData.id}
                  value={schoolData.name}
                  onSelect={(currentValue) => {
                    onInputChange("institutionId", schoolData.id);
                    onInputChange("schoolData", schoolData);
                    setSchool((prevValue) =>
                      prevValue.id === schoolData.id ? {} : schoolData
                    );
                    setOpen(false);
                  }}
                >
                  {schoolData.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      school.name === schoolData.name
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
  );
}
