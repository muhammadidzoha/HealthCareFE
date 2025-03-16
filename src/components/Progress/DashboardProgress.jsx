import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { ProgressList } from "./ProgressList";

export const DashboardProgress = ({ progressItems }) => {
  const averageProgress = Math.round(
    progressItems.reduce((acc, item) => acc + item.progress, 0) /
      progressItems.length
  );
  const totalCompleted = progressItems.filter(
    (item) => item.progress === 100
  ).length;

  return (
    <div className="w-full">
      <div className="progress-container w-full flex items-center gap-10 bg-white p-6 rounded-xl">
        <div className="w-full">
          <div className="flex items-center gap-5">
            <div className="h-40 w-40">
              <CircularProgressbar
                value={averageProgress}
                text={`${averageProgress}%`}
                className="text-white font-bold"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="font-semibold">Average Progress</h1>
              <p className="text-slate-500">
                {totalCompleted}/{progressItems.length} Completed
              </p>
            </div>
          </div>
          <div className="mt-5">
            <ProgressList progressItems={progressItems} />
          </div>
        </div>
      </div>
    </div>
  );
};
