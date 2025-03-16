import { TableAdmin } from "@/components/Dashboard/Admin/Admin/TableAdmin";
import { DashboardProgress } from "@/components/Progress/DashboardProgress";
import { BasicTable } from "@/components/Table/BasicTable";
import { Calendar } from "@/components/ui/calendar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  getFamilyMembers,
  getParentQuisioners,
} from "@/lib/API/Parent/parentApi";
import { useFamilyFormStore } from "@/store/form/familyFormStore";
import { userStore } from "@/store/users/userStore";
import { useState, useEffect } from "react";

export const ParentHomePage = () => {
  // const [familyMembers, setFamilyMembers] = useState([
  //     {
  //         name: 'Ripan Renaldi',
  //         relation: 'Ayah',
  //         job: 'Developer',
  //         height: 165,
  //         weight: 55,
  //         birthWeight: 3,
  //         nutritionStatus: 'Normal'
  //     },
  //     {
  //         name: 'Ripan Renaldi',
  //         relation: 'Ayah',
  //         job: 'Developer',
  //         height: 165,
  //         weight: 55,
  //         birthWeight: 3,
  //         nutritionStatus: 'Normal'
  //     },
  //     {
  //         name: 'Ripan Renaldi',
  //         relation: 'Ayah',
  //         job: 'Developer',
  //         height: 165,
  //         weight: 55,
  //         birthWeight: 3,
  //         nutritionStatus: 'Normal'
  //     }
  // ]);
  const { formInput, fatherFormInput } = useFamilyFormStore();
  const { familyMembers, setFamilyMembers } = userStore();
  const [progressItems, setProgressItems] = useState([
    {
      title: "Data Keluarga",
      progress: Math.round(33),
      totalQuestion: 5,
      totalAnswered: 5,
      url: "family/create",
      isFilled: false,
    },
  ]);

  const [date, setDate] = useState(new Date());
  const [tooltipText, setTooltipText] = useState(null);
  const [monthChange, setMonthChange] = useState(null);
  const [parentQuisioner, setParentQuisioner] = useState([]);

  // const specialDays = [
  //     {
  //         date: new Date(2025, 3, 14),
  //         name: "Valentine's Day",
  //     },
  //     {
  //         date: new Date(2025, 1, 14),
  //         name: "Valentine's Day3",
  //     },
  //     {
  //         date: new Date(2025, 2, 14),
  //         name: "Valentine's Day2",
  //     },
  //     {
  //         date: new Date(2025, 1, 17),
  //         name: "Makan siang bersama",
  //     },
  // ];

  const handleDayHover = (day) => {
    const specialDay = specialDays.find(
      (special) => special.date.toDateString() === day.toDateString()
    );
    if (specialDay) {
      setTooltipText(specialDay.name);
      setMonthChange(true);
    } else {
      setTooltipText(null);
      setMonthChange(false);
    }
  };

  const format = {
    headers: [
      { alias: "Nama Lengkap", name: "full_name" },
      { alias: "Relasi", name: "relation" },
      { alias: "Pekerjaan", name: "job.job_type.name" },
      { alias: "Tinggi Badan (cm)", name: "nutrition[0].height" },
      { alias: "Berat Badan (kg)", name: "nutrition[0].weight" },
      { alias: "Berat Badan Lahir (kg)", name: "nutrition[0].birth_weight" },
      { alias: "Status Gizi", name: "nutrition[0].nutrition_status.status" },
    ],
  };

  useEffect(() => {
    async function fetchFamilyMembersData() {
      const { data } = await getFamilyMembers();
      setFamilyMembers(data);
    }

    async function fetchParentQuisioner() {
      const { data } = await getParentQuisioners();
      setParentQuisioner(data);
    }
    fetchParentQuisioner();

    fetchFamilyMembersData();
  }, []);

  console.log({ familyMembers });

  return (
    <article className="w-full p-4">
      <section>
        <div className="flex gap-5 justify-between w-full">
          <DashboardProgress progressItems={progressItems} />
          <div className="bg-white w-min rounded-xl h-min ">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border w-min w-full"
                    onDayMouseEnter={handleDayHover}
                    onMonthChange={() => {
                      setMonthChange(true);
                    }}
                    // modifiers={{
                    //     special: specialDays.map((day) => day.date),
                    // }}
                    // modifiersClassNames={{
                    //     special: "bg-red-500 text-white rounded-full",
                    // }}
                  />
                  {tooltipText && monthChange && (
                    <TooltipContent className="bg-black text-white p-2 rounded-md text-sm">
                      {tooltipText}
                    </TooltipContent>
                  )}
                </TooltipTrigger>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <BasicTable
          caption={"Informasi Keluarga"}
          data={[]}
          format={format}
          title={"Tabel Keluarga"}
        />
        {/* <TableAdmin /> */}
      </section>
    </article>
  );
};
