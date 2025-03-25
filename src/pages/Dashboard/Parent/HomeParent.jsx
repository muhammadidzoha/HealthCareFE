import { NutritionDoughnoutCart } from "@/components/Cart/NutritionDoughnoutCart";
import Modal from "@/components/Modal/Modal";
import { DashboardProgress } from "@/components/Progress/DashboardProgress";
import { BasicTable } from "@/components/Table/BasicTable";
import { Button } from "@/components/ui/button";
import {
  getFamilyMembers,
  getMembersBelongToUser,
  getParentQuisioners,
  getUserResponse,
} from "@/lib/API/Parent/parentApi";
import { formatBirthDate } from "@/lib/utils";
import { useFamilyFormStore } from "@/store/form/familyFormStore";
import { userStore } from "@/store/users/userStore";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

export const ParentHomePage = () => {
  const { formInput, fatherFormInput } = useFamilyFormStore();
  const { familyMembers, setFamilyMembers } = userStore();
  const [parentQuisioner, setParentQuisioner] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [userResponse, setUserResponse] = useState(null);
  const [memberLogin, setMemberLogin] = useState(null);
  const { userLogin } = userStore();

  const [progressItems, setProgressItems] = useState([
    {
      title: "Data Keluarga",
      progress: Math.round(familyMembers.length > 2 ? 100 : 0),
      totalQuestion: 3,
      totalAnswered: 5,
      url: "create",
      isFilled: false,
    },
  ]);

  const format = {
    headers: [
      { alias: "Nama Lengkap", name: "full_name" },
      { alias: "Relasi", name: "relation" },
      { alias: "Pekerjaan", name: "job.job_type.name" },
      { alias: "Tinggi Badan (cm)", name: "nutrition[0].height" },
      { alias: "Berat Badan (kg)", name: "nutrition[0].weight" },
      { alias: "Berat Badan Lahir (kg)", name: "nutrition[0].birth_weight" },
      { alias: "Status Gizi", name: "nutrition[0].nutrition_status.status" },
    ],
  };

  useEffect(() => {
    const fetchMemberWhooseLogin = async () => {
      const { data } = await getMembersBelongToUser();
      setMemberLogin(data);
    };
    fetchMemberWhooseLogin();
  }, []);

  useEffect(() => {
    async function fetchFamilyMembersData() {
      const { data } = await getFamilyMembers();
      useFamilyFormStore.setState((prevValue) => ({
        ...prevValue,
        formInput: {
          profile: {
            education: data[0].education.toLowerCase(),
            fullName: data[0].full_name,
            phoneNumber: data[0].phone_number,
            gender: data[0].gender,
            relation: data[0].relation,
          },
          nutrition: {
            ...data[0].nutrition[0],
          },
          job: {
            jobTypeId: data[0].job.job_type.id,
            income: data[0].job.income,
          },
          residence: {
            status: data[0].residence.status,
            address: data[0].residence.address,
            description: data[0].residence.description,
          },
        },
        selfBirthDate: formatBirthDate(data[0].birth_date),
      }));
      console.log({ data });
      setFamilyMembers(data);
    }

    async function fetchParentQuisioner() {
      const { data } = await getParentQuisioners();
      setProgressItems((prevValue) => {
        const merged = [...prevValue, ...data];

        const uniqueItems = merged.filter(
          (item, index, self) =>
            index === self.findIndex((q) => q.title === item.title)
        );

        return uniqueItems.map((item, i) => {
          let progress = 0;
          let totalQuestion = 0;
          let url = item.url ?? "";
          let onClick = () => {};
          let quisioner = null;

          if (item.title.toLowerCase().includes("data keluarga")) {
            progress = familyMembers.length > 2 ? 100 : 0;
            totalQuestion = 3;
          } else if (
            item.title.toLowerCase().includes("pengetahuan gizi seimbang")
          ) {
            quisioner = uniqueItems.find((value) =>
              value.title.toLowerCase().includes("pengetahuan gizi seimbang")
            );

            totalQuestion = quisioner.questions?.length ?? 0;

            url = `quisioners/${quisioner.id}/response?q=1&type=MULTIPLE_CHOICE`;
          } else if (item.title.toLowerCase().includes("sehari-hari anak")) {
            quisioner = uniqueItems.find((value) =>
              value.title.toLowerCase().includes("sehari-hari anak")
            );
            progress = 50;
            totalQuestion = quisioner.questions?.length ?? 0;
            url = `quisioners/${quisioner.id}/response?q=1&type=SCALE`;
          }
          if (!!memberLogin && !!quisioner) {
            console.log({ memberLogin, quisioner });
            const answeredQuisioner = quisioner.response.find(
              (res) => res.family_member_id === memberLogin[0].id
            );
            console.log({ answeredQuisioner });
            progress = answeredQuisioner
              ? Math.ceil(
                  (answeredQuisioner.answers.length / totalQuestion) * 100
                )
              : 0;
          }
          return {
            ...quisioner,
            title: item.title,
            progress,
            totalQuestion,
            totalAnswered: progress === 100 ? totalQuestion : 0,
            url,
            isFilled: progress === 100,
            onClick,
          };
        });
      });

      setParentQuisioner(data);
    }

    Promise.all([fetchParentQuisioner(), fetchFamilyMembersData()]);
  }, [memberLogin]);

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

  useEffect(() => {
    setProgressItems((prevValue) =>
      prevValue.map((value) => {
        if (value.title.toLowerCase().includes("data keluarga")) {
          return {
            title: "Data Keluarga",
            progress: Math.round(familyMembers.length > 2 ? 100 : 0),
            totalQuestion: 3,
            totalAnswered: 3,
            url: "create",
            isFilled: familyMembers.length > 2,
          };
        }
        return value;
      })
    );
  }, [familyMembers]);

  const [isOpen, setIsOpen] = useState(true);
  console.log({ userLogin });

  return (
    <article className="w-full p-4">
      <Modal
        isOpen={familyMembers?.length === 0}
        setIsOpen={setIsOpen}
        title="Isi Data Diri Terlebih dahulu"
      >
        <Button type="button" asChild>
          <Link to="/dashboard/parent/profile/create">Isi data diri</Link>
        </Button>
      </Modal>
      <section>
        <div className="flex gap-5 justify-between w-full">
          <DashboardProgress progressItems={progressItems} />
          <NutritionDoughnoutCart />
        </div>
        {/* <BasicTable
          caption={"Informasi Keluarga"}
          data={[]}
          format={format}
          title={"Tabel Keluarga"}
        /> */}
      </section>
    </article>
  );
};
