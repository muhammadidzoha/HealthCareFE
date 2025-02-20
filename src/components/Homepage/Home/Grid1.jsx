import React from "react";
import { Typography } from "@material-tailwind/react";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Pie, PieChart } from "recharts";

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
];
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Sudah",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Belum",
    color: "hsl(var(--chart-2))",
  },
};

const Grid1 = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date();
  const month = months[date.getMonth()];
  const day = date.getDay();
  const year = date.getFullYear();

  return (
    <>
      {/* tablet */}
      <div className="grid auto-rows-min gap-5 md:grid-cols-2">
        <div className="grid auto-rows-min gap-5">
          <div className="aspect-video rounded-xl shadow-md bg-white"></div>
          <div className="aspect-video shadow-md rounded-xl bg-white"></div>
        </div>
        <div className="w-full h-full shadow-md rounded-xl py-5 bg-white">
          <Typography variant="h6" className="text-center">
            Pelaksanaan Total
          </Typography>
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie data={chartData} dataKey="visitors" nameKey="browser" />
              <ChartLegend
                content={<ChartLegendContent nameKey="browser" />}
                className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
              />
            </PieChart>
          </ChartContainer>
        </div>
      </div>
      {/* tablet */}
    </>
  );
};

export default Grid1;
