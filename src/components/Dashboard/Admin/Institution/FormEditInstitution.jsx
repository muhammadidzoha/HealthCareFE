import { editInstitution } from "@/lib/API/Admin/Institution/institutionAPI";
import {
  Button,
  Input,
  Option,
  Select,
  Textarea,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import React from "react";
import { toast } from "react-toastify";

const FormEditInstitution = ({ i, mutateAdmin, setOpen }) => {
  const handleEdit = async (values) => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const handleLoading = delay(1000);

    const renamedField = {
      ...values,
      institutionType: parseInt(values.type),
      phoneNumber: values.phone_number,
    };

    delete renamedField.phone_number;
    delete renamedField.type;

    toast.promise(
      handleLoading.then(() =>
        editInstitution(localStorage.getItem("accessToken"), renamedField, i.id)
      ),
      {
        pending: "Loading...",
        success: {
          render(response) {
            return response.data.message;
          },
          onClose: () => {
            setOpen(false);
            mutateAdmin();
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
        address: i.address,
        name: i.name,
        email: i.email,
        phone_number: i.phone_number,
        type: i.type,
      },
      onSubmit: handleEdit,
    });

  console.log(values);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
      <Input
        label="Nama"
        value={values.name}
        id="name"
        name="name"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Input
        label="Email"
        value={values.email}
        id="email"
        name="email"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Textarea
        label="Alamat"
        value={values.address}
        id="address"
        name="address"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Input
        label="Nomor Telepon"
        value={values.phone_number}
        id="phone_number"
        name="phone_number"
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <Select
        label="Instansi"
        value={values.type.toString()}
        id="type"
        name="type"
        onChange={(value) => setFieldValue("type", value)}
      >
        <Option value="1">Sekolah</Option>
        <Option value="2">Puskesmas</Option>
      </Select>

      <Button className="!bg-[#1b82e6]" type="submit">
        Edit
      </Button>
    </form>
  );
};

export default FormEditInstitution;
