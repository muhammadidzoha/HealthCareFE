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
import { useSidebar } from "@/components/ui/sidebar";

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
  const { open } = useSidebar();

  console.log(open);

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
        <div
          className={`w-full h-full shadow-md rounded-xl py-5 bg-white flex ${
            open ? "p-5" : "p-10"
          }`}
        >
          <div className="flex flex-col space-y-5">
            <Typography
              className={`${
                open
                  ? "!text-xl"
                  : "!text-3xl !font-semibold leading-snug antialiased tracking-normal"
              }`}
            >
              Selamat Datang
            </Typography>
            <Typography variant="paragraph" className="text-gray-500">
              Semoga harimu menyenangkan
            </Typography>
            <Typography
              variant="paragraph"
              className="text-[#83adff] !font-medium"
            >
              {day} {month} {year}
            </Typography>
          </div>
          <img
            src="/bgWelcome.svg"
            alt="welcome"
            className={`${open ? "absolute w-[150px]" : "w-[150px]"}`}
          />
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
