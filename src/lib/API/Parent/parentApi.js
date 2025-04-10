import api from "../api";

import { toast } from "react-toastify";
import { mapMemberPayload } from "@/lib/utils";

// Fungsi untuk login
export const login = async (credentials) => {
  try {
    const response = await api.post(
      import.meta.env.VITE_API_LOGIN,
      credentials
    );
    localStorage.setItem("accessToken", response.data.data.accessToken);
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

// Fungsi untuk register parent
export const registerParent = async (userData) => {
  try {
    const response = await api.post(
      import.meta.env.VITE_API_REGISTER_PARENT,
      userData
    );
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

// Fungsi untuk register institution
export const registerInstitution = async (userData) => {
  try {
    const response = await api.post(
      import.meta.env.VITE_API_REGISTER_INSTITUTION,
      userData
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default api;

export const decodeJwt = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await api.post(
    "/auth/jwt/decode",
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data.data;
};

export const createFamily = async (headFamily) => {
  const response = await api.put("/families", headFamily, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  const familyId = response.data.data.id;
  localStorage.setItem("familyId", familyId);
  return familyId;
};

export const addMember = async (familyId, familyData) => {
  const response = await api.put(
    `/families/v2/members/${familyId}`,
    familyData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );

  return response.data;
};

export const addMembersTofamily = async (members, onSuccess) => {
  try {
    const membersPayload = members.map((member) => mapMemberPayload(member));
    const child = membersPayload.find((member) => member.institutionId);

    const {
      data: [member],
    } = await getMembersBelongToUser();
    const newMembers = membersPayload
      .filter((mb) => mb.relation !== member.relation)
      .map((mb) => {
        return {
          ...mb,
          residence: {
            ...member.residence,
          },
          institutionId: child.institutionId,
        };
      });

    newMembers.forEach(async (familyMember) => {
      const response = await api.put(
        `/families/v2/members/${member.family_id}`,
        familyMember,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
    });

    /**
     * {
    "fullName": "Nama Ibu Baru",
    "birthDate": "2020-04-25",
    "education": "D3",
    "job": {
        "jobTypeId": 2,
        "income": 1500000
    },
    "gender": "P",
    "relation": "IBU",
    "residence": {
        "address": "Rumah Saya",
        "status": "OWN"
    },
    "phoneNumber": "081280010645"
    // "institutionId": 2
    // "avatar": "asd"
}
     */
    const updatedMember = await api.put(
      `/families/v2/members/${member.id}/profile`,
      {
        institutionId: child.institutionId,
        fullName: member.full_name,
        birthDate: member.birth_date,
        education: member.education,
        job: {
          jobTypeId: member.job.job_type_id,
          income: member.job.income,
        },
        gender: member.gender,
        relation: member.relation,
        residence: {
          address: member.residence.address,
          status: member.residence.status,
        },
        phoneNumber: member.phone_number,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    onSuccess();
  } catch (err) {
    const message = err.response?.data.message || err.message;
    console.log(err);
    toast.error(message);
  }
};

export const getFamilyMembersByHeadPhone = async (headPhoneNumber) => {
  try {
    const response = await api.get(
      `/families/head/phone/${headPhoneNumber}/members`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    return response.data;
  } catch (err) {
    toast.error(err.response?.data.message || err.message);
  }
};

export const getFamilyMembers = async () => {
  try {
    const response = await api.get(`/families/members`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (err) {
    toast.error(err.response?.data.message || err.message);
  }
};

export const getRegisterStatistic = async () => {
  try {
    const response = await api.get("/users/statistics/register", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (err) {
    toast.error(err.response?.data.message || err.message);
  }
};

export const getUsers = async () => {
  try {
    const response = await api.get("/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (err) {
    toast.error(err.response?.data.message || err.message);
  }
};

export const createQuisioner = async (values) => {
  try {
    const response = await api.post("/quisioners", values, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (err) {
    toast.error(err.response?.data.message || err.message);
  }
};

export const getAllQuisioners = async (forWho = "") => {
  try {
    const response = await api.get(`/quisioners?forWho=${forWho}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (err) {
    toast.error(err.response?.data.message || err.message);
  }
};

export const getAllResponses = async (forWho = "") => {
  try {
    const response = await api.get(`/quisioners/answers/all?forWho=${forWho}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (err) {
    toast.error(err.response?.data.message || err.message);
  }
};

export const getParentQuisioners = async () => {
  try {
    const response = await api.get("/quisioners/parents/all", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (err) {
    toast.error(err.response?.data.message || err.message);
  }
};

export const getQuisionerById = async (quisionerId) => {
  try {
    const response = await api.get(`/quisioners/${quisionerId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (err) {
    toast.error(err.response?.data.message || err.message);
  }
};

export const getNutritionStatusForFamily = async () => {
  try {
    const response = await api.get(
      `/institutions/schools/stats/nutritions/all`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    toast.error(err.response?.data.message || err.message);
  }
};

export const getMembersBelongToUser = async () => {
  try {
    const response = await api.get("families/members", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    return response.data;
  } catch (err) {
    toast.error(err.response?.data.message || err.message);
  }
};

export const addMemberAfterLogin = async (payload) => {
  try {
    const response = await api.put(
      "/families/v2/members",
      {
        ...payload,
        fullName: payload.profile.fullName,
        birthDate: payload.selfBirthDate,
        education: payload.profile.education.toUpperCase(),
        gender: payload.profile.gender,
        relation: payload.profile.relation,
        phoneNumber: payload.profile.phoneNumber,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    toast.error(err.response?.data.message || err.message);
  }
};

export const reponseQuisioner = async (quisionerId, payload) => {
  try {
    const {
      data: { data: member },
    } = await api.get("/families/v2/members/whoose/login", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log({ member });
    const response = await api.post(
      `/quisioners/${quisionerId}/responses`,
      {
        familyMemberId: member.id,
        answers: payload,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    toast.error(err.response?.data.message || err.message);
  }
};

export const getUserResponse = async (quisionerId) => {
  try {
    const response = await api.get(`/quisioners/${quisionerId}/response`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (err) {
    toast.error(err.response?.data.message || err.message);
  }
};

export const updateAvatar = async (userLoginId, file) => {
  try {
    console.log({ file });
    if (!file) {
      throw new Error("cannot updaet");
    }
    const formData = new FormData();
    formData.set("avatar", file);
    const response = await api.put(
      `/families/v2/members/${userLoginId}/avatar`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    toast.error(err.response?.data.message || err.message);
    return;
  }
};

export const updateMember = async (memberId, payload) => {
  try {
    //   {
    //     "fullName": "Nama Ibu Baru",
    //     "birthDate": "2020-04-25",
    //     "education": "D3",
    //     "job": {
    //         "jobTypeId": 2,
    //         "income": 1500000
    //     },
    //     "gender": "P",
    //     "relation": "IBU",
    //     "residence": {
    //         "address": "Rumah Saya",
    //         "status": "OWN"
    //     },
    //     "phoneNumber": "081280010645"
    //     // "institutionId": 2
    //     // "avatar": "asd"
    // }
    const sendPayload = {
      fullName: payload.profile.fullName,
      birthDate: payload.selfBirthDate,
      education: payload.profile.education.toUpperCase(),
      relation: payload.profile.relation,
      gender: payload.profile.gender,
      phoneNumber: payload.profile.phoneNumber,
      job: {
        jobTypeId: payload.job.jobTypeId,
        income: payload.job.income,
      },
      residence: {
        status: payload.residence.status,
        address: payload.residence.address,
      },
    };
    const response = await api.put(
      `/families/v2/members/${memberId}/profile`,
      sendPayload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    toast.error(err.response?.data.message || err.message);
    return;
  }
};

export const getClassesWithCategories = async (institutionId) => {
  try {
    const response = await api.get(
      `institutions/schools/${institutionId}/classes-categories`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    toast.error(err.response?.data.message || err.message);
  }
};

export const getSchools = async () => {
  try {
    const response = await api.get(`/institutions/schools`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (err) {
    toast.error(err.response?.data.message || err.message);
  }
};
