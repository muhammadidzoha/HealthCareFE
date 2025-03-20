import { toast } from "react-toastify";
import { ProfileFormTemplate } from "./ProfileFormTemplate";
import { useNavigate } from "react-router-dom";
import { useFamilyFormStore } from "@/store/form/familyFormStore";
import { addMemberAfterLogin } from "@/lib/API/Parent/parentApi";
export const AddProfilePage = ({
  buttonType,
  children,
  formFor = "PARENT",
}) => {
  // const [birthDate, setBirthDate] = useState(JSON.parse(localStorage.getItem('formInput'))?.birthDate || null);
  const {
    formInput,
    onInputChange,
    selfBirthDate: birthDate,
    onBirthDateChange,
  } = useFamilyFormStore();
  const navigate = useNavigate();

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
    console.log({ savedPayload });
    localStorage.setItem("formInput", JSON.stringify(savedPayload));
    localStorage.setItem("selfFormPage", true);
    const {data} = await addMemberAfterLogin(savedPayload);
    console.log({data});
    toast.success(`Data berhasil disimpan`, {
      autoClose: 1500,
      onClose: () => {
        navigate("/dashboard");
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
    >
      {children}
    </ProfileFormTemplate>
  );
};
