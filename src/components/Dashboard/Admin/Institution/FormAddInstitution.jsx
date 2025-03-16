import {
  createInstitution,
  getAllLocation,
} from "@/lib/API/Admin/Institution/institutionAPI";
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
import useSWR from "swr";

const FormAddInstitution = ({ setOpen, mutateAdmin }) => {
  const fetcher = async () => {
    const response = await getAllLocation();
    return response.data;
  };

  const onSubmit = async () => {
    const changeToINT = {
      ...values,
      institutionType: parseInt(values.institutionType),
      provinceId: parseInt(values.provinceId),
      cityId: parseInt(values.cityId),
    };

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const handleLoading = delay(1000);

    toast.promise(
      handleLoading.then(() =>
        createInstitution(localStorage.getItem("accessToken"), changeToINT)
      ),
      {
        pending: "Loading...",
        success: {
          render(response) {
            return response.data.message;
          },
          onClose: async () => {
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
        address: "",
        name: "",
        phoneNumber: "",
        email: "",
        institutionType: 0,
        provinceId: 0,
        cityId: 0,
      },
      onSubmit: onSubmit,
    });

  const { data } = useSWR("provinces", fetcher);

  console.log(values);

  return (
    <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
      <Input
        label="Nama"
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        id="name"
        name="name"
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
        label="Nomor Telepon"
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        id="phoneNumber"
        name="phoneNumber"
      />
      <Textarea
        label="Alamat"
        id="address"
        name="address"
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <Select
        label="Instansi"
        id="institutionType"
        name="institutionType"
        onChange={(value) => setFieldValue("institutionType", value)}
      >
        <Option value="1">Sekolah</Option>
        <Option value="2">Puskesmas</Option>
      </Select>

      {data ? (
        <Select
          label="Provinsi"
          id="provinceId"
          name="provinceId"
          onChange={(value) => setFieldValue("provinceId", value)}
        >
          {data?.map((p) => (
            <Option key={p.id} value={p.id.toString()}>
              {p.name}
            </Option>
          ))}
        </Select>
      ) : (
        <div>Loading...</div>
      )}

      {data ? (
        <Select
          label="Kota"
          id="cityId"
          name="cityId"
          onChange={(value) => setFieldValue("cityId", value)}
        >
          {data?.flatMap(
            (p) =>
              p?.cities?.map((c) => (
                <Option key={c.id} value={c.id.toString()}>
                  {c.name}
                </Option>
              )) ?? []
          )}
        </Select>
      ) : (
        <div>Loading...</div>
      )}

      <Button className="!bg-[#1b82e6]" type="submit">
        Tambah
      </Button>
    </form>
  );
};

export default FormAddInstitution;
