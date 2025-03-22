import React, { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PersonalInformation } from "./PersonalInformation";
import { ProfileNutrition } from "./ProfileNutrition";
import { userStore } from "@/store/users/userStore";
import {
  getMembersBelongToUser,
  updateAvatar,
} from "@/lib/API/Parent/parentApi";
import { getInitials } from "@/lib/utils";
import Modal from "@/components/Modal/Modal";
import { FormInputText } from "./FormInputText";
import { MdEdit } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";

export const SelfProfilePage = () => {
  const { userLogin } = userStore();
  const inputRef = useRef(null);
  const [changedAvatar, setChangedAvatar] = useState(null);
  console.log({ userLogin });
  useEffect(() => {
    const fecthUserLogin = async () => {
      const { data } = await getMembersBelongToUser();
      if (data.length > 0) {
        userStore.setState((prevState) => ({
          ...prevState,
          userLogin: data[0],
        }));
      }
    };
    fecthUserLogin();
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ member: userLogin.id, file: changedAvatar });
    if (!userLogin?.id) {
      toast.error("member id is required", {
        autoClose: 1000,
      });
      return;
    }
    await updateAvatar(userLogin.id, changedAvatar);
    toast.success("Avatar updated", {
      autoClose: 1000,
      onClose: setIsOpen(false),
    });
  };
  const [avatar, setAvatar] = useState(null);
  useEffect(() => {
    if (userLogin?.avatar) {
      setAvatar(`${import.meta.env.VITE_BASE_URL}public/${userLogin.avatar}`);
    }
  }, [userLogin]);
  console.log({ avatar });
  return (
    <div className="bg-white text-black rounded-xl p-4">
      <h1 className="font-semibold text-xl">Profile</h1>
      <hr />
      <div className="w-full border p-4 rounded-xl mt-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Avatar className="size-20">
            <AvatarImage src={avatar ?? import.meta.env.VITE_DEFAULT_AVATAR} />
            <AvatarFallback>
              {getInitials(userLogin?.full_name ?? "")}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <h1 className="font-semibold">{userLogin?.full_name ?? "-"}</h1>
            <h1>{userLogin?.family?.user?.email ?? "-"}</h1>
            <p className="text-slate-500">
              {userLogin?.job?.job_type?.name ?? "-"}
            </p>
          </div>
        </div>

        <div>
          <Button className="bg-[#1b82e6]" onClick={() => setIsOpen(true)}>
            Edit
          </Button>
        </div>
      </div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Ubah Avatar">
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <Input
            type="file"
            className="hidden"
            ref={inputRef}
            onChange={(e) => {
              setChangedAvatar(e.target.files[0]);
              e.target.value = "";
            }}
          />
          <section>
            <div className="flex justify-center items-center gap-2">
              <Avatar
                className="size-40 relative hover:cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  inputRef.current.click();
                }}
              >
                <AvatarImage
                  src={
                    (changedAvatar
                      ? URL.createObjectURL(changedAvatar)
                      : null) ??
                    avatar ??
                    import.meta.env.VITE_DEFAULT_AVATAR
                  }
                />
                <AvatarFallback>
                  {getInitials(userLogin?.full_name ?? "")}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex gap-3 justify-center mt-3">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  inputRef.current.click();
                }}
              >
                Ubah Foto
              </Button>
              {/* <Button
                variant="destructive"
                onClick={(e) => {
                  e.preventDefault();
                  setChangedAvatar(null);
                  setAvatar(null);
                  userStore.setState((prevState) => ({
                    ...prevState,
                    userLogin: {
                      ...prevState.userLogin,
                      avatar: null,
                    },
                  }));
                }}
              >
                Hapus Foto
              </Button> */}
            </div>
          </section>
          <section className="flex flex-col gap-4 mt-4">
            <FormInputText
              title={"username"}
              value={userLogin?.family?.user?.username ?? "-"}
              isDisabled={true}
            />
            <FormInputText
              title={"email"}
              value={userLogin?.family?.user?.email ?? "-"}
              isDisabled={true}
            />
          </section>

          <Button className="w-full mt-4" type="submit">
            Simpan
          </Button>
        </form>
      </Modal>

      <PersonalInformation />

      <ProfileNutrition />
    </div>
  );
};
