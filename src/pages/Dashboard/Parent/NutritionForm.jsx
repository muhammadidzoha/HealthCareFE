import React from "react";
import { FormInputText } from "./FormInputText";

export const NutritionForm = ({
  onInputChange,
  height,
  weight,
  birth_weight = 0,
  isChildren,
}) => {
  return (
    <div className="flex flex-col p-4 border rounded-xl">
      <h1 className="mt-6 mb-4 font-semibold text-2xl text-slate-600 ">
        Tinggi dan Berat Badan
      </h1>
      <div className="flex flex-col gap-8">
        <FormInputText
          name={"height"}
          onChange={({ target }) =>
            onInputChange(target.name, +target.value, "nutrition")
          }
          title={"Tinggi Badan (cm)"}
          value={height}
          placeholder={"Masukkan tinggi badan anda"}
        />
        <FormInputText
          name={"weight"}
          onChange={({ target }) =>
            onInputChange(target.name, +target.value, "nutrition")
          }
          title={"Berat Badan (kg)"}
          value={weight}
          placeholder={"Masukkan berat badan anda"}
        />
        {isChildren && (
          <FormInputText
            name={"birth_weight"}
            onChange={({ target }) =>
              onInputChange(target.name, +target.value, "nutrition")
            }
            title={"Berat Badan Lahir (kg)"}
            value={birth_weight}
            placeholder={"Masukkan berat badan anda"}
          />
        )}
      </div>
    </div>
  );
};
