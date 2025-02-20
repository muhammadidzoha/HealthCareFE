import FormSignIn from "@/components/Auth/FormSignIn";
import { BorderBeam } from "@/components/ui/border-beam";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  return (
    <div
      className={`relative flex w-[300px] h-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl`}
    >
      <div onClick={() => navigate("../..")} className="absolute top-5 left-5">
        <ArrowLeft className="cursor-pointer" size={20} />
      </div>
      <div className={`flex flex-col space-y-10 items-center pt-20 pb-10`}>
        <div>
          <FormSignIn />
        </div>
      </div>
      <BorderBeam size={150} duration={12} delay={9} />
    </div>
  );
};

export default SignIn;
