import { ProfileFormTemplate } from "../ProfileFormTemplate";
import { Button } from "@/components/ui/button";
import { useFamilyFormStore } from "@/store/form/familyFormStore";
import { useState } from 'react';
import { FaHeadSideCough } from "react-icons/fa";
import { MdPeopleAlt } from "react-icons/md";
import { TbMoodKid } from "react-icons/tb";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AiOutlinePlus } from "react-icons/ai";
import { Checkbox } from "@/components/ui/checkbox"
import { addMembersTofamily } from "@/lib/API/Parent/parentApi";
import { toast } from 'react-toastify';
import { ProfileFormPage } from "./ProfileFormPage";

export const FamilyFormPage = () => {
    const [searchParam, setSearchParam] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(searchParam.get("page") ?? "");
    const { formInput, onInputChange, fatherFormInput, fatherBirthDate, childrenFormInput, addChildren, onChildrenInputForm, setFatherBirthDate } = useFamilyFormStore()

    console.log({formInput, fatherFormInput, childrenFormInput})

    const handleFatherInputChange = (key, value, parentKey = null) => {
        onInputChange(key, value, parentKey, "fatherFormInput")
    }
    const navigate = useNavigate();

    const dataToAdd = {
        profile: {
            fullName: '',
            education: '',
            gender: '',
            relation: '',
            phoneNumber: ''
        },
        job: {
            income: 0,
            jobTypeId: 1
        },
        residence: {
            status: '',
            address: '',
            description: ''
        },

        institutionId: 0,
        nutrition: {
            height: 0,
            weight: 0,
            birth_weight: 0,
        },
        behaviour: {
            eatFrequency: 0,
            drinkFrequency: 0,
            physicalActivity: 0,
            sleepQuality: 0,
            phbs: 0
        },
        knowledgeNutrition: {
            knowledge: '',
            score: 0
        },
        selfBirthDate: null,
        isResidenceSame: true
    }

    const onSubmitData = (e) => {
        e.preventDefault();
        const formInputPayload = {
            ...formInput,
            selfBirthDate: JSON.parse(localStorage.getItem('formInput')).selfBirthDate
        }
        const fatherFormInputPayload = {
            ...fatherFormInput,
            selfBirthDate: fatherBirthDate,
            ...(isResidenceSame && {
                residence: {
                    ...formInput.residence
                }
            })
        }
        const childrenPayload = childrenFormInput.map(child => ({
            ...child,
            ...(isResidenceSame && {
                residence: {
                    ...formInput.residence
                }
            })
        }))
        const payloads = [formInputPayload, fatherFormInputPayload, ...childrenPayload]
        const data = addMembersTofamily(payloads);
        toast.success(`${data.message ?? "Data Berhasil Disimpan"}`, {
            onClose: () => {
                navigate('/dashboard')
            },
            autoClose: 1500
        })
        localStorage.setItem('familyFormPage', true);
        localStorage.setItem('childrenForm', true)
    }
    const [isResidenceSame, setIsResidenceSame] = useState(false);

    return (
        <>
            <article className="flex flex-col p-4 border rounded-xl bg-white relative">
                <header className="sticky top-3 w-full">
                    <section className="flex gap-4 mx-auto justify-around items-center rounded-xl overflow-hidden py-1 px-2">
                        <div className="absolute bg-gray-300 w-3/4 h-[1px] -z-10"></div>
                        <Button variant="secondary" onClick={() => {
                            setCurrentPage("")
                            setSearchParam({ page: "" })
                        }} className={`border px-5 rounded-full  ${currentPage === "" && "bg-[#1b82e6] text-white"}`}><MdPeopleAlt />Data Diri</Button>
                        <Button variant="secondary" onClick={() => {
                            setSearchParam({ page: "father" })
                            setCurrentPage("father")
                        }} className={`border px-5 rounded-full ${currentPage === "father" && "bg-[#1b82e6] text-white"}`}><FaHeadSideCough />{formInput.profile.relation === "AYAH" ? "Data Ibu" : "Data Ayah"}</Button>
                        <Button type="button" variant="secondary" onClick={() => {
                            setSearchParam({ page: "children" })
                            setCurrentPage("children")
                        }} className={`border px-5 rounded-full ${currentPage === "children" && "bg-[#1b82e6] text-white"}`}><TbMoodKid />Data Anak</Button>
                    </section>
                </header>
                <section>
                    {currentPage === "" && (
                        <ProfileFormPage buttonType={"NEXT"} formFor='PARENT'>
                            <Button onClick={() => {
                                setSearchParam({ page: "father" })
                                setCurrentPage("father")
                                window.scrollTo({top: 0})
                            }} className="w-1/3">Lanjut</Button>
                        </ProfileFormPage>
                    )}
                    {currentPage === "father" && (
                        <ProfileFormTemplate
                            profile={fatherFormInput.profile}
                            job={fatherFormInput.job}
                            nutrition={fatherFormInput.nutrition}
                            residence={fatherFormInput.residence}
                            onInputChange={handleFatherInputChange}
                            birthDate={fatherBirthDate}
                            setBirthDate={setFatherBirthDate}
                            birthWeight={fatherFormInput.nutrition.birth_weight}
                            formFor="PARENT"
                            buttonType={"NEXT"}
                            isResidenceSame={isResidenceSame}
                            phoneNumber={fatherFormInput.profile.phoneNumber}
                            childrenResidence={(
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="terms2" onCheckedChange={e => setIsResidenceSame(e)} />
                                    <label
                                        htmlFor="terms2"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Alamat Rumah Sama
                                    </label>
                                </div>
                            )}
                        >
                            <Button onClick={(e) => {
                                e.preventDefault()
                                setSearchParam({ page: "children" })
                                setCurrentPage("children")
                                localStorage.setItem('parentForm', true)
                                window.scrollTo({top: 0})

                            }} className="w-1/3">Lanjut</Button>

                        </ProfileFormTemplate>
                    )}
                    {currentPage === "children" && (
                        <section className="p-4">
                            <div className="mt-4 flex justify-between items-center">
                                <h1 className="text-xl font-semibold">Data Anak</h1>
                                <Button onClick={() => addChildren(dataToAdd)}><AiOutlinePlus />Tambah</Button>
                            </div>
                            {childrenFormInput.length > 0 ? childrenFormInput.map((child, index) => {
                                return (
                                    <div key={index}>
                                        <ProfileFormTemplate
                                            profile={child.profile}
                                            job={child.job}
                                            nutrition={child.nutrition}
                                            residence={child.residence}
                                            onInputChange={(key, value, parentKey = null) => onChildrenInputForm(key, value, parentKey, index)}
                                            birthDate={child.selfBirthDate}
                                            setBirthDate={({ target }) => onChildrenInputForm("selfBirthDate", target.value, null, index)}
                                            birthWeight={child.nutrition.birth_weight}
                                            formFor="CHILDREN"
                                            onSubmit={onSubmitData}
                                            studentClass={child.class}
                                        />
                                    </div>

                                )
                            }) : null}
                            {childrenFormInput.length > 0 && (
                                <div className="flex justify-center">
                                    <Button className="w-1/3" onClick={onSubmitData}>Submit</Button>
                                </div>
                            )}
                        </section>
                    )}
                </section>
            </article >
        </>
    )
}
