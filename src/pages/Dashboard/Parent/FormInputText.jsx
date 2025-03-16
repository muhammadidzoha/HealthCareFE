import React from "react";
import { Label } from "./Label";
import { Input } from "./Input";
import { Textarea } from "@/components/ui/textarea";

export const FormInputText = ({
  name,
  title,
  value,
  onChange,
  placeholder,
  type = "text",
  isDisabled = false,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={name} className="text-slate-600">
        {title}
      </Label>
      {type === "textarea" ? (
        <Textarea
          placeholder={placeholder}
          id={name}
          className="w-2/3 border-slate-400"
          value={value}
          onChange={onChange}
          name={name}
          disabled={isDisabled}
        />
      ) : (
        <Input
          id={name}
          type={type}
          className="w-2/3 border-slate-400"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          disabled={isDisabled}
        />
      )}
    </div>
  );
};
