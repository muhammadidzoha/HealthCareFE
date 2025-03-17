import { NutritionDoughnoutCart } from "@/components/Cart/NutritionDoughnoutCart";
import { DashboardProgress } from "@/components/Progress/DashboardProgress";
import { BasicTable } from "@/components/Table/BasicTable";
import {
  getFamilyMembers,
  getParentQuisioners,
} from "@/lib/API/Parent/parentApi";
import { useFamilyFormStore } from "@/store/form/familyFormStore";
import { userStore } from "@/store/users/userStore";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const ParentHomePage = () => {
  const { formInput, fatherFormInput } = useFamilyFormStore();
  const { familyMembers, setFamilyMembers } = userStore();
  const [parentQuisioner, setParentQuisioner] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [progressItems, setProgressItems] = useState([
    {
      title: "Data Keluarga",
      progress: Math.round(familyMembers.length > 2 ? 100 : 0),
      totalQuestion: 3,
      totalAnswered: 5,
      url: "family/create",
      isFilled: false,
    },
  ]);

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
      setProgressItems((prevValue) => {
        const merged = [...prevValue, ...data];

        const uniqueItems = merged.filter(
          (item, index, self) =>
            index === self.findIndex((q) => q.title === item.title)
        );

        return uniqueItems.map((item) => {
          let progress = 0;
          let totalQuestion = 0;
          let url = "";
          let onClick = () => {};

          if (item.title.toLowerCase().includes("data keluarga")) {
            progress = familyMembers.length > 2 ? 100 : 0;
            totalQuestion = 3;
          } else if (
            item.title.toLowerCase().includes("pengetahuan gizi seimbang")
          ) {
            const quisioner = uniqueItems.find((value) =>
              value.title.toLowerCase().includes("pengetahuan gizi seimbang")
            );
            progress = 50;
            totalQuestion = quisioner.questions?.length ?? 0;
            url = `quisioners/${quisioner.id}/response?q=1`;
          } else if (item.title.toLowerCase().includes("sehari-hari anak")) {
            const quisioner = uniqueItems.find((value) =>
              value.title.toLowerCase().includes("sehari-hari anak")
            );
            progress = 50;
            totalQuestion = quisioner.questions?.length ?? 0;
          }
          return {
            title: item.title,
            progress: progress,
            totalQuestion: totalQuestion,
            totalAnswered: progress === 100 ? totalQuestion : 0,
            url,
            isFilled: progress === 100,
            onClick,
          };
        });
      });

      setParentQuisioner(data);
    }

    fetchParentQuisioner();

    fetchFamilyMembersData();
  }, []);

  return (
    <article className="w-full p-4">
      <section>
        <div className="flex gap-5 justify-between w-full">
          <DashboardProgress progressItems={progressItems} />
          <NutritionDoughnoutCart />
          {/* <div className="bg-white w-min rounded-xl h-min ">
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
          </div> */}
        </div>
        <BasicTable
          caption={"Informasi Keluarga"}
          data={[]}
          format={format}
          title={"Tabel Keluarga"}
        />
      </section>
    </article>
  );
};
