import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button, Input } from "@material-tailwind/react";
import { useFormik } from "formik";
import { registerParent } from "@/lib/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const InputSignUpParent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const handleLoading = delay(1000);

    toast.promise(
      handleLoading.then(() => registerParent(values)),
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

  const { handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit: handleRegister,
  });

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
      <Input
        type="text"
        label="Username"
        id="username"
        name="username"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Input
        type="email"
        label="Email"
        id="email"
        name="email"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Input
        type={showPassword ? "text" : "password"}
        label="Password"
        id="password"
        name="password"
        onChange={handleChange}
        onBlur={handleBlur}
        icon={
          <div onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <Eye size={16} className="text-gray-400" />
            ) : (
              <EyeOff size={16} className="text-gray-400" />
            )}
          </div>
        }
      />
      <Button type="submit" fullWidth>
        Daftar
      </Button>
    </form>
  );
};

export default InputSignUpParent;
