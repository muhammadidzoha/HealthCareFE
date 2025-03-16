import { updateUser } from "@/lib/API/Admin/Admin/adminAPI";
import { Button, Input } from "@material-tailwind/react";
import { useFormik } from "formik";
import React from "react";
import { toast } from "react-toastify";

const FormEditAdmin = ({ setOpen, mutateAdmin, a }) => {
  const handleEdit = async (values) => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const handleLoading = delay(1000);

    const renamedField = {
      ...values,
      roleId: values.role_id,
      isVerified: values.is_verified,
    };

    delete renamedField.role_id;
    delete renamedField.is_verified;

    toast.promise(
      handleLoading.then(() =>
        updateUser(localStorage.getItem("accessToken"), renamedField, a.id)
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

  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      username: a.username,
      email: a.email,
      is_verified: a.is_verified,
      role_id: a.role_id,
    },
    onSubmit: handleEdit,
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center space-y-5"
    >
      <Input
        label="Username"
        id="username"
        name="username"
        value={values.username}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Input
        label="Email"
        id="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Button className="!bg-[#1b82e6]" type="submit" fullWidth>
        Edit
      </Button>
    </form>
  );
};

export default FormEditAdmin;
