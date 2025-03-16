import { createUser } from "@/lib/API/Admin/Admin/adminAPI";
import { getAllInstitution } from "@/lib/API/Admin/Institution/institutionAPI";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import { useFormik } from "formik";
import { Eye, EyeOff } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

const FormAddAdmin = ({ setOpen, mutateAdmin }) => {
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (values) => {
    const changeToINT = {
      ...values,
      institutionId: parseInt(values.institutionId),
    };

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const handleLoading = delay(1000);

    toast.promise(
      handleLoading.then(() =>
        createUser(localStorage.getItem("accessToken"), changeToINT)
      ),
      {
        pending: "Loading...",
        success: {
          render(response) {
            return response.data.message;
          },
          onClose: () => {
            setOpen(false);
            mutateAdmin(null, { revalidate: true });
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

  const { values, handleChange, handleBlur, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        password: "",
        role: 0,
        isVerified: true,
        institutionId: 0,
      },
      onSubmit: onSubmit,
    });

  const institution = async () => {
    const response = await getAllInstitution(
      localStorage.getItem("accessToken")
    );
    return response.data;
  };

  const { data } = useSWR("institutions", institution);

  useEffect(() => {
    if (values.institutionId) {
      const selectedInstitution = data.find(
        (i) => i.id === parseInt(values.institutionId)
      );

      if (selectedInstitution) {
        const newRole = selectedInstitution.type === 1 ? 2 : 3;
        setFieldValue("role", newRole);
      }
    }
  }, [values.institutionId, data, setFieldValue]);

  if (!data) return <div>Loading...</div>;

  return (
    <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
      <Input
        label="Username"
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        id="username"
        name="username"
      />
      <Input
        label="Email"
        type="email"
        onChange={handleChange}
        onBlur={handleBlur}
        id="email"
        name="email"
      />
      <Input
        label="Password"
        type={showPassword ? "text" : "password"}
        onChange={handleChange}
        onBlur={handleBlur}
        id="password"
        name="password"
        icon={
          <div
            className="cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <Eye size={16} className="text-gray-400" />
            ) : (
              <EyeOff size={16} className="text-gray-400" />
            )}
          </div>
        }
      />
      <Select
        label="Instansi"
        id="institutionId"
        name="institutionId"
        onChange={(value) => setFieldValue("institutionId", value)}
      >
        {data?.map((i) => (
          <Option value={i.id.toString()} key={i.id} disabled={!!i.user_id}>
            {i.name} {i.user_id ? "(Sudah digunakan)" : ""}
          </Option>
        ))}
      </Select>

      <Button className="!bg-[#1b82e6]" type="submit">
        Tambah
      </Button>
    </form>
  );
};

export default FormAddAdmin;
