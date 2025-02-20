import { Button, Typography } from "@material-tailwind/react";
import React from "react";
import Cover from "./Cover";
import { useNavigate } from "react-router-dom";
import InputSignIn from "./InputSignIn";

const FormSignIn = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col space-y-5">
      <Cover title="Masuk">
        <div className="flex items-center justify-center gap-2">
          <Typography variant="small">Belum memiliki akun?</Typography>
          <Button
            variant="text"
            className="!px-0 !py-0 !capitalize !text-sm !font-light"
            onClick={() => navigate("/auth/register?parent")}
          >
            Daftar
          </Button>
        </div>
      </Cover>
      <InputSignIn />
    </div>
  );
};

export default FormSignIn;
