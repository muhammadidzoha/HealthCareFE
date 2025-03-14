import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button, Input } from "@material-tailwind/react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { decodeJwt, login } from "@/lib/API/Auth/authAPI";
import { useNavigate } from "react-router-dom";

const InputSignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const handleLoading = delay(1000);

    let responseData = null;

    toast.promise(
      handleLoading.then(() => login(values)),
      {
        pending: "Loading...",
        success: {
          render(response) {
            const { data, message } = response.data;
            localStorage.setItem("accessToken", data.accessToken);

            responseData = data;

            return message;
          },
          onClose: async () => {
            if (responseData && responseData.accessToken) {
              try {
                const decodedUser = await decodeJwt(responseData.accessToken);

                localStorage.setItem("user", JSON.stringify(decodedUser));

                const userRole = decodedUser?.role;

                if (userRole === "admin") {
                  navigate("/dashboard");
                } else if (userRole === "parent") {
                  navigate("/dashboard/parent");
                } else if (userRole === "school" || userRole === 'teacher') {
                  navigate("/dashboard/school");
                } else if (userRole === "healthcare") {
                  navigate("/dashboard/health-care");
                } else {
                  navigate("/landing-page");
                }
              } catch (error) {
                console.error("Error decoding token:", error);
              }
            }
          },
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
      uniqueIdentity: "",
      password: "",
    },
    onSubmit: handleLogin,
  });

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
      <Input
        type="text"
        label="Username / Email"
        id="uniqueIdentity"
        name="uniqueIdentity"
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
        Masuk
      </Button>
    </form>
  );
};

export default InputSignIn;
