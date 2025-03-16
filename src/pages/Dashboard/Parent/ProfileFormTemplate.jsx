import React from "react";
import { JobForm } from "./JobForm";
import { ResidenceForm } from "./ResidenceForm";
import { Button } from "@/components/ui/button";
import { ClassForm } from "./ClassForm";
import { SelfInformationForm } from "./SelfInformationForm";
import { NutritionForm } from "./NutritionForm";

export const ProfileFormTemplate = ({
  profile = "",
  job = "",
  nutrition = "",
  residence = "",
  onInputChange = () => {},
  birthDate = "",
  setBirthDate = "",
  onSubmit = () => {},
  birthWeight = "",
  formFor = "PARENT",
  buttonType,
  className = "",
  children,
  studentClass = null,
  isResidenceSame,
  childrenResidence,
  phoneNumber,
}) => {
  return (
    <form
      className={`bg-white p-6 rounded-xl ${className}`}
      onSubmit={(e) => onSubmit(e, formFor)}
    >
      <section className="flex gap-4">
        <div className="flex-1">
          <SelfInformationForm
            date={birthDate}
            residenceStatus={""}
            setDate={setBirthDate}
            onInputChange={onInputChange}
            education={profile.education}
            fullName={profile.fullName}
            gender={profile.gender}
            relation={profile.relation}
            phoneNumber={phoneNumber}
          />

          {formFor === "CHILDREN" ? (
            <ClassForm
              income={job.income}
              jobTypeId={job.jobTypeId}
              onInputChange={onInputChange}
              formFor={formFor}
              studentClass={studentClass}
            />
          ) : (
            <JobForm
              income={job.income}
              jobTypeId={job.jobTypeId}
              onInputChange={onInputChange}
            />
          )}
        </div>
        <div className="flex-1">
          <NutritionForm
            height={nutrition.height}
            isChildren={formFor === "CHILDREN"}
            onInputChange={onInputChange}
            weight={nutrition.weight}
            birth_weight={birthWeight}
          />
          {formFor === "CHILDREN" ? null : (
            <ResidenceForm
              residenceStatus={residence.status}
              onInputChange={onInputChange}
              address={residence.address}
              description={residence.description}
              isResidenceSame={isResidenceSame}
            >
              {childrenResidence}
            </ResidenceForm>
          )}
        </div>
      </section>
      <div className="flex justify-center mt-6">
        {buttonType === "SUBMIT" && (
          <Button type="submit" className="w-1/3">
            Submit
          </Button>
        )}
        {children && children}
      </div>
    </form>
  );
};
