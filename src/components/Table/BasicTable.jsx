import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const BasicTable = ({
  title = "",
  caption = "",
  format = {},
  data = [],
  children,
}) => {
  return (
    <div className="w-full bg-white mt-6 rounded-xl p-4">
      <h1 className="mb-2">{title}</h1>
      <Table>
        <TableCaption>{caption}</TableCaption>
        <TableHeader>
          <TableRow>
            {format.headers.map((header, index) => (
              <TableHead key={index}>{header.alias}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {children ? (
            children
          ) : data.length ? (
            data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.full_name}</TableCell>
                <TableCell>{row.relation}</TableCell>
                <TableCell>{row.job.job_type.name}</TableCell>

                <TableCell>{row.nutrition[0].height}</TableCell>
                <TableCell>{row.nutrition[0].weight}</TableCell>
                <TableCell>
                  {row.nutrition[0].birth_weight ?? "Tidak ada data"}
                </TableCell>
                <TableCell>
                  {row.nutrition[0].nutrition_status.status}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={format.headers.length ?? 5}
                className="text-center mt-8 font-semibold "
              >
                Tidak Ada Data, Isi {title} terlebih dahulu
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
