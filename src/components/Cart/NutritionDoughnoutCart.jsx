"use client";

import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getNutritionStatusForFamily } from "@/lib/API/Parent/parentApi";
import { userStore } from "@/store/users/userStore";
import { useEffect, useState } from "react";

const chartConfig = {
  nutrition: {
    label: "Nutrisi",
  },
  normal: {
    label: "normal",
    color: "hsl(var(--chart-1))",
  },
  riskFat: {
    label: "Beresiko",
    color: "hsl(var(--chart-2))",
  },
  fat: {
    label: "Gizi Lebih",
    color: "hsl(var(--chart-3))",
  },
};

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

export function NutritionDoughnoutCart() {
  const { userLogin } = userStore();
  const [nutritionFamily, setNutritionFamily] = useState([]);

  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    const fetchNutritionForFamily = async () => {
      if (!!userLogin) {
        const { data } = await getNutritionStatusForFamily();
        console.log({ data });
        setNutritionFamily(data[0].nutrition_statuses);
        const nutrition = data[0].nutrition_statuses;
        const nutritionNormal = nutrition.find((stat) => stat.status_id === 3);
        const nutritionRisk = nutrition.find((stat) => stat.status_id === 4);
        const nutritionFat = nutrition.find((stat) => stat.status_id === 5);
        console.log({ nutritionNormal });
        setChartData([
          {
            nutrition: "normal",
            jumlah: nutritionNormal?.total ?? 0,
            fill: "#11ff26",
          },
          {
            nutrition: "riskFat",
            jumlah: nutritionRisk?.total ?? 0,
            fill: "yellow",
          },
          {
            nutrition: "fat",
            jumlah: nutritionFat?.total ?? 0,
            fill: "red",
          },
        ]);
      }
    };
    fetchNutritionForFamily();
  }, [userLogin]);
  console.log({ nutritionFamily, chartData });

  return (
    <Card className="flex flex-col relative">
      <CardHeader className="items-center pb-0 text-xl">
        <CardTitle>Grafik Nutrisi Keluarga</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[200px] min-w-[300px] "
        >
          {nutritionFamily.length > 0 ? (
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie data={chartData} dataKey="jumlah" nameKey={"nutrition"} />
              <ChartLegend
                content={<ChartLegendContent nameKey="nutrition" />}
                className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
              />
            </PieChart>
          ) : (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <h1 className="text-lg  font-semibold">Belum Ada data</h1>
            </div>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
