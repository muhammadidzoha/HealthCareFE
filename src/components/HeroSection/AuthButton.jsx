import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthButton = () => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="grid sm:inline-flex gap-3">
      <Button
        color="blue"
        onClick={() => navigate("/auth/login")}
        className="rounded-xl w-full lg:w-[200px] border dark:border-white border-transparent text-white text-sm"
      >
        Masuk
      </Button>
      <Menu open={open} handler={setOpen}>
        <MenuHandler>
          <Button
            variant="outlined"
            className="rounded-xl w-full lg:w-[200px] flex items-center justify-center gap-1"
          >
            Daftar
            <ChevronDown
              size={16}
              className={`transition-transform ${open ? "rotate-180" : ""}`}
            />
          </Button>
        </MenuHandler>
        <MenuList>
          <MenuItem onClick={() => navigate("/auth/register/parent")}>
            Orang Tua
          </MenuItem>
          <MenuItem onClick={() => navigate("/auth/register/institution")}>
            Instansi
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};

export default AuthButton;
