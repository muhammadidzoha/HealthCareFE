import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";

import { ProfileFormTemplate } from "../ProfileFormTemplate";
import { useNavigate } from "react-router-dom";
import { useFamilyFormStore } from "@/store/form/familyFormStore";
import { addMemberAfterLogin, updateMember } from "@/lib/API/Parent/parentApi";
import { userStore } from "@/store/users/userStore";
export const ProfileFormPage = ({
  buttonType,
  children,
  formFor = "PARENT",
  action = "create",
}) => {
  // const [birthDate, setBirthDate] = useState(JSON.parse(localStorage.getItem('formInput'))?.birthDate || null);
  const {
    formInput,
    onInputChange,
    selfBirthDate: birthDate,
    onBirthDateChange,
  } = useFamilyFormStore();
  const navigate = useNavigate();
  const { userLogin } = userStore();

  const onSubmitProfileForm = (e, type = "PARENT") => {
    e.preventDefault();
    if (type === "PARENT") {
      handleSubmitParentForm(type);
    } else {
      handleSubmitInstitutionForm(type);
    }
  };

  const handleSubmitParentForm = async (type = "PARENT") => {
    const savedPayload = { ...formInput, selfBirthDate: birthDate };
    localStorage.setItem("formInput", JSON.stringify(savedPayload));
    localStorage.setItem("selfFormPage", true);
    if (action == "create") {
      const { data } = await addMemberAfterLogin(savedPayload);
      console.log({ data });
    } else {
      if (!userLogin?.id) {
        toast.error("member id is required");
        return;
      }
      const { data } = await updateMember(userLogin.id, savedPayload);
      console.log({ data });
    }

    toast.success(`Data berhasil disimpan`, {
      autoClose: 1500,
      onClose: () => {
        navigate("/dashboard/parent");
      },
    });
  };

  return (
    <ProfileFormTemplate
      onInputChange={onInputChange}
      residence={formInput.residence}
      job={formInput.job}
      nutrition={formInput.nutrition}
      profile={formInput.profile}
      birthDate={birthDate}
      setBirthDate={onBirthDateChange}
      onSubmit={(e) => onSubmitProfileForm(e, "PARENT")}
      formFor={formFor}
      birthWeight={formInput.nutrition.birth_weight}
      buttonType={buttonType}
      phoneNumber={formInput.profile.phoneNumber}
      action={action}
    >
      {children}
    </ProfileFormTemplate>
  );
};
