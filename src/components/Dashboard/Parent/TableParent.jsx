import { PencilIcon, ChevronsUpDownIcon } from "lucide-react";
import { Button as CnButton } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Avatar,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { getMembersBelongToUser } from "@/lib/API/Parent/parentApi";
import { Link, useNavigate } from "react-router-dom";

const TABLE_HEAD = [
  "Nama Lengkap",
  "Relasi",
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
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  useEffect(() => {
    async function fetchMembers() {
      const { data } = await getMembersBelongToUser();
      setMembers(data);
    }
    fetchMembers();
  }, []);
  console.log({members});
  
  return (
    <Card className="h-full w-full bg-transparent">
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none bg-muted/50 relative"
      >
        <div className="flex justify-between">
          <Typography variant="h5" color="blue-gray">
            Tabel Keluarga
          </Typography>
          <CnButton type="button" asChild>
            <Link to={"/dashboard/parent/create"}>Tambah Data</Link>
          </CnButton>
        </div>
      </CardHeader>
      <CardBody className={`${members.length > 0 ? "overflow-auto" : "overflow-hidden"} px-0`}>
        <table className="w-full min-w-max table-auto text-left min-h-20">
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
            {members.length > 0 ? (
              members.map(
                (
                  {
                    id,
                    avatar,
                    full_name,
                    family: { user: {email} },
                    gender,
                    relation,
                    job: {
                      job_type: { name: jobName },
                    },
                    nutrition = [],
                  },
                  index
                ) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={id}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar src={avatar ?? import.meta.env.VITE_DEFAULT_AVATAR} alt={avatar} size="sm" />
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {full_name}
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
                      {/* <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {jobName}
                        </Typography>
                      </td> */}
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {nutrition.length > 0 ? nutrition[0].height : 0}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {nutrition.length > 0 ? nutrition[0].weight : 0}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {nutrition.length > 0 ? nutrition[0].birth_weight : 0}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {nutrition.length > 0 ? nutrition[0].nutrition_status.status : 0}
                          </Typography>
                      </td>
                    </tr>
                  );
                }
              )
            ) : (
              <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                <h1 className="font-semibold">Belum ada data</h1>
              </div>
            )}
          </tbody>
        </table>
      </CardBody>
      {/* {members.length > 0 && (
        <CardFooter className="absolute w-full">
          <div className="flex items-center justify-between">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
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
      )} */}
    </Card>
  );
}
