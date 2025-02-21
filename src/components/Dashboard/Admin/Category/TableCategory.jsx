import { Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["No", "Kategori", "Job", "Employed"];

const TABLE_ROWS = [
  {
    name: "John Michael",
    job: "Manager",
    date: "23/04/18",
  },
  {
    name: "Alexa Liras",
    job: "Developer",
    date: "23/04/18",
  },
  {
    name: "Laurent Perrier",
    job: "Executive",
    date: "19/09/17",
  },
  {
    name: "Michael Levi",
    job: "Developer",
    date: "24/12/08",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
  },
];

export function TableCategory() {
  return (
    <Card className="h-full w-full overflow-scroll !shadow-none">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="bg-[#f5f8ff] p-4 text-black">
                <Typography variant="small" className="font-bold leading-none">
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map(({ name, job, date }, index) => (
            <tr key={name} className="even:bg-[#f5f8ff]">
              <td className="p-4">
                <Typography
                  variant="small"
                  className="!font-medium !text-black"
                >
                  {index + 1}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  className="!font-medium !text-black"
                >
                  {name}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  className="!font-medium !text-black"
                >
                  {job}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  className="!font-medium !text-black"
                >
                  {date}
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
