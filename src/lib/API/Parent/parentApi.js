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

export const addMembersTofamily = async (members) => {
  try {
    // const [familyData] = members;
    // const familyId = await createFamily({
    //   headFamily: familyData.profile.fullName,
    //   headPhoneNumber: familyData.profile.phoneNumber
    // });
    // console.log({ familyId });
    // localStorage.setItem('familyId', familyId);
    const membersPayload = members.map((member) => mapMemberPayload(member));
    const response = await api.post(
      "/families",
      {
        members: membersPayload,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data;
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
