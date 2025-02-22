import FormSignUpInstitution from "@/components/Auth/FormSignUpInstitution";
import FormSignUpParent from "@/components/Auth/FormSignUpParent";
import { BorderBeam } from "@/components/ui/border-beam";
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialTab = searchParams.has("institution") ? "institution" : "parent";

  return (
    <div className="w-max overflow-hidden">
      <Tabs id="custom-animation" value={initialTab}>
        <TabsHeader
          className="bg-[#f6f6f6] transition-all"
          indicatorProps={{
            className: "bg-[#83adff] shadow-none",
          }}
        >
          <Tab
            onClick={() => {
              navigate(`.?parent`);
            }}
            className={`${
              initialTab === "parent"
                ? "text-white font-bold"
                : "text-gray-900 font-semibold"
            }`}
            key="parent"
            value="parent"
          >
            Orang Tua
          </Tab>
          <Tab
            onClick={() => {
              navigate(`.?institution`);
            }}
            className={`${
              initialTab === "institution"
                ? "text-white font-bold"
                : "text-gray-900 font-semibold"
            }`}
            key="institution"
            value="institution"
          >
            Institusi
          </Tab>
        </TabsHeader>
        <TabsBody
          animate={{
            initial: { y: 250 },
            mount: { y: 0 },
            unmount: { y: 250 },
          }}
        >
          <TabPanel className="!p-0 !py-4" key="parent" value="parent">
            <div
              className={`relative flex w-[300px] h-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl`}
            >
              <div
                onClick={() => navigate("../..")}
                className="absolute top-5 left-5"
              >
                <ArrowLeft className="cursor-pointer" size={20} />
              </div>
              <div
                className={`flex flex-col space-y-10 items-center pt-20 pb-10`}
              >
                <div>
                  <FormSignUpParent />
                </div>
              </div>
              <BorderBeam size={150} duration={12} delay={9} />
            </div>
          </TabPanel>
          <TabPanel
            className="!p-0 !py-4"
            key="institution"
            value="institution"
          >
            <div
              className={`relative flex w-[300px] h-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl`}
            >
              <div
                onClick={() => navigate("../..")}
                className="absolute top-5 left-5"
              >
                <ArrowLeft className="cursor-pointer" size={20} />
              </div>
              <div
                className={`flex flex-col space-y-10 items-center pt-20 pb-10`}
              >
                <div>
                  <FormSignUpInstitution />
                </div>
              </div>
              <BorderBeam size={150} duration={12} delay={9} />
            </div>
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default SignUp;
