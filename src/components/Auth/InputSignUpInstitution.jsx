import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  Button,
  Input,
  Option,
  Select,
  Textarea,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { registerInstitution } from "@/lib/api";
import { useNavigate } from "react-router-dom";

const InputSignUpInstitution = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (values) => {
    const changeToINT = { ...values, roleId: parseInt(values.roleId) };

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const handleLoading = delay(1000);

    toast.promise(
      handleLoading.then(() => registerInstitution(changeToINT)),
      {
        pending: "Loading...",
        success: {
          render(response) {
            return response.data.message;
          },
          onClose: () => navigate("../login"),
        },
        error: {
          render(response) {
            return response.data.message;
          },
        },
      },
      {
        pauseOnFocusLoss: false,
        pauseOnHover: false,
        autoClose: 2000,
      }
    );
  };

  const { values, handleChange, handleBlur, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        name: "",
        username: "",
        email: "",
        password: "",
        address: "",
        phoneNumber: "",
        roleId: 0,
      },
      onSubmit: handleRegister,
    });

  console.log(values);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center space-y-5"
    >
      <div className="flex items-center justify-center gap-2 w-1/2">
        <Input
          type="text"
          label="Name"
          id="name"
          name="name"
          onChange={handleChange}
          onBlur={handleBlur}
          containerProps={{
            className: "!min-w-[121px]",
          }}
        />
        <Input
          type="text"
          label="Username"
          id="username"
          name="username"
          onChange={handleChange}
          onBlur={handleBlur}
          containerProps={{
            className: "!min-w-[121px]",
          }}
        />
      </div>
      <div className="flex items-center justify-center gap-2 w-1/2">
        <Input
          type="email"
          label="Email"
          id="email"
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          containerProps={{
            className: "!min-w-[121px]",
          }}
        />
        <Input
          type={showPassword ? "text" : "password"}
          label="Password"
          id="password"
          name="password"
          onChange={handleChange}
          onBlur={handleBlur}
          icon={
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer"
            >
              {showPassword ? (
                <Eye size={16} className="text-gray-400" />
              ) : (
                <EyeOff size={16} className="text-gray-400" />
              )}
            </div>
          }
          containerProps={{
            className: "!min-w-[121px]",
          }}
        />
      </div>
      <div className="flex items-center justify-center gap-2 w-1/2">
        <Textarea
          label="Alamat"
          id="address"
          name="address"
          rows={1}
          className="min-h-full"
          onChange={handleChange}
          onBlur={handleBlur}
          containerProps={{
            className: "!min-w-[121px] h-[40px]",
          }}
        />
        <Input
          type="text"
          label="Nomor Telepon"
          id="phoneNumber"
          name="phoneNumber"
          onChange={handleChange}
          onBlur={handleBlur}
          containerProps={{
            className: "!min-w-[121px]",
          }}
        />
      </div>
      <Select
        label="Role"
        id="roleId"
        name="roleId"
        containerProps={{
          className: "!w-[250px]",
        }}
        onChange={(value) => setFieldValue("roleId", value)}
      >
        <Option value="2">Sekolah</Option>
        <Option value="3">Puskesmas</Option>
      </Select>
      <Button type="submit" className="!w-[250px]">
        Daftar
      </Button>
    </form>
  );
};

export default InputSignUpInstitution;
