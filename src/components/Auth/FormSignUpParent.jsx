import { Button, Typography } from "@material-tailwind/react";
import React from "react";
import Cover from "./Cover";
import { useNavigate } from "react-router-dom";
import InputSignUpParent from "./InputSignUpParent";

const FormSignUpParent = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col space-y-5">
      <Cover title="Daftar sebagai Orang Tua">
        <div className="flex items-center justify-center gap-2">
          <Typography variant="small">Sudah memiliki akun?</Typography>
          <Button
            variant="text"
            className="!px-0 !py-0 !capitalize !text-sm !font-light"
            onClick={() => navigate("/auth/login")}
          >
            Login
          </Button>
        </div>
      </Cover>
      <InputSignUpParent />
    </div>
  );
};

export default FormSignUpParent;
