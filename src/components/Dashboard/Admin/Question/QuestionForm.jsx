import { useState } from "react";
import {
  Card,
  CardBody,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { MoveRight } from "lucide-react";

export function QuestionForm() {
  return (
    <Card className="p-4 mb-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center col-span-2">
          <Typography
            variant="h6"
            className="flex items-center gap-2 w-[100px]"
          >
            Q 1.1 <MoveRight />
          </Typography>
          <Select
            label="Tipe"
            containerProps={{
              className: "min-w-[50px]",
            }}
          >
            <Option>1</Option>
          </Select>
        </div>
        <Input
          label="Pertanyaan"
          className="w-[300px]"
          containerProps={{
            className: "!min-w-[300px] !w-[300px] col-span-2",
          }}
        />
      </div>
    </Card>
  );
}
