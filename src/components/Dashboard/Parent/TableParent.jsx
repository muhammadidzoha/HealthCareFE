import { PencilIcon, ChevronsUpDownIcon } from "lucide-react";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Avatar,
} from "@material-tailwind/react";

const TABLE_HEAD = [
  "Nama Lengkap",
  "Relasi",
  "Pekerjaan",
  "Tinggi Badan (cm)",
  "Berat Badan (kg)",
  "Berat Badan Lahir (kg)",
  "Status Gizi",
];

const TABLE_ROWS = [
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "Slamet",
    email: "slamet@gmail.com",
    relation: "Ayah",
    job: "Karyawan",
    height: "180",
    weight: "78",
    birthWeight: "2",
    statusNutrion: "Good",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "Maria",
    email: "maria@gmail.com",
    relation: "Ibu",
    job: "Karyawan",
    height: "160",
    weight: "68",
    birthWeight: "1.8",
    statusNutrion: "Good",
  },
];

export function TableParent() {
  return (
    <Card className="h-full w-full bg-transparent">
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none bg-muted/50"
      >
        <div>
          <Typography variant="h5" color="blue-gray">
            Tabel Keluarga
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70 text-xs"
                  >
                    {head}{" "}
                    {index !== TABLE_HEAD.length - 8 && (
                      <ChevronsUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(
              (
                {
                  img,
                  name,
                  email,
                  relation,
                  job,
                  height,
                  weight,
                  birthWeight,
                  statusNutrion,
                },
                index
              ) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={name}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar src={img} alt={name} size="sm" />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {name}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {email}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {relation}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {job}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {height}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {weight}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {birthWeight}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {statusNutrion}
                      </Typography>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="absolute bottom-0 w-full">
        <div className="flex items-center justify-between">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page 1 of 10
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm">
              Previous
            </Button>
            <Button variant="outlined" size="sm">
              Next
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
